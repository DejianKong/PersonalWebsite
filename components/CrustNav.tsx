'use client'

import { useState } from 'react'

export type SectionId = 'about' | 'hobbies' | 'creations' | 'diary' | 'notes' | 'resume'

interface Layer {
  id: SectionId
  label: string
  sublabel: string
  textColor: string
}

const LAYERS: Layer[] = [
  { id: 'about',     label: '关于我',    sublabel: '表土', textColor: '#4A3200' },
  { id: 'hobbies',   label: '兴趣爱好',  sublabel: '砂岩', textColor: '#2A4A10' },
  { id: 'creations', label: '创作内容',  sublabel: '石灰岩',      textColor: '#1A4030' },
  { id: 'diary',     label: '日记随笔',  sublabel: '页岩',        textColor: '#1A2A40' },
  { id: 'notes',     label: '知识技能', sublabel: '片麻岩', textColor: '#ffffff' },
  { id: 'resume',    label: '个人简历',  sublabel: '花岗岩', textColor: '#E8C890' },
]

// 每层的有机多边形路径（SVG viewBox 0 0 220 700）
const LAYER_PATHS = [
  // 1 表土层
  'M0,0 L220,0 L220,102 Q180,108 140,104 Q100,100 60,106 Q30,110 0,106 Z',
  // 2 沉积层
  'M0,106 Q30,110 60,106 Q100,100 140,104 Q180,108 220,102 L220,212 Q185,220 145,216 Q105,212 65,218 Q32,222 0,218 Z',
  // 3 石灰岩层
  'M0,218 Q32,222 65,218 Q105,212 145,216 Q185,220 220,212 L220,322 Q182,330 142,326 Q102,322 62,328 Q28,332 0,328 Z',
  // 4 页岩层
  'M0,328 Q28,332 62,328 Q102,322 142,326 Q182,330 220,322 L220,432 Q180,440 138,436 Q98,432 58,438 Q24,442 0,438 Z',
  // 5 变质岩层
  'M0,438 Q24,442 58,438 Q98,432 138,436 Q180,440 220,432 L220,552 Q178,560 136,556 Q96,552 56,558 Q22,562 0,558 Z',
  // 6 岩浆岩层
  'M0,558 Q22,562 56,558 Q96,552 136,556 Q178,560 220,552 L220,660 Q176,668 134,664 Q94,660 54,666 Q20,670 0,666 Z',
]

// 每层的填充色
const LAYER_FILLS = [
  '#D3C49A',
  '#B8C9A3',
  '#C8D8C0',
  '#A8B8C8',
  '#7A9090',
  '#5A4040',
]

// 每层边界线颜色
const LAYER_STROKES = [
  '#A08840',
  '#5C7A3E',
  '#4A7060',
  '#4A6080',
  '#2A5060',
  '#3A2020',
]

// 每层波浪边界线（在上沿绘制）
const WAVE_LINES = [
  null, // 第一层无上边界
  'M0,106 Q30,112 65,107 Q105,101 140,105 Q180,109 220,103',
  'M0,218 Q32,223 66,219 Q106,213 146,217 Q186,221 220,213',
  'M0,328 Q28,333 63,329 Q103,323 143,327 Q183,331 220,323',
  'M0,438 Q25,443 59,439 Q99,433 139,437 Q181,441 220,433',
  'M0,558 Q23,563 57,559 Q97,553 137,557 Q179,561 220,553',
]

// 图层文字位置 [x, y_label, y_sublabel]
const TEXT_POSITIONS: [number, number, number][] = [
  [110, 46, 64],
  [110, 152, 170],
  [110, 262, 280],
  [110, 372, 390],
  [110, 486, 504],
  [110, 600, 618],
]

// 熔岩底部装饰
const MAGMA_LINES = [
  'M10,672 Q40,665 70,674 Q100,682 130,671 Q160,660 190,673 Q208,680 220,675',
  'M5,688 Q35,680 65,690 Q95,698 130,686 Q162,674 195,688 Q210,694 220,690',
]

interface Props {
  active: SectionId
  onSelect: (id: SectionId) => void
}

export default function CrustNav({ active, onSelect }: Props) {
  const [hovered, setHovered] = useState<SectionId | null>(null)

  return (
    <nav className="relative w-full h-full select-none" aria-label="地壳导航">
      {/* 网站标题 */}
      <div className="px-4 pt-5 pb-2">
        <h1 className="text-center leading-tight" style={{ fontFamily: 'Noto Serif SC, serif', fontSize: '0.88rem', fontWeight: 700, color: '#3a3020', letterSpacing: '0.05em' }}>
          头上有个陨石坑
        </h1>
        <p className="text-center mt-1" style={{ fontSize: '0.65rem', color: '#7A7060', letterSpacing: '0.08em' }}>
          地球科学 · 徒步 · 知识 · 创作
        </p>
      </div>

      {/* 地壳 SVG 剖面图 */}
      <svg
        viewBox="0 0 220 700"
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', maxHeight: 'calc(100vh - 120px)' }}
        aria-label="地壳剖面导航图"
      >
        {/* 背景 */}
        <rect x="0" y="0" width="220" height="700" fill="#E8E4DA" />

        {/* 各地层 */}
        {LAYERS.map((layer, i) => {
          const isActive = active === layer.id
          const isHovered = hovered === layer.id
          const highlight = isActive || isHovered
          return (
            <g
              key={layer.id}
              className="layer-group"
              onClick={() => onSelect(layer.id)}
              onMouseEnter={() => setHovered(layer.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* 地层填充 */}
              <path
                d={LAYER_PATHS[i]}
                fill={LAYER_FILLS[i]}
                stroke={LAYER_STROKES[i]}
                strokeWidth={highlight ? 2 : 0.5}
                style={{ transition: 'all 0.2s', filter: highlight ? 'brightness(1.08)' : 'none' }}
              />

              {/* 波浪边界线 */}
              {WAVE_LINES[i] && (
                <path
                  d={WAVE_LINES[i]!}
                  fill="none"
                  stroke={LAYER_STROKES[i]}
                  strokeWidth="1"
                  opacity="0.6"
                />
              )}

              {/* 选中指示条 */}
              {isActive && (
                <rect x="0" y={TEXT_POSITIONS[i][1] - 22} width="4" height="40" fill={LAYER_STROKES[i]} rx="2" />
              )}

              {/* 文字标签 */}
              <text
                x={TEXT_POSITIONS[i][0]}
                y={TEXT_POSITIONS[i][1]}
                textAnchor="middle"
                style={{
                  fontFamily: 'Noto Serif SC, serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  fill: layer.textColor,
                  pointerEvents: 'none',
                }}
              >
                {layer.label}
              </text>
              <text
                x={TEXT_POSITIONS[i][0]}
                y={TEXT_POSITIONS[i][2]}
                textAnchor="middle"
                style={{
                  fontFamily: 'Noto Serif SC, serif',
                  fontSize: '9px',
                  fill: layer.id === 'notes' || layer.id === 'resume' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)',
                  pointerEvents: 'none',
                }}
              >
                {layer.sublabel}
              </text>

              {/* hover 时的发光轮廓提示 */}
              {isHovered && !isActive && (
                <path
                  d={LAYER_PATHS[i]}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.5"
                  opacity="0.5"
                  style={{ pointerEvents: 'none' }}
                />
              )}
            </g>
          )
        })}

        {/* 底部熔岩装饰 */}
        <rect x="0" y="666" width="220" height="34" fill="#3A2828" />
        {MAGMA_LINES.map((d, i) => (
          <path key={i} d={d} fill="none" stroke={i === 0 ? '#8A4030' : '#6A3020'} strokeWidth="1" />
        ))}

        {/* 岩石纹理装饰点（散点） */}
        {[
          [30, 80], [80, 75], [140, 82], [190, 78],
          [25, 188], [90, 194], [155, 182], [200, 190],
          [40, 298], [110, 305], [170, 294], [210, 300],
          [35, 408], [100, 414], [160, 404], [205, 410],
          [50, 518], [120, 524], [175, 514], [208, 520],
          [45, 625], [115, 632], [178, 622], [212, 628],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="1.5" fill="rgba(0,0,0,0.08)" />
        ))}

        {/* 流动装饰线（全局背景） */}
        <path
          d="M5,350 Q50,340 110,355 Q170,368 215,352"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
      </svg>
    </nav>
  )
}
