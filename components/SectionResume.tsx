'use client'

import FlowBg from './FlowBg'

interface TimelineItem {
  year: string
  title: string
  org: string
  desc: string
  type: 'education' | 'research' | 'work' | 'award' | 'publication'
}

interface ResumeData {
  timeline: TimelineItem[]
  pdfUrl?: string
}

const TYPE_CONFIG: Record<string, { label: string; color: string; dot: string }> = {
  education:   { label: '教育',   color: '#8A6040', dot: '#E8C890' },
  research:    { label: '科研',   color: '#4A6080', dot: '#A8B8C8' },
  work:        { label: '实习',   color: '#2A5060', dot: '#7A9090' },
  award:       { label: '获奖',   color: '#5C7A3E', dot: '#B8C9A3' },
  publication: { label: '成果',   color: '#A08840', dot: '#D3C49A' },
}

export default function SectionResume({ data }: { data: ResumeData }) {
  return (
    <div className="fade-up">
      {/* 深色地质年代柱风格 Banner */}
      <div className="relative overflow-hidden" style={{ background: '#3A2828', padding: '2rem 1.5rem 1.5rem' }}>
        {/* 装饰流线 */}
        <svg viewBox="0 0 600 60" width="100%" height="60" aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.3 }}>
          <path d="M0,30 Q150,10 300,30 Q450,50 600,25" fill="none" stroke="#E8C890" strokeWidth="1.5" />
          <path d="M0,45 Q120,25 260,45 Q400,60 600,40" fill="none" stroke="#C8A060" strokeWidth="1" />
        </svg>
        <h2 className="text-xl font-bold relative" style={{ color: '#E8C890', fontFamily: 'Noto Serif SC, serif', zIndex: 1 }}>
          个人简历
        </h2>
        <p className="text-xs mt-1 relative" style={{ color: '#8A6040', zIndex: 1 }}>
          地质年代柱 · 时间轴
        </p>
        {data.pdfUrl && (
          <a
            href={data.pdfUrl}
            download
            className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 text-xs rounded relative"
            style={{ background: '#E8C890', color: '#3A1A00', fontFamily: 'Noto Serif SC, serif', zIndex: 1, textDecoration: 'none' }}
          >
            ↓ 下载 PDF 简历
          </a>
        )}
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-10 pt-4">
        {/* 图例 */}
        <div className="flex flex-wrap gap-3 mb-6">
          {Object.entries(TYPE_CONFIG).map(([k, v]) => (
            <div key={k} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: v.dot }} />
              <span className="text-xs" style={{ color: '#5A5040', fontFamily: 'Noto Serif SC, serif' }}>{v.label}</span>
            </div>
          ))}
        </div>

        {data.timeline.length === 0 && (
          <p className="text-sm" style={{ color: '#888780' }}>简历内容正在整理中……</p>
        )}

        <div className="relative">
          {/* 年代柱主轴线 */}
          <div
            className="absolute left-10 top-0 bottom-0"
            style={{ width: '3px', background: 'linear-gradient(to bottom, #D3C49A, #A08840, #8A6040, #5A4040, #3A2828)', borderRadius: '2px' }}
          />

          <div className="space-y-5 pl-20">
            {data.timeline.map((item, i) => {
              const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.education
              return (
                <div key={i} className="relative">
                  {/* 圆点 */}
                  <div
                    className="absolute -left-12 top-3 w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ background: cfg.dot, border: `2px solid ${cfg.color}`, zIndex: 1 }}
                  />
                  {/* 年份 */}
                  <div
                    className="absolute -left-20 top-2 text-right"
                    style={{ width: '3rem', fontSize: '0.7rem', color: '#8A6040', fontFamily: 'JetBrains Mono, monospace', lineHeight: 1.3 }}
                  >
                    {item.year}
                  </div>
                  {/* 内容卡片 */}
                  <div
                    className="card-organic p-4"
                    style={{ border: `0.5px solid ${cfg.dot}` }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <h3 className="font-bold text-sm leading-snug" style={{ color: '#2a2a28', fontFamily: 'Noto Serif SC, serif' }}>
                        {item.title}
                      </h3>
                      <span
                        className="px-1.5 py-0.5 text-xs rounded flex-shrink-0"
                        style={{ background: cfg.dot + '66', color: cfg.color, fontSize: '0.65rem' }}
                      >
                        {cfg.label}
                      </span>
                    </div>
                    <p className="text-xs mb-1.5" style={{ color: '#5A5040' }}>{item.org}</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#5a5a54' }}>{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
