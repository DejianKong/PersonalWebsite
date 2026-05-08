'use client'

interface Props {
  sectionColor: string
  sectionStrokeColor: string
}

export default function SideDecor({ sectionColor, sectionStrokeColor }: Props) {
  return (
    <>
      {/* 左侧装饰 */}
      <div
        className="hidden lg:block fixed top-0 pointer-events-none"
        style={{ left: 280, width: 80, height: '100vh', zIndex: 0 }}
      >
        <svg viewBox="0 0 80 800" width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <pattern id="leftFossil" x="0" y="0" width="80" height="120" patternUnits="userSpaceOnUse">
              {/* 蕨叶化石纹理 */}
              <path d="M30,10 Q15,25 30,40 Q20,35 12,40 Q25,50 30,40" fill="none" stroke={sectionColor} strokeWidth="0.8" opacity="0.3" />
              <path d="M30,40 Q45,55 30,70 Q40,65 48,70 Q35,80 30,70" fill="none" stroke={sectionStrokeColor} strokeWidth="0.6" opacity="0.25" />
              {/* 微小晶体点 */}
              <circle cx="10" cy="20" r="1" fill={sectionColor} opacity="0.15" />
              <circle cx="50" cy="50" r="0.8" fill={sectionStrokeColor} opacity="0.12" />
              <circle cx="8" cy="80" r="1.2" fill={sectionColor} opacity="0.1" />
              <circle cx="45" cy="95" r="0.7" fill={sectionStrokeColor} opacity="0.15" />
              {/* 矿脉线 */}
              <path d="M5,60 Q20,55 35,62 Q45,68 55,63" fill="none" stroke={sectionColor} strokeWidth="0.4" opacity="0.15" />
            </pattern>
          </defs>
          <rect width="80" height="800" fill={`url(#leftFossil)`} />
          {/* 垂直地质层理线 */}
          <path d="M20,0 Q23,200 16,400 Q21,600 18,800" fill="none" stroke={sectionColor} strokeWidth="0.3" opacity="0.12" />
          <path d="M60,0 Q57,200 63,400 Q59,600 61,800" fill="none" stroke={sectionStrokeColor} strokeWidth="0.3" opacity="0.1" />
        </svg>
      </div>

      {/* 右侧装饰 */}
      <div
        className="hidden lg:block fixed top-0 right-0 pointer-events-none"
        style={{ width: 80, height: '100vh', zIndex: 0 }}
      >
        <svg viewBox="0 0 80 800" width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <pattern id="rightGeo" x="0" y="0" width="80" height="100" patternUnits="userSpaceOnUse">
              {/* 等高线纹理 */}
              <path d="M8,30 Q20,20 40,25 Q60,30 75,22" fill="none" stroke={sectionColor} strokeWidth="0.5" opacity="0.2" />
              <path d="M8,40 Q25,32 42,38 Q60,44 75,35" fill="none" stroke={sectionStrokeColor} strokeWidth="0.4" opacity="0.15" />
              <path d="M8,50 Q28,43 47,48 Q64,53 75,46" fill="none" stroke={sectionColor} strokeWidth="0.3" opacity="0.12" />
              {/* 岩石裂纹 */}
              <path d="M25,5 L28,15 L22,25 L26,35" fill="none" stroke={sectionStrokeColor} strokeWidth="0.4" opacity="0.18" />
              <path d="M40,60 L38,70 L42,80 L39,90" fill="none" stroke={sectionColor} strokeWidth="0.3" opacity="0.15" />
              {/* 晶体六边形 */}
              <polygon points="20,70 24,65 30,65 34,70 30,75 24,75" fill="none" stroke={sectionColor} strokeWidth="0.5" opacity="0.12" />
              {/* 散点 */}
              <circle cx="35" cy="15" r="0.8" fill={sectionStrokeColor} opacity="0.12" />
              <circle cx="12" cy="55" r="1" fill={sectionColor} opacity="0.1" />
              <circle cx="48" cy="85" r="0.6" fill={sectionStrokeColor} opacity="0.14" />
            </pattern>
          </defs>
          <rect width="80" height="800" fill={`url(#rightGeo)`} />
          {/* 垂直纹理 */}
          <path d="M12,0 Q16,200 10,400 Q14,600 11,800" fill="none" stroke={sectionColor} strokeWidth="0.3" opacity="0.1" />
          <path d="M66,0 Q63,200 68,400 Q64,600 67,800" fill="none" stroke={sectionStrokeColor} strokeWidth="0.3" opacity="0.08" />
        </svg>
      </div>
    </>
  )
}
