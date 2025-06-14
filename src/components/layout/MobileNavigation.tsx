'use client'  

import { BarChart3, FileText, History, User } from 'lucide-react'
import MobileNavigationLink from './MobileNavigationLink'

interface NavigationItem {
  id: string
  icon: any
  label: string
  href: string
}

interface MobileNavigationProps {
  activeTab?: string
}

// Client Component - MobileNavigationLink가 Client Component이므로
export default function MobileNavigation({ activeTab = 'home' }: MobileNavigationProps) {
  const navItems: NavigationItem[] = [
    { id: 'home', icon: BarChart3, label: '분석', href: '/' },
    { id: 'reports', icon: FileText, label: '보고서', href: '/reports' },
    { id: 'history', icon: History, label: '히스토리', href: '/history' },
    { id: 'profile', icon: User, label: '프로필', href: '/profile' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border md:hidden">
      <nav className="flex items-center justify-around h-16 px-4">
        {navItems.map((item) => (
          <MobileNavigationLink 
            key={item.id}
            item={item}
            activeTab={activeTab}
            disabled={item.id !== 'home'}
          />
        ))}
      </nav>
    </div>
  )
}
