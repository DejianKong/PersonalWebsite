'use client'

import { useState } from 'react'
import FlowBg from './FlowBg'

interface HikingItem {
  slug: string
  title: string
  date: string
  location: string
  distance?: string
  summary: string
  cover?: string
  content: string
}

interface CalligraphyItem {
  slug: string
  title: string
  date: string
  style: string
  cover: string
  description?: string
  content: string
}

interface TravelItem {
  slug: string
  title: string
  date: string
  location: string
  duration?: string
  summary: string
  cover?: string
  content: string
}

interface HobbiesData {
  hiking: HikingItem[]
  calligraphy: CalligraphyItem[]
  travels: TravelItem[]
}

type Tab = 'hiking' | 'calligraphy' | 'travels'

const TAB_LABELS: Record<Tab, string> = {
  hiking: '🏔 徒步',
  calligraphy: '🖌 书法',
  travels: '✈ 旅行',
}

const EMPTY_TEXT: Record<Tab, string> = {
  hiking: '暂无徒步记录，期待你的第一次出发。',
  calligraphy: '暂无书法作品，等待墨迹晕开的那一刻。',
  travels: '暂无旅行记录，世界在等你。',
}

// ---- 通用返回按钮 ----
function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 text-sm mb-4 px-3 py-1 rounded-full transition-all hover:opacity-80"
      style={{ background: '#E8E4DA', color: '#5A5040', fontFamily: 'Noto Serif SC, serif' }}
    >
      ← 返回列表
    </button>
  )
}

// ---- 通用波浪分隔线 ----
function WaveDivider() {
  return (
    <svg viewBox="0 0 600 8" width="100%" height="8" className="mb-4" aria-hidden="true">
      <path d="M0,4 Q150,0 300,4 Q450,8 600,4" fill="none" stroke="#B8C9A3" strokeWidth="1" />
    </svg>
  )
}

// ---- 通用详情页头部 ----
function DetailHeader({
  cover,
  title,
  meta,
  maxCoverHeight = 'max-h-64',
}: {
  cover?: string
  title: string
  meta: React.ReactNode
  maxCoverHeight?: string
}) {
  return (
    <>
      {cover && (
        <img
          src={cover}
          alt={title}
          className={`w-full ${maxCoverHeight} object-cover mb-4`}
          style={{ borderRadius: '12px 8px 14px 8px' }}
        />
      )}
      <h2
        className="text-xl font-bold mb-1"
        style={{ color: '#2A4A10', fontFamily: 'Noto Serif SC, serif' }}
      >
        {title}
      </h2>
      {meta}
    </>
  )
}

export default function SectionHobbies({ data }: { data: HobbiesData }) {
  const [tab, setTab] = useState<Tab>('hiking')
  const [selectedHiking, setSelectedHiking] = useState<HikingItem | null>(null)
  const [selectedCalligraphy, setSelectedCalligraphy] = useState<CalligraphyItem | null>(null)
  const [selectedTravel, setSelectedTravel] = useState<TravelItem | null>(null)

  // ---- 徒步详情页 ----
  if (selectedHiking) {
    return (
      <div className="fade-up">
        <FlowBg color1="#B8C9A3" color2="#C8D8C0" height={80} />
        <div className="max-w-2xl mx-auto px-6 pb-10 pt-2">
          <BackButton onClick={() => setSelectedHiking(null)} />
          <DetailHeader
            cover={selectedHiking.cover}
            title={selectedHiking.title}
            meta={
              <>
                <p className="text-xs mb-1" style={{ color: '#5C7A3E' }}>
                  📍 {selectedHiking.location} {selectedHiking.distance && `· ${selectedHiking.distance}`}
                </p>
                <p className="text-xs mb-4" style={{ color: '#888780' }}>{selectedHiking.date}</p>
              </>
            }
          />
          <WaveDivider />
          <div className="prose-geo" dangerouslySetInnerHTML={{ __html: selectedHiking.content }} />
        </div>
      </div>
    )
  }

  // ---- 书法详情页 ----
  if (selectedCalligraphy) {
    return (
      <div className="fade-up">
        <FlowBg color1="#B8C9A3" color2="#C8D8C0" height={80} />
        <div className="max-w-2xl mx-auto px-6 pb-10 pt-2">
          <BackButton onClick={() => setSelectedCalligraphy(null)} />
          <DetailHeader
            cover={selectedCalligraphy.cover}
            title={selectedCalligraphy.title}
            meta={
              <>
                <p className="text-xs mb-1" style={{ color: '#7A7060' }}>
                  {selectedCalligraphy.style} · {selectedCalligraphy.date}
                </p>
                {selectedCalligraphy.description && (
                  <p className="text-sm mb-2" style={{ color: '#5A5040' }}>{selectedCalligraphy.description}</p>
                )}
              </>
            }
            maxCoverHeight="max-h-80"
          />
          <WaveDivider />
          <div className="prose-geo" dangerouslySetInnerHTML={{ __html: selectedCalligraphy.content }} />
        </div>
      </div>
    )
  }

  // ---- 旅行详情页 ----
  if (selectedTravel) {
    return (
      <div className="fade-up">
        <FlowBg color1="#B8C9A3" color2="#C8D8C0" height={80} />
        <div className="max-w-2xl mx-auto px-6 pb-10 pt-2">
          <BackButton onClick={() => setSelectedTravel(null)} />
          <DetailHeader
            cover={selectedTravel.cover}
            title={selectedTravel.title}
            meta={
              <>
                <p className="text-xs mb-1" style={{ color: '#5C7A3E' }}>
                  📍 {selectedTravel.location} {selectedTravel.duration && `· ${selectedTravel.duration}`}
                </p>
                <p className="text-xs mb-4" style={{ color: '#888780' }}>{selectedTravel.date}</p>
              </>
            }
          />
          <WaveDivider />
          <div className="prose-geo" dangerouslySetInnerHTML={{ __html: selectedTravel.content }} />
        </div>
      </div>
    )
  }

  // ---- 列表页 ----
  return (
    <div className="fade-up">
      <FlowBg color1="#B8C9A3" color2="#C8D8C0" height={100} />

      <div className="px-6 pb-10 pt-2">
        <h2 className="text-xl font-bold mb-4" style={{ color: '#2A4A10', fontFamily: 'Noto Serif SC, serif' }}>
          兴趣爱好
        </h2>

        {/* Tab 切换 */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {(['hiking', 'calligraphy', 'travels'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-1.5 text-sm rounded-full transition-all"
              style={{
                background: tab === t ? '#5C7A3E' : '#E8E4DA',
                color: tab === t ? '#fff' : '#5A5040',
                border: '0.5px solid ' + (tab === t ? '#5C7A3E' : '#B4B2A9'),
                fontFamily: 'Noto Serif SC, serif',
              }}
            >
              {TAB_LABELS[t]}
            </button>
          ))}
        </div>

        {/* ---- 徒步列表（网格） ---- */}
        {tab === 'hiking' && (
          <div className="grid grid-cols-3 gap-3">
            {data.hiking.length === 0 && (
              <p className="col-span-3 text-sm" style={{ color: '#888780' }}>{EMPTY_TEXT.hiking}</p>
            )}
            {data.hiking.map(item => (
              <div
                key={item.slug}
                className="card-organic cursor-pointer transition-all hover:shadow-md group"
                style={{ border: '0.5px solid #C8D8C0' }}
                onClick={() => setSelectedHiking(item)}
              >
                {item.cover && (
                  <div className="overflow-hidden" style={{ borderRadius: '10px 6px 0 0' }}>
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-3">
                  <h3 className="font-bold text-sm leading-snug" style={{ color: '#2A4A10', fontFamily: 'Noto Serif SC, serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: '#5C7A3E' }}>
                    📍 {item.location} {item.distance && `· ${item.distance}`}
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#888780' }}>{item.date}</p>
                  <p className="text-xs mt-2 leading-relaxed line-clamp-2" style={{ color: '#3a3a36' }}>{item.summary}</p>
                  <p className="text-xs mt-2 text-right" style={{ color: '#5C7A3E' }}>阅读详情 →</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ---- 书法列表（画廊双列） ---- */}
        {tab === 'calligraphy' && (
          <div className="grid grid-cols-3 gap-3">
            {data.calligraphy.length === 0 && (
              <p className="col-span-3 text-sm" style={{ color: '#888780' }}>{EMPTY_TEXT.calligraphy}</p>
            )}
            {data.calligraphy.map(item => (
              <div
                key={item.slug}
                className="card-organic overflow-hidden cursor-pointer group"
                style={{ border: '0.5px solid #B8C9A3' }}
                onClick={() => setSelectedCalligraphy(item)}
              >
                <div className="h-48 bg-stone-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3">
                  <p className="font-bold text-sm" style={{ color: '#2A4A10', fontFamily: 'Noto Serif SC, serif' }}>{item.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#7A7060' }}>{item.style} · {item.date}</p>
                  {item.description && <p className="text-xs mt-1" style={{ color: '#5A5040' }}>{item.description}</p>}
                  <p className="text-xs mt-2" style={{ color: '#5C7A3E' }}>查看详情 →</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ---- 旅行列表（网格） ---- */}
        {tab === 'travels' && (
          <div className="grid grid-cols-3 gap-3">
            {data.travels.length === 0 && (
              <p className="col-span-3 text-sm" style={{ color: '#888780' }}>{EMPTY_TEXT.travels}</p>
            )}
            {data.travels.map(item => (
              <div
                key={item.slug}
                className="card-organic cursor-pointer transition-all hover:shadow-md group"
                style={{ border: '0.5px solid #C8D8C0' }}
                onClick={() => setSelectedTravel(item)}
              >
                {item.cover && (
                  <div className="overflow-hidden" style={{ borderRadius: '10px 6px 0 0' }}>
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-3">
                  <h3 className="font-bold text-sm leading-snug" style={{ color: '#2A4A10', fontFamily: 'Noto Serif SC, serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: '#5C7A3E' }}>
                    📍 {item.location} {item.duration && `· ${item.duration}`}
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#888780' }}>{item.date}</p>
                  <p className="text-xs mt-2 leading-relaxed line-clamp-2" style={{ color: '#3a3a36' }}>{item.summary}</p>
                  <p className="text-xs mt-2 text-right" style={{ color: '#5C7A3E' }}>阅读详情 →</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
