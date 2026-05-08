import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

// Markdown → HTML（带 GFM + 基础解析，避免 ESM 依赖问题）
export async function markdownToHtml(markdown: string): Promise<string> {
  // 动态 import（ESM 模块）
  const { unified } = await import('unified')
  const { default: remarkParse } = await import('remark-parse')
  const { default: remarkGfm } = await import('remark-gfm')
  const { default: remarkMath } = await import('remark-math')
  const { default: remarkRehype } = await import('remark-rehype')
  const { default: rehypeKatex } = await import('rehype-katex')
  const { default: rehypeStringify } = await import('rehype-stringify')

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(markdown)
  return String(result)
}

// 读取单个 md 文件并解析
export async function parseMarkdownFile(filePath: string) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const html = await markdownToHtml(content)
  return { data, content: html }
}

// 读取目录下所有 md 文件（返回 frontmatter + slug）
export function readMdList(subPath: string) {
  const dir = path.join(CONTENT_DIR, subPath)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f: string) => f.endsWith('.md'))
    .map((f: string) => {
      const raw = fs.readFileSync(path.join(dir, f), 'utf-8')
      const { data, content } = matter(raw)
      return { slug: f.replace('.md', ''), data, excerpt: content.slice(0, 120).replace(/\n/g, ' ') }
    })
    .sort((a: any, b: any) => {
      const da = a.data.date || ''
      const db = b.data.date || ''
      return da > db ? -1 : 1
    })
}

// 读取单个 md 文件详情
export async function readMdItem(subPath: string, slug: string) {
  const filePath = path.join(CONTENT_DIR, subPath, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  return parseMarkdownFile(filePath)
}

// ---- 各模块数据读取 ----

export async function getAboutData() {
  const filePath = path.join(CONTENT_DIR, 'about', 'index.md')
  if (!fs.existsSync(filePath)) {
    return { name: '头上有个陨石坑', intro: '', tags: [], city: '未知星球', content: '<p>关于我的内容正在撰写中……</p>' }
  }
  const { data, content } = await parseMarkdownFile(filePath)
  return {
    name: data.name || '头上有个陨石坑',
    intro: data.intro || '',
    tags: (data.tags || []) as string[],
    city: (data.city || '') as string,
    content,
  }
}

export async function getHobbiesData() {
  const hikingList = readMdList('hobbies/hiking')
  const calligraphyList = readMdList('hobbies/calligraphy')
  const travelsList = readMdList('hobbies/travels')

  const hikingItems = await Promise.all(
    hikingList.map(async (i: any) => {
      const detail = await readMdItem('hobbies/hiking', i.slug)
      return {
        slug: i.slug,
        title: i.data.title || i.slug,
        date: i.data.date || '',
        location: i.data.location || '',
        distance: i.data.distance,
        summary: i.data.summary || i.excerpt,
        cover: i.data.cover,
        content: detail?.content || '',
      }
    })
  )

  const calligraphyItems = await Promise.all(
    calligraphyList.map(async (i: any) => {
      const detail = await readMdItem('hobbies/calligraphy', i.slug)
      return {
        slug: i.slug,
        title: i.data.title || i.slug,
        date: i.data.date || '',
        style: i.data.style || '',
        cover: i.data.cover || '/images/placeholder.jpg',
        description: i.data.description,
        content: detail?.content || '',
      }
    })
  )

  const travelsItems = await Promise.all(
    travelsList.map(async (i: any) => {
      const detail = await readMdItem('hobbies/travels', i.slug)
      return {
        slug: i.slug,
        title: i.data.title || i.slug,
        date: i.data.date || '',
        location: i.data.location || '',
        duration: i.data.duration,
        summary: i.data.summary || i.excerpt,
        cover: i.data.cover,
        content: detail?.content || '',
      }
    })
  )

  return { hiking: hikingItems, calligraphy: calligraphyItems, travels: travelsItems }
}

export async function getCreationsData() {
  const articles = readMdList('creations/articles')
  const videos = readMdList('creations/videos')
  return {
    articles: articles.map((i: any) => ({
      slug: i.slug,
      title: i.data.title || i.slug,
      date: i.data.date || '',
      summary: i.data.summary || i.excerpt,
      cover: i.data.cover,
      url: i.data.url || '#',
    })),
    videos: videos.map((i: any) => ({
      slug: i.slug,
      title: i.data.title || i.slug,
      date: i.data.date || '',
      summary: i.data.summary || i.excerpt,
      cover: i.data.cover,
      url: i.data.url || '#',
      platform: i.data.platform || 'B站',
    })),
  }
}

export async function getDiaryData() {
  const list = readMdList('diary')
  const items = await Promise.all(
    list.map(async (i: any) => {
      const detail = await readMdItem('diary', i.slug)
      return {
        slug: i.slug,
        title: i.data.title || i.slug,
        date: i.data.date || '',
        excerpt: i.data.summary || i.excerpt,
        content: detail?.content || '',
      }
    })
  )
  return items
}

export async function getNotesData() {
  const cats = ['articles', 'ielts', 'speaking1','speaking2']
  const allNotes = cats.flatMap((cat: string) =>
    readMdList(`notes/${cat}`).map((i: any) => ({
      slug: i.slug,
      title: i.data.title || i.slug,
      date: i.data.date || '',
      category: cat,
      tags: (i.data.tags || []) as string[],
      excerpt: i.data.summary || i.excerpt,
      content: '',
    }))
  )
  const items = await Promise.all(
    allNotes.map(async (n: any) => {
      const detail = await readMdItem(`notes/${n.category}`, n.slug)
      return { ...n, content: detail?.content || '' }
    })
  )

  const skillGroups = [
    {
      name: '地球科学技术',
      skills: [
        { name: 'ArcGIS / QGIS', level: 75, note: '地质图制作、空间分析、地形处理' },
        { name: '遥感图像处理', level: 65, note: 'ENVI / Google Earth Engine 遥感解译' },
        { name: '地质建模', level: 55, note: '三维地质体建模，构造分析' },
      ],
    },
    {
      name: '编程语言',
      skills: [
        { name: 'Python', level: 70, note: '数据处理、科学计算、pandas / numpy' },
        { name: 'R', level: 45, note: '统计分析、地质数据可视化' },
      ],
    },
    {
      name: '软件工具',
      skills: [
        { name: 'Photoshop / Illustrator', level: 60, note: '科学图件绘制、插图制作' },
        { name: 'LaTeX', level: 55, note: '学术论文排版' },
        { name: 'Premiere Pro', level: 50, note: '视频剪辑' },
      ],
    },
    {
      name: '语言能力',
      skills: [
        { name: '普通话', level: 100, note: '母语' },
        { name: '英语', level: 72, note: 'CET-6，学术论文读写' },
      ],
    },
  ]

  return { items, skillGroups }
}

export async function getResumeData() {
  const filePath = path.join(CONTENT_DIR, 'resume', 'index.md')
  let timeline: any[] = []
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(raw)
    timeline = data.timeline || []
  }
  return { timeline, pdfUrl: undefined as string | undefined }
}
