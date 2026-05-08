'use client'

import { useState } from 'react'
import CrustCircleNav, { SectionId } from '@/components/CrustCircleNav'
import HomeOverview from '@/components/HomeOverview'
import SideDecor from '@/components/SideDecor'
import SectionAbout from '@/components/SectionAbout'
import SectionHobbies from '@/components/SectionHobbies'
import SectionCreations from '@/components/SectionCreations'
import SectionDiary from '@/components/SectionDiary'
import SectionNotes from '@/components/SectionNotes'
import SectionResume from '@/components/SectionResume'

// 每个章节对应的颜色
const SECTION_COLORS: Record<SectionId, { fill: string; stroke: string }> = {
  about:     { fill: '#D3C49A', stroke: '#A08840' },
  hobbies:   { fill: '#B8C9A3', stroke: '#5C7A3E' },
  creations: { fill: '#C8D8C0', stroke: '#4A7060' },
  diary:     { fill: '#A8B8C8', stroke: '#4A6080' },
  notes:     { fill: '#7A9090', stroke: '#2A5060' },
  resume:    { fill: '#5A4040', stroke: '#3A2020' },
}

interface Props {
  aboutData: any
  hobbiesData: any
  creationsData: any
  diaryData: any
  notesData: any
  resumeData: any
}

type ViewMode = 'home' | 'section'

export default function SiteClient({
  aboutData, hobbiesData, creationsData, diaryData, notesData, resumeData,
}: Props) {
  const [active, setActive] = useState<SectionId>('about')
  const [viewMode, setViewMode] = useState<ViewMode>('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavSelect = (id: SectionId) => {
    setActive(id)
    setViewMode('section')
    setMobileOpen(false)
  }

  const handleGoHome = () => {
    setViewMode('home')
    setMobileOpen(false)
  }

  // 侧边装饰在章节视图下始终显示（列表和详情都显示）
  const showSideDecor = viewMode === 'section'

  return (
    <div className="min-h-screen flex" style={{ background: '#F5F2EC' }}>

      {/* ===== 桌面端左侧导航 ===== */}
      <aside
        className="hidden lg:flex flex-col sticky top-0 h-screen overflow-y-auto flex-shrink-0"
        style={{ width: 280, background: '#E8E4DA', borderRight: '0.5px solid #C8C4BA', zIndex: 10 }}
      >
        <CrustCircleNav active={active} onSelect={handleNavSelect} />

        {/* 回首页按钮 */}
        <div className="px-4 py-2">
          <button
            onClick={handleGoHome}
            className="w-full py-2 text-xs rounded-full transition-all"
            style={{
              background: viewMode === 'home' ? '#D3C49A' : 'transparent',
              color: viewMode === 'home' ? '#4A3200' : '#7A7060',
              border: '0.5px solid #C8C4BA',
              fontFamily: 'Noto Serif SC, serif',
            }}
          >
            {viewMode === 'home' ? '● 首页总览' : '← 返回首页'}
          </button>
        </div>

        {/* 页脚 */}
        <div className="mt-auto px-4 py-3 text-center" style={{ borderTop: '0.5px solid #C8C4BA' }}>
          <p className="text-xs" style={{ color: '#888780', fontFamily: 'Noto Serif SC, serif' }}>© 头上有个陨石坑</p>
        </div>
      </aside>

      {/* ===== 移动端顶部 Bar ===== */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-3"
        style={{ background: '#E8E4DA', borderBottom: '0.5px solid #C8C4BA' }}
      >
        {viewMode === 'home' ? (
          <h1 className="text-sm font-bold" style={{ color: '#3a2800', fontFamily: 'Noto Serif SC, serif' }}>
            头上有个陨石坑
          </h1>
        ) : (
          <button
            onClick={handleGoHome}
            className="text-sm flex items-center gap-1"
            style={{ color: '#4A6080', fontFamily: 'Noto Serif SC, serif' }}
          >
            ← 返回
          </button>
        )}
        <button
          onClick={() => setMobileOpen(v => !v)}
          className="w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          aria-label="菜单"
        >
          <span className="block w-5 h-0.5" style={{ background: '#5A5040' }} />
          <span className="block w-5 h-0.5" style={{ background: '#5A5040' }} />
          <span className="block w-4 h-0.5" style={{ background: '#5A5040' }} />
        </button>
      </header>

      {/* 移动端抽屉导航 */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 flex"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="w-72 h-full overflow-y-auto"
            style={{ background: '#E8E4DA' }}
            onClick={e => e.stopPropagation()}
          >
            <CrustCircleNav active={active} onSelect={handleNavSelect} />
            <div className="px-4 py-2">
              <button
                onClick={handleGoHome}
                className="w-full py-2 text-xs rounded-full"
                style={{
                  background: viewMode === 'home' ? '#D3C49A' : 'transparent',
                  color: viewMode === 'home' ? '#4A3200' : '#7A7060',
                  border: '0.5px solid #C8C4BA',
                  fontFamily: 'Noto Serif SC, serif',
                }}
              >
                {viewMode === 'home' ? '● 首页总览' : '← 返回首页'}
              </button>
            </div>
          </div>
          <div className="flex-1" style={{ background: 'rgba(0,0,0,0.4)' }} />
        </div>
      )}

      {/* ===== 侧边装饰（章节视图） ===== */}
      {showSideDecor && (
        <SideDecor
          sectionColor={SECTION_COLORS[active].fill}
          sectionStrokeColor={SECTION_COLORS[active].stroke}
        />
      )}

      {/* ===== 右侧内容区 ===== */}
      <main
        className="flex-1 overflow-y-auto lg:pt-0 pt-14"
        style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}
      >
        {/* 首页总览视图 */}
        {viewMode === 'home' && (
          <div className="max-w-5xl mx-auto px-6">
            <HomeOverview
              aboutData={aboutData}
              hobbiesData={hobbiesData}
              creationsData={creationsData}
              diaryData={diaryData}
              notesData={notesData}
              resumeData={resumeData}
              onSectionClick={handleNavSelect}
            />
          </div>
        )}

        {/* 章节/详情视图 */}
        {viewMode === 'section' && (
          <>
            {/* 顶部流动装饰带 */}
            <svg
              viewBox="0 0 900 8"
              width="100%"
              height="8"
              aria-hidden="true"
              style={{ display: 'block' }}
            >
              <path d="M0,4 Q225,0 450,4 Q675,8 900,4" fill="none" stroke={SECTION_COLORS[active].fill} strokeWidth="1" />
            </svg>

            <div>
              {active === 'about'     && <SectionAbout data={aboutData} />}
              {active === 'hobbies'   && <SectionHobbies data={hobbiesData} />}
              {active === 'creations' && <SectionCreations data={creationsData} />}
              {active === 'diary'     && <SectionDiary items={diaryData} />}
              {active === 'notes'     && <SectionNotes data={notesData} />}
              {active === 'resume'    && <SectionResume data={resumeData} />}
            </div>

            {/* 底部装饰 */}
            <div className="mt-10 px-6 pb-6">
              <svg viewBox="0 0 600 20" width="100%" height="20" aria-hidden="true">
                <path d="M0,10 Q150,2 300,10 Q450,18 600,10" fill="none" stroke={SECTION_COLORS[active].fill} strokeWidth="1" />
              </svg>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
