'use client'

import { useState } from 'react'
import FlowBg from './FlowBg'

interface ArticleItem {
  slug: string
  title: string
  date: string
  summary: string
  cover?: string
  url: string
}

interface VideoItem {
  slug: string
  title: string
  date: string
  summary: string
  cover?: string
  url: string
  platform: string
}

interface CreationsData {
  articles: ArticleItem[]
  videos: VideoItem[]
}

type Tab = 'articles' | 'videos'

export default function SectionCreations({ data }: { data: CreationsData }) {
  const [tab, setTab] = useState<Tab>('articles')

  return (
    <div className="fade-up">
      <FlowBg color1="#C8D8C0" color2="#A8B8C8" height={100} />

      <div className="px-6 pb-10 pt-2">
        <h2 className="text-xl font-bold mb-4" style={{ color: '#1A4030', fontFamily: 'Noto Serif SC, serif' }}>
          创作内容
        </h2>

        <div className="flex gap-3 mb-6">
          {(['articles', 'videos'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-1.5 text-sm rounded-full transition-all"
              style={{
                background: tab === t ? '#4A7060' : '#E8E4DA',
                color: tab === t ? '#fff' : '#5A5040',
                border: '0.5px solid ' + (tab === t ? '#4A7060' : '#B4B2A9'),
                fontFamily: 'Noto Serif SC, serif',
              }}
            >
              {t === 'articles' ? '📝 公众号文章' : '🎬 视频'}
            </button>
          ))}
        </div>

        {/* 文章卡片（网格） */}
        {tab === 'articles' && (
          <div className="grid grid-cols-3 gap-3">
            {data.articles.length === 0 && (
              <p className="col-span-3 text-sm" style={{ color: '#888780' }}>暂无文章，敬请期待。</p>
            )}
            {data.articles.map(item => (
              <a
                key={item.slug}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-organic overflow-hidden group hover:shadow-md transition-shadow"
                style={{ border: '0.5px solid #C8D8C0', textDecoration: 'none' }}
              >
                {item.cover && (
                  <div className="overflow-hidden" style={{ borderRadius: '10px 6px 0 0' }}>
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="w-full h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-3">
                  <h3 className="font-bold text-sm leading-snug group-hover:underline" style={{ color: '#1A4030', fontFamily: 'Noto Serif SC, serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: '#888780' }}>{item.date}</p>
                  <p className="text-xs mt-1.5 leading-relaxed line-clamp-2" style={{ color: '#5a5a54' }}>{item.summary}</p>
                  <p className="text-xs mt-2" style={{ color: '#4A7060' }}>微信公众号 →</p>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* 视频卡片（网格） */}
        {tab === 'videos' && (
          <div className="grid grid-cols-3 gap-3">
            {data.videos.length === 0 && (
              <p className="col-span-3 text-sm" style={{ color: '#888780' }}>暂无视频，期待第一支作品上线。</p>
            )}
            {data.videos.map(item => (
              <a
                key={item.slug}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-organic overflow-hidden group hover:shadow-md transition-shadow"
                style={{ border: '0.5px solid #B8C9A3', textDecoration: 'none' }}
              >
                {/* 视频封面 */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: 140, background: '#2a2a28' }}
                >
                  {item.cover ? (
                    <img src={item.cover} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span style={{ fontSize: '1.8rem', color: '#888780' }}>▶</span>
                    </div>
                  )}
                  {/* 播放图标覆盖 */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: 'rgba(0,0,0,0.4)' }}
                  >
                    <span style={{ color: '#fff', fontSize: '1.4rem' }}>▶</span>
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="font-bold text-sm leading-snug group-hover:underline" style={{ color: '#1A4030', fontFamily: 'Noto Serif SC, serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs mt-1" style={{ color: '#888780' }}>{item.date}</p>
                  <p className="text-xs mt-1.5 leading-relaxed line-clamp-2" style={{ color: '#5a5a54' }}>{item.summary}</p>
                  <p className="text-xs mt-2" style={{ color: '#4A6080' }}>B站观看 →</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
