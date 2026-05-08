'use client'

// 流动背景装饰 SVG（各模块顶部使用）
interface FlowBgProps {
  color1?: string
  color2?: string
  height?: number
}

export default function FlowBg({ color1 = '#D3C49A', color2 = '#B8C9A3', height = 120 }: FlowBgProps) {
  return (
    <svg
      viewBox={`0 0 800 ${height}`}
      width="100%"
      height={height}
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ display: 'block', marginBottom: '-2px' }}
    >
      {/* 有机底色块 */}
      <path
        d={`M0,0 L800,0 L800,${height * 0.7} Q650,${height} 500,${height * 0.8} Q350,${height * 0.6} 200,${height * 0.9} Q80,${height} 0,${height * 0.75} Z`}
        fill={color1}
        opacity="0.25"
      />
      <path
        d={`M0,${height * 0.3} Q200,${height * 0.1} 400,${height * 0.4} Q600,${height * 0.6} 800,${height * 0.35} L800,${height} L0,${height} Z`}
        fill={color2}
        opacity="0.15"
      />
      {/* 流动线条 */}
      <path
        d={`M0,${height * 0.5} Q200,${height * 0.3} 400,${height * 0.55} Q600,${height * 0.75} 800,${height * 0.5}`}
        fill="none"
        stroke={color1}
        strokeWidth="1.5"
        opacity="0.5"
      />
      <path
        d={`M0,${height * 0.7} Q150,${height * 0.55} 350,${height * 0.72} Q550,${height * 0.88} 800,${height * 0.65}`}
        fill="none"
        stroke={color2}
        strokeWidth="1"
        opacity="0.4"
      />
    </svg>
  )
}
