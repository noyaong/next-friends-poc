'use client'

import { useState } from 'react'
import { X, Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Heart, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FullScreenPlayerProps {
  isOpen: boolean
  onClose: () => void
}

export default function FullScreenPlayer({ isOpen, onClose }: FullScreenPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isRepeat, setIsRepeat] = useState(false)
  const [isShuffle, setIsShuffle] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-background z-50 md:hidden">
      <div className="flex flex-col h-full">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="font-medium">재생 중</h2>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <MoreHorizontal size={24} />
          </button>
        </div>

        {/* 앨범 아트 */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-80 h-80 max-w-[calc(100vw-4rem)] max-h-[calc(100vw-4rem)] bg-muted rounded-lg">
            {/* 앨범 아트 placeholder */}
          </div>
        </div>

        {/* 곡 정보 */}
        <div className="px-6 py-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold mb-1 truncate">좋은 날</h1>
              <p className="text-lg text-muted-foreground truncate">아이유 (IU)</p>
            </div>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                "p-2 rounded-full transition-colors",
                isLiked 
                  ? "text-red-500 hover:text-red-600" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* 프로그레스 바 */}
        <div className="px-6 py-2">
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div className="bg-primary h-2 rounded-full w-1/3 transition-all duration-300"></div>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>1:23</span>
            <span>3:45</span>
          </div>
        </div>

        {/* 컨트롤 버튼들 */}
        <div className="px-6 py-6">
          {/* 상단 컨트롤 (셔플, 리피트) */}
          <div className="flex justify-center gap-8 mb-6">
            <button 
              onClick={() => setIsShuffle(!isShuffle)}
              className={cn(
                "p-2 rounded-full transition-colors",
                isShuffle 
                  ? "text-primary hover:text-primary/80" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Shuffle size={20} />
            </button>
            <button 
              onClick={() => setIsRepeat(!isRepeat)}
              className={cn(
                "p-2 rounded-full transition-colors",
                isRepeat 
                  ? "text-primary hover:text-primary/80" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Repeat size={20} />
            </button>
          </div>

          {/* 메인 컨트롤 */}
          <div className="flex items-center justify-center gap-6">
            <button className="p-3 hover:bg-muted rounded-full transition-colors">
              <SkipBack size={28} />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full transition-colors"
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </button>
            <button className="p-3 hover:bg-muted rounded-full transition-colors">
              <SkipForward size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
