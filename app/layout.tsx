import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '头上有个陨石坑',
  description: '地球科学 · 徒步 · 书法 · 创作 · 笔记 · 简历',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}
