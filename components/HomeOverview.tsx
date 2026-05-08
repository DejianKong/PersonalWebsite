'use client'

import type { SectionId } from './CrustCircleNav'

interface OverviewSection {
  id: SectionId
  label: string
  sublabel: string
  color: string
  strokeColor: string
  preview: { title: string; meta?: string; excerpt?: string }[]
  onClick: () => void
}

interface Props {
  aboutData: { name: string; city: string; tags: string[] }
  hobbiesData: {
    hiking: { title: string; date: string; summary: string }[]
    calligraphy: { title: string; date: string; description?: string }[]
    travels: { title: string; date: string; summary: string }[]
  }
  creationsData: {
    articles: { title: string; date: string; summary: string }[]
    videos: { title: string; date: string; summary: string }[]
  }
  diaryData: { title: string; date: string; excerpt: string }[]
  notesData: {
    items: { title: string; date: string; category: string; excerpt: string }[]
    skillGroups: { name: string; skills: { name: string; level: number }[] }[]
  }
  resumeData: { timeline: { year: string; title: string; type: string }[] }
  onSectionClick: (id: SectionId) => void
}

export default function HomeOverview({ aboutData, hobbiesData, creationsData, diaryData, notesData, resumeData, onSectionClick }: Props) {
  // 构建各章节概览数据
  const sections: OverviewSection[] = [
    {
      id: 'about',
      label: '关于我',
      sublabel: '表土',
      color: '#D3C49A',
      strokeColor: '#A08840',
      preview: [
        { title: aboutData.name, meta: `📍 ${aboutData.city}`, excerpt: aboutData.tags.join(' · ') },
      ],
      onClick: () => onSectionClick('about'),
    },
    {
      id: 'hobbies',
      label: '兴趣爱好',
      sublabel: '砂岩',
      color: '#B8C9A3',
      strokeColor: '#5C7A3E',
      preview: [
        ...hobbiesData.hiking.slice(0, 2).map(h => ({ title: h.title, meta: `🏔 ${h.date}`, excerpt: h.summary })),
        ...hobbiesData.calligraphy.slice(0, 1).map(c => ({ title: c.title, meta: `🖌 ${c.date}`, excerpt: c.description })),
        ...hobbiesData.travels.slice(0, 1).map(t => ({ title: t.title, meta: `✈ ${t.date}`, excerpt: t.summary })),
      ],
      onClick: () => onSectionClick('hobbies'),
    },
    {
      id: 'creations',
      label: '创作内容',
      sublabel: '石灰岩',
      color: '#C8D8C0',
      strokeColor: '#4A7060',
      preview: [
        ...creationsData.articles.slice(0, 2).map(a => ({ title: a.title, meta: `📝 ${a.date}`, excerpt: a.summary })),
        ...creationsData.videos.slice(0, 1).map(v => ({ title: v.title, meta: `🎬 ${v.date}`, excerpt: v.summary })),
      ],
      onClick: () => onSectionClick('creations'),
    },
    {
      id: 'diary',
      label: '日记随笔',
      sublabel: '页岩',
      color: '#A8B8C8',
      strokeColor: '#4A6080',
      preview: diaryData.slice(0, 3).map(d => ({ title: d.title, meta: d.date, excerpt: d.excerpt })),
      onClick: () => onSectionClick('diary'),
    },
    {
      id: 'notes',
      label: '知识技能',
      sublabel: '片麻岩',
      color: '#7A9090',
      strokeColor: '#2A5060',
      preview: [
        ...notesData.items.slice(0, 2).map(n => ({ title: n.title, meta: `${n.category} · ${n.date}`, excerpt: n.excerpt })),
        { title: `${notesData.skillGroups.length} 个技能组`, meta: notesData.skillGroups.map(g => g.name).join('、'), excerpt: notesData.skillGroups.flatMap(g => g.skills).slice(0, 5).map(s => s.name).join('、') },
      ],
      onClick: () => onSectionClick('notes'),
    },
    {
      id: 'resume',
      label: '个人简历',
      sublabel: '花岗岩',
      color: '#5A4040',
      strokeColor: '#3A2020',
      preview: resumeData.timeline.slice(0, 3).map(t => ({
        title: `${t.year} · ${t.title}`,
        meta: t.type === 'education' ? '🎓 教育' : t.type === 'research' ? '🔬 科研' : t.type === 'work' ? '💼 实习' : t.type === 'award' ? '🏆 获奖' : '📄 成果',
      })),
      onClick: () => onSectionClick('resume'),
    },
  ]

  return (
    <div className="fade-up">
      {/* 顶部装饰 */}
      <svg viewBox="0 0 900 8" width="100%" height="8" aria-hidden="true" style={{ display: 'block' }}>
        <path d="M0,4 Q225,0 450,4 Q675,8 900,4" fill="none" stroke="#D3C49A" strokeWidth="1" />
      </svg>

      {/* 首页欢迎语 */}
      <div className="px-6 pt-6 pb-4 text-center">
        <h2 className="text-lg font-bold" style={{ color: '#3a3020', fontFamily: 'Noto Serif SC, serif' }}>
          欢迎来到我的地壳
        </h2>
        <p className="text-xs mt-1" style={{ color: '#888780' }}>
          选择一个地层，探索其中的故事
        </p>
      </div>

      {/* 网格布局：2列 × 3行 */}
      <div className="grid grid-cols-3 gap-4">
        {sections.map((sec) => (
          <SectionCard key={sec.id} section={sec} />
        ))}

        {/* 第6个卡片跨两列，放在底部居中 */}
      </div>

      {/* 底部装饰 */}
      <div className="px-6 pb-6">
        <svg viewBox="0 0 600 20" width="100%" height="20" aria-hidden="true">
          <path d="M0,10 Q150,2 300,10 Q450,18 600,10" fill="none" stroke="#D3C49A" strokeWidth="1" />
        </svg>
      </div>
    </div>
  )
}

function SectionCard({ section }: { section: OverviewSection }) {
  const isDark = section.id === 'notes' || section.id === 'resume'
  const textColor = isDark ? '#ffffff' : '#2a2a28'
  const subColor = isDark ? 'rgba(255,255,255,0.6)' : '#7A7060'

  return (
    <div
      onClick={section.onClick}
      className="cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      style={{
        borderRadius: '16px 8px 20px 10px / 10px 18px 8px 16px',
        background: section.color,
        padding: '1.25rem',
        boxShadow: '0 2px 12px rgba(80,60,40,0.08)',
        border: `0.5px solid ${section.strokeColor}`,
        minHeight: 160,
      }}
    >
      {/* 章节标题 */}
      <div style={{ marginBottom: '0.75rem' }}>
        <h3 style={{ fontFamily: 'Noto Serif SC, serif', fontSize: '0.95rem', fontWeight: 700, color: textColor }}>
          {section.label}
        </h3>
        <p style={{ fontSize: '0.65rem', color: subColor, letterSpacing: '0.05em', marginTop: '2px' }}>
          {section.sublabel}
        </p>
      </div>

      {/* 预览列表 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {section.preview.slice(0, 3).map((item, i) => (
          <div key={i} style={{ borderBottom: i < 2 ? '0.5px solid rgba(0,0,0,0.08)' : 'none', paddingBottom: i < 2 ? '0.4rem' : 0 }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: textColor, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {item.title}
            </p>
            {item.meta && (
              <p style={{ fontSize: '0.65rem', color: subColor, marginTop: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item.meta}
              </p>
            )}
            {item.excerpt && (
              <p style={{ fontSize: '0.7rem', color: subColor, marginTop: '1px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {item.excerpt}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* 进入箭头 */}
      <div style={{ marginTop: '0.75rem', textAlign: 'right' }}>
        <span style={{ fontSize: '0.7rem', color: subColor, fontFamily: 'Noto Serif SC, serif' }}>
          探索 →
        </span>
      </div>
    </div>
  )
}
