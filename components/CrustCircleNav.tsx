'use client'

import { useState } from 'react'

export type SectionId = 'about' | 'hobbies' | 'creations' | 'diary' | 'notes' | 'resume'

interface Layer {
  id: SectionId
  label: string
  sublabel: string
  icon: string
  textColor: string
  bgColor: string
  borderColor: string
}

const LAYERS: Layer[] = [
  { id: 'about',     label: '关于我',     sublabel: '表土',  icon: '🪨', textColor: '#4A3200', bgColor: '#D3C49A', borderColor: '#A08840' },
  { id: 'hobbies',   label: '兴趣爱好',   sublabel: '砂岩',  icon: '🥾', textColor: '#2A4A10', bgColor: '#B8C9A3', borderColor: '#5C7A3E' },
  { id: 'creations', label: '创作内容',   sublabel: '石灰岩',       icon: '✏️', textColor: '#1A4030', bgColor: '#C8D8C0', borderColor: '#4A7060' },
  { id: 'diary',     label: '日记随笔',   sublabel: '页岩',         icon: '📓', textColor: '#1A2A40', bgColor: '#A8B8C8', borderColor: '#4A6080' },
  { id: 'notes',     label: '知识技能', sublabel: '片麻岩', icon: '🧩', textColor: '#ffffff', bgColor: '#7A9090', borderColor: '#2A5060' },
  { id: 'resume',    label: '个人简历',   sublabel: '花岗岩',  icon: '📜', textColor: '#E8C890', bgColor: '#5A4040', borderColor: '#3A2020' },
]

interface Props {
  active: SectionId
  onSelect: (id: SectionId) => void
}

export default function CrustCircleNav({ active, onSelect }: Props) {
  const [hovered, setHovered] = useState<SectionId | null>(null)

  return (
    <nav className="flex flex-col h-full" aria-label="地壳导航">
      {/* 网站标题 */}
      <div className="text-center py-4 px-3">
        <h1
          className="leading-tight"
          style={{ fontFamily: 'Noto Serif SC, serif', fontSize: '0.95rem', fontWeight: 700, color: '#3a3020', letterSpacing: '0.05em' }}
        >
          头上有个陨石坑
        </h1>
        <p className="mt-0.5" style={{ fontSize: '0.6rem', color: '#7A7060', letterSpacing: '0.08em' }}>
          地球科学 · 徒步 · 书法 · 创作
        </p>
      </div>

      {/* 导航条目列表 */}
      <div className="flex-1 flex flex-col gap-2 px-3">
        {LAYERS.map((layer) => {
          const isActive = active === layer.id
          const isHovered = hovered === layer.id

          return (
            <button
              key={layer.id}
              onClick={() => onSelect(layer.id)}
              onMouseEnter={() => setHovered(layer.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative text-left transition-all duration-300 overflow-hidden"
              style={{
                padding: '0.6rem 0.75rem',
                borderRadius: '10px 6px 12px 8px',
                background: isActive ? layer.bgColor : isHovered ? layer.bgColor + '40' : 'transparent',
                border: `0.5px solid ${isActive ? layer.borderColor : 'transparent'}`,
                cursor: 'pointer',
                boxShadow: isActive ? `0 2px 8px ${layer.borderColor}30` : 'none',
              }}
            >
              {/* 活跃指示条 */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '20%',
                    bottom: '20%',
                    width: '3px',
                    borderRadius: '0 2px 2px 0',
                    background: layer.borderColor,
                  }}
                />
              )}

              <div className="flex items-center gap-2.5">
                <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{layer.icon}</span>
                <div className="min-w-0">
                  <p
                    style={{
                      fontFamily: 'Noto Serif SC, serif',
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 700 : 600,
                      color: isActive ? layer.textColor : '#3a3a36',
                      lineHeight: 1.3,
                    }}
                  >
                    {layer.label}
                  </p>
                  <p
                    style={{
                      fontSize: '0.6rem',
                      color: isActive ? layer.textColor + '99' : '#888780',
                      letterSpacing: '0.04em',
                      marginTop: '1px',
                    }}
                  >
                    {layer.sublabel}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* 底部装饰 */}
      <div className="px-3 pb-3">
        <svg viewBox="0 0 300 12" width="100%" height="12" aria-hidden="true">
          <path d="M0,6 Q75,2 150,6 Q225,10 300,6" fill="none" stroke="#B8C9A3" strokeWidth="0.8" opacity="0.5" />
        </svg>
      </div>
    </nav>
  )
}
