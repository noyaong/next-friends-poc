
import { BarChart3, Search, FileText, User, Brain, Zap, History, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import ThemeToggle from '../ui/ThemeToggle'
import NavigationLink from './NavigationLink'
import ResponsiveImage from '../ui/ResponsiveImage'
import Link from 'next/link'

interface SidebarProps {
  activeTab?: string
}

// Client Component - NavigationLink가 Client Component이므로
export default function Sidebar({ activeTab = 'home' }: SidebarProps) {
  const mainNavItems = [
    { id: 'home', icon: BarChart3, label: '분석하기', href: '/' },
    { id: 'reports', icon: FileText, label: '보고서', href: '/reports' },
    { id: 'history', icon: History, label: '히스토리', href: '/history' },
    { id: 'demo', icon: User, label: '데모', href: '/demo' },
  ]

  const analysisTools = [
    { id: 'quick-analysis', icon: Zap, label: '빠른 분석', href: '/quick' },
    { id: 'ai-suggestions', icon: Brain, label: 'AI 개선안', href: '/ai-suggestions' },
    { id: 'performance', icon: TrendingUp, label: '성능 분석', href: '/performance' },
  ]

  return (
    <div className="hidden md:flex md:w-64 lg:w-72 xl:w-80 bg-card border-r border-border h-screen flex-col">
      {/* 로고 영역 */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <Link href="/">
            <img 
              src="https://growthmk.com/wp-content/uploads/2024/07/growth_150_37.png" 
              alt="AI SEO Analyzer" 
            />
          </Link>
          <ThemeToggle size="sm" />
        </div>
      </div>

      {/* 메인 네비게이션 */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {mainNavItems.map((item) => (
            <NavigationLink 
              key={item.id} 
              item={item} 
              activeTab={activeTab}
              disabled={item.id !== 'home'}
            />
          ))}
        </div>

        {/* 분석 도구 섹션 */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-muted-foreground mb-3 px-3">
            분석 도구
          </h2>
          <div className="space-y-1">
            {analysisTools.map((item) => (
              <NavigationLink 
                key={item.id} 
                item={item} 
                activeTab={activeTab}
                isLibraryItem
                disabled={true}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* 사용자 프로필 */}
      <div className="p-4 border-t border-border">
        <NavigationLink 
          item={{ id: 'profile', icon: User, label: '내 프로필', href: '/profile' }}
          activeTab={activeTab}
          isProfileLink
          disabled={true}
        />
      </div>
    </div>
  )
}
