'use client'

import { useRouter, usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { ComponentType } from 'react'

interface NavigationItem {
  id: string
  icon: LucideIcon
  label: string
  href: string
}

interface MobileNavigationLinkProps {
  item: NavigationItem
  activeTab?: string
  disabled?: boolean
}

// Client Component - useRouter 때문에 필요
export default function MobileNavigationLink({ item, activeTab, disabled = false }: MobileNavigationLinkProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  const { id, icon: Icon, label, href } = item
  
  const getActiveTab = () => {
    if (pathname === '/') return 'home'
    if (pathname.startsWith('/search')) return 'search'
    if (pathname.startsWith('/library')) return 'library'
    if (pathname.startsWith('/profile')) return 'profile'
    return activeTab
  }

  const currentActiveTab = getActiveTab()
  const isActive = currentActiveTab === id
  
  const handleClick = () => {
    if (!disabled) {
      router.push(href)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "flex flex-col items-center justify-center flex-1 h-full",
        "transition-colors duration-200",
        disabled 
          ? "text-muted-foreground/50 cursor-not-allowed opacity-50" 
          : isActive 
            ? "text-primary" 
            : "text-muted-foreground hover:text-foreground"
      )}
    >
      <Icon size={20} />
      <span className="text-xs mt-1">{label}</span>
    </button>
  )
}
