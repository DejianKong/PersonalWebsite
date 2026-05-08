'use client'

import { useState } from 'react'
import FlowBg from './FlowBg'

interface DiaryItem {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
}

export default function SectionDiary({ items }: { items: DiaryItem[] }) {
  const [selected, setSelected] = useState<DiaryItem | null>(null)

  if (selected) {
    return (
      <div className="fade-up">
        <div className="max-w-2xl mx-auto px-6 pt-4 pb-2">
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-1 text-sm mb-4 hover:underline"
            style={{ color: '#4A6080', fontFamily: 'Noto Serif SC, serif' }}
          >
            ← 返回列表
          </button>
          <h2 className="text-xl font-bold mb-1" style={{ color: '#1A2A40', fontFamily: 'Noto Serif SC, serif' }}>
            {selected.title}
          </h2>
          <p className="text-xs mb-6" style={{ color: '#888780' }}>{selected.date}</p>
          {/* 分隔线 */}
          <svg viewBox="0 0 600 16" width="100%" height="16" aria-hidden="true" style={{ marginBottom: '1.5rem' }}>
            <path d="M0,8 Q100,2 200,8 Q300,14 400,8 Q500,2 600,8" fill="none" stroke="#A8B8C8" strokeWidth="1" />
          </svg>
          <div className="prose-geo" dangerouslySetInnerHTML={{ __html: selected.content }} />
        </div>
      </div>
    )
  }

  return (
    <div className="fade-up">
      <FlowBg color1="#A8B8C8" color2="#7A9090" height={100} />

      <div className="px-6 pb-10 pt-2">
        <h2 className="text-xl font-bold mb-2" style={{ color: '#1A2A40', fontFamily: 'Noto Serif SC, serif' }}>
          日记随笔
        </h2>
        <p className="text-xs mb-6" style={{ color: '#888780' }}>
          生活流水 · 旅途见闻 · 碎片思考
        </p>

        {items.length === 0 && (
          <p className="text-sm" style={{ color: '#888780' }}>暂无记录，等待某一个普通又特别的日子。</p>
        )}

        <div className="grid grid-cols-3 gap-3">
          {items.map(item => (
            <div
              key={item.slug}
              className="card-organic p-4 cursor-pointer group hover:shadow-md transition-shadow"
              style={{ border: '0.5px solid #A8B8C8' }}
              onClick={() => setSelected(item)}
            >
              <h3
                className="font-bold text-sm group-hover:underline leading-snug"
                style={{ color: '#1A2A40', fontFamily: 'Noto Serif SC, serif' }}
              >
                {item.title}
              </h3>
              <p className="text-xs mt-1" style={{ color: '#888780' }}>
                {item.date}
              </p>
              <p className="text-xs leading-relaxed line-clamp-2 mt-2" style={{ color: '#5a5a54' }}>
                {item.excerpt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
