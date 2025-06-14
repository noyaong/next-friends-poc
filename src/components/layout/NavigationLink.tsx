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

interface NavigationLinkProps {
  item: NavigationItem
  activeTab?: string
  isLibraryItem?: boolean
  isProfileLink?: boolean
  disabled?: boolean
}

// Client Component - useRouter 때문에 필요
export default function NavigationLink({ 
  item, 
  activeTab, 
  isLibraryItem = false, 
  isProfileLink = false,
  disabled = false
}: NavigationLinkProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  const { id, icon: Icon, label, href } = item
  
  const getActiveTab = () => {
    if (pathname === '/') return 'home'
    if (pathname.startsWith('/search')) return 'search'
    if (pathname.startsWith('/library')) return 'library'
    if (pathname.startsWith('/playlists')) return 'playlists'
    if (pathname.startsWith('/liked')) return 'liked'
    if (pathname.startsWith('/recent')) return 'recent'
    if (pathname.startsWith('/profile')) return 'profile'
    return activeTab
  }

  const currentActiveTab = getActiveTab()
  const isActive = currentActiveTab === id
  
  const handleClick = () => {
    if (disabled) return
    router.push(href)
  }

  if (isProfileLink) {
    return (
      <button 
        onClick={handleClick}
        className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-muted/50 transition-colors"
      >
        <Icon size={20} />
        <span className="text-sm">{label}</span>
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "flex items-center gap-3 w-full p-3 rounded-lg text-left",
        "transition-colors duration-200",
        disabled
          ? "text-muted-foreground/50 cursor-not-allowed opacity-50"
          : isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      )}
    >
      <Icon size={isLibraryItem ? 18 : 20} />
      <span className={isLibraryItem ? "text-sm" : ""}>{label}</span>
    </button>
  )
}
