'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ResponsiveImageProps {
  src: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
  aspectRatio?: 'square' | '16/9' | '4/3' | '3/2'
}

export default function ResponsiveImage({ 
  src, 
  alt, 
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false,
  aspectRatio = 'square'
}: ResponsiveImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const aspectRatioClasses = {
    'square': 'aspect-square',
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]'
  }

  return (
    <div className={cn(
      'relative overflow-hidden rounded-md bg-muted',
      aspectRatioClasses[aspectRatio],
      className
    )}>
      {/* 로딩 스켈레톤 */}
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-muted">
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-muted-foreground/30 border-t-primary rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* 에러 상태 */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center text-muted-foreground">
            <div className="text-2xl mb-2">🖼️</div>
            <p className="text-sm">이미지를 불러올 수 없습니다</p>
          </div>
        </div>
      )}

      {/* 실제 이미지 */}
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        className={cn(
          'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
          isLoading || hasError ? 'opacity-0' : 'opacity-100'
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
        loading={priority ? 'eager' : 'lazy'}
      />

      {/* 호버 오버레이 */}
      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-200" />
    </div>
  )
}
