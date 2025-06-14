
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function ThemeToggle({ className, size = 'md' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12'
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative rounded-full bg-muted hover:bg-muted/80 transition-all duration-300",
        "flex items-center justify-center",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        sizeClasses[size],
        className
      )}
      aria-label={theme === 'light' ? '다크모드로 전환' : '라이트모드로 전환'}
    >
      {/* 라이트모드 아이콘 */}
      <Sun 
        size={iconSizes[size]} 
        className={cn(
          "absolute transition-all duration-300",
          theme === 'light' 
            ? "rotate-0 scale-100 opacity-100" 
            : "rotate-90 scale-0 opacity-0"
        )}
      />
      
      {/* 다크모드 아이콘 */}
      <Moon 
        size={iconSizes[size]} 
        className={cn(
          "absolute transition-all duration-300",
          theme === 'dark' 
            ? "rotate-0 scale-100 opacity-100" 
            : "-rotate-90 scale-0 opacity-0"
        )}
      />
    </button>
  )
}
