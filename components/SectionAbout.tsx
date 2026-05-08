'use client'

import FlowBg from './FlowBg'

interface AboutData {
  name: string
  intro: string
  tags: string[]
  city: string
  content: string
}

export default function SectionAbout({ data }: { data: AboutData }) {
  return (
    <div className="fade-up">
      <FlowBg color1="#D3C49A" color2="#B8C9A3" height={100} />

      <div className="max-w-2xl mx-auto px-6 pb-10 pt-2">
        {/* 头像 + 基本信息 */}
        <div className="flex items-center gap-6 mb-8">
          {/* 头像占位 */}
          <div
            className="flex-shrink-0 flex items-center justify-center"
            style={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D3C49A 0%, #B8C9A3 50%, #A8B8C8 100%)',
              border: '3px solid #A08840',
              fontSize: '2rem',
            }}
            aria-label="头像"
          >
            <span style={{ fontSize: '2.2rem' }}>🪨</span>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-1" style={{ color: '#3a2800', fontFamily: 'Noto Serif SC, serif' }}>
              {data.name}
            </h2>
            <p className="text-sm mb-2" style={{ color: '#7A7060' }}>
              📍 {data.city}
            </p>
            {/* 标签 */}
            <div className="flex flex-wrap gap-2">
              {data.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-0.5 text-xs rounded-full"
                  style={{ background: '#E8E4DA', color: '#5A5040', border: '0.5px solid #B4B2A9', fontFamily: 'Noto Serif SC, serif' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 分隔波浪线 */}
        <svg viewBox="0 0 600 20" width="100%" height="20" aria-hidden="true" style={{ marginBottom: '1.5rem' }}>
          <path d="M0,10 Q75,2 150,10 Q225,18 300,10 Q375,2 450,10 Q525,18 600,10" fill="none" stroke="#D3C49A" strokeWidth="1.5" />
        </svg>

        {/* 正文 */}
        <div className="prose-geo" dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    </div>
  )
}
