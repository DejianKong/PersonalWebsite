'use client'

import { useState } from 'react'
import FlowBg from './FlowBg'

interface NoteItem {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  excerpt: string
  content: string
}

interface SkillGroup {
  name: string
  skills: { name: string; level: number; note?: string }[]
}

interface NotesData {
  items: NoteItem[]
  skillGroups: SkillGroup[]
}

type Tab = 'notes' | 'skills'

const CATEGORY_LABELS: Record<string, string> = {
  articles: '文献阅读',
  ielts: '雅思',
  speaking1: '口语PART1',
  speaking2: '口语PART2/3',
  other: '其他',
}

const SKILL_COLORS = ['#7A9090', '#5C7A3E', '#4A6080', '#A08840']

export default function SectionNotes({ data }: { data: NotesData }) {
  const [tab, setTab] = useState<Tab>('notes')
  const [selected, setSelected] = useState<NoteItem | null>(null)
  const [filterCat, setFilterCat] = useState<string>('all')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  // 笔记详情页
  if (selected) {
    return (
      <div className="fade-up">
        <div className="max-w-2xl mx-auto px-6 pt-4 pb-10">
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-1 text-sm mb-4 hover:underline"
            style={{ color: '#2A5060', fontFamily: 'Noto Serif SC, serif' }}
          >
            ← 返回笔记列表
          </button>
          <span
            className="inline-block px-2 py-0.5 text-xs rounded mb-2"
            style={{ background: '#E8E4DA', color: '#5A5040' }}
          >
            {CATEGORY_LABELS[selected.category] || selected.category}
          </span>
          <h2 className="text-xl font-bold mb-1" style={{ color: '#0A2030', fontFamily: 'Noto Serif SC, serif' }}>
            {selected.title}
          </h2>
          <p className="text-xs mb-2" style={{ color: '#888780' }}>{selected.date}</p>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {selected.tags.map(t => (
              <span key={t} className="px-2 py-0.5 text-xs rounded-full" style={{ background: '#E1F0EE', color: '#2A5060' }}>{t}</span>
            ))}
          </div>
          <svg viewBox="0 0 600 16" width="100%" height="16" aria-hidden="true" style={{ marginBottom: '1.5rem' }}>
            <path d="M0,8 Q100,2 200,8 Q300,14 400,8 Q500,2 600,8" fill="none" stroke="#7A9090" strokeWidth="1" />
          </svg>
          <div className="prose-geo" dangerouslySetInnerHTML={{ __html: selected.content }} />
        </div>
      </div>
    )
  }

  return (
    <div className="fade-up">
      <FlowBg color1="#7A9090" color2="#A8B8C8" height={100} />

      <div className="px-6 pb-10 pt-2">
        <h2 className="text-xl font-bold mb-4" style={{ color: '#0A2030', fontFamily: 'Noto Serif SC, serif' }}>
          学习 · 技能
        </h2>

        <div className="flex gap-3 mb-6">
          {(['notes', 'skills'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-1.5 text-sm rounded-full transition-all"
              style={{
                background: tab === t ? '#2A5060' : '#E8E4DA',
                color: tab === t ? '#fff' : '#5A5040',
                border: '0.5px solid ' + (tab === t ? '#2A5060' : '#B4B2A9'),
                fontFamily: 'Noto Serif SC, serif',
              }}
            >
              {t === 'notes' ? '📓 学习笔记' : '🧩 专业技能'}
            </button>
          ))}
        </div>

        {/* 笔记列表 */}
        {tab === 'notes' && (
          <>
            {/* 分类筛选 */}
            <div className="flex flex-wrap gap-2 mb-5">
              {['all', ...Object.keys(CATEGORY_LABELS)].map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCat(cat)}
                  className="px-3 py-0.5 text-xs rounded-full"
                  style={{
                    background: filterCat === cat ? '#7A9090' : '#E8E4DA',
                    color: filterCat === cat ? '#fff' : '#5A5040',
                    border: '0.5px solid ' + (filterCat === cat ? '#7A9090' : '#D3D1C7'),
                  }}
                >
                  {cat === 'all' ? '全部' : CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {data.items
                .filter(n => filterCat === 'all' || n.category === filterCat)
                .map(item => (
                  <div
                    key={item.slug}
                    className="card-organic p-4 cursor-pointer group hover:shadow-md transition-shadow"
                    style={{ border: '0.5px solid #C8D8D0' }}
                    onClick={() => setSelected(item)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-sm group-hover:underline" style={{ color: '#0A2030', fontFamily: 'Noto Serif SC, serif' }}>
                        {item.title}
                      </h3>
                      <span className="text-xs whitespace-nowrap flex-shrink-0" style={{ color: '#888780' }}>{item.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                      <span className="px-2 py-0.5 text-xs rounded" style={{ background: '#E8E4DA', color: '#5A5040' }}>
                        {CATEGORY_LABELS[item.category] || item.category}
                      </span>
                      {item.tags.slice(0, 3).map(t => (
                        <span key={t} className="px-2 py-0.5 text-xs rounded-full" style={{ background: '#E1F0EE', color: '#2A5060' }}>{t}</span>
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#5a5a54' }}>{item.excerpt}</p>
                  </div>
                ))}
              {data.items.filter(n => filterCat === 'all' || n.category === filterCat).length === 0 && (
                <p className="col-span-3 text-sm" style={{ color: '#888780' }}>该分类暂无笔记。</p>
              )}
            </div>
          </>
        )}

        {/* 技能展示 */}
        {tab === 'skills' && (
          <div className="space-y-6">
            {data.skillGroups.map((group, gi) => (
              <div key={group.name}>
                <h3 className="text-sm font-bold mb-3" style={{ color: '#2A5060', fontFamily: 'Noto Serif SC, serif' }}>
                  {group.name}
                </h3>
                <div className="space-y-2.5">
                  {group.skills.map(skill => (
                    <div
                      key={skill.name}
                      className="relative"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm" style={{ color: '#2a2a28', fontFamily: 'Noto Serif SC, serif' }}>{skill.name}</span>
                        <span className="text-xs" style={{ color: '#888780' }}>{skill.level}%</span>
                      </div>
                      {/* 进度条（有机圆角） */}
                      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#E8E4DA' }}>
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${skill.level}%`,
                            background: SKILL_COLORS[gi % SKILL_COLORS.length],
                            opacity: hoveredSkill === skill.name ? 1 : 0.75,
                          }}
                        />
                      </div>
                      {/* hover 说明 */}
                      {hoveredSkill === skill.name && skill.note && (
                        <p className="text-xs mt-1" style={{ color: '#5a5a54' }}>{skill.note}</p>
                      )}
                    </div>
                  ))}
                </div>
                {/* 装饰波浪线 */}
                {gi < data.skillGroups.length - 1 && (
                  <svg viewBox="0 0 400 12" width="100%" height="12" aria-hidden="true" style={{ marginTop: '1.25rem' }}>
                    <path d="M0,6 Q100,1 200,6 Q300,11 400,6" fill="none" stroke="#C8D8D0" strokeWidth="0.8" />
                  </svg>
                )}
              </div>
            ))}
            {data.skillGroups.length === 0 && (
              <p className="text-sm" style={{ color: '#888780' }}>技能列表正在积累中……</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
