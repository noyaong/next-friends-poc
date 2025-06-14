
import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import MobileNavigation from './MobileNavigation'
import Footer from './Footer'
import ThemeToggle from '../ui/ThemeToggle'
import Link from 'next/link'

interface MainLayoutProps {
  children: ReactNode
  activeTab?: string
}

// Client Component - activeTab prop을 하위 Client Component들에게 전달
export default function MainLayout({ children, activeTab }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* 데스크톱 사이드바 */}
      <Sidebar activeTab={activeTab} />
      
      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col">
        {/* 상단 헤더 (모바일에서 보임) */}
        <header className="md:hidden bg-background border-b border-border p-4">
          <div className="flex items-center justify-between">
            {/* <h1 className="text-lg font-bold text-primary">🧠 AI SEO Analyzer</h1> */}
            <Link href="/">
            <img 
              src="https://growthmk.com/wp-content/uploads/2024/07/growth_150_37.png" 
              alt="AI SEO Analyzer" 
            />
            </Link>
            <ThemeToggle size="sm" />
          </div>
        </header>
        
        {/* 메인 콘텐츠 */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6 pb-6 md:pb-6">
            {children}
          </div>
          
          {/* Footer */}
          <Footer />
        </main>
        
        {/* AI SEO Analyzer에는 플레이어가 필요 없음 */}
      </div>
      
      {/* 모바일 하단 네비게이션 */}
      <MobileNavigation activeTab={activeTab} />
    </div>
  )
}
