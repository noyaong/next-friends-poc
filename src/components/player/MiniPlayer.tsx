'use client'

import { useState } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MiniPlayerProps {
  onExpand?: () => void
}

export default function MiniPlayer({ onExpand }: MiniPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(75)

  return (
    <div className="bg-card border-t border-border">
      {/* 모바일 확장 버튼 */}
      <button 
        onClick={onExpand}
        className="md:hidden w-full p-2 flex justify-center hover:bg-muted/50 transition-colors"
      >
        <ChevronUp size={16} className="text-muted-foreground" />
      </button>

      <div className="flex items-center gap-3 p-3 md:p-4">
        {/* 앨범 아트 + 곡 정보 */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-muted rounded-md flex-shrink-0">
            {/* 앨범 아트 placeholder */}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-medium text-sm md:text-base truncate">
              좋은 날
            </h4>
            <p className="text-xs md:text-sm text-muted-foreground truncate">
              아이유 (IU)
            </p>
          </div>
        </div>

        {/* 재생 컨트롤 (데스크톱만) */}
        <div className="hidden md:flex items-center gap-2">
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <SkipBack size={18} />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <SkipForward size={18} />
          </button>
        </div>

        {/* 볼륨 컨트롤 (큰 화면만) */}
        <div className="hidden lg:flex items-center gap-2 w-32">
          <Volume2 size={16} className="text-muted-foreground" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="flex-1 h-1 bg-muted rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
              [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>

        {/* 모바일 재생 버튼 */}
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="md:hidden p-2 hover:bg-muted rounded-full transition-colors"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>

      {/* 프로그레스 바 */}
      <div className="px-3 pb-2 md:px-4 md:pb-3">
        <div className="w-full bg-muted rounded-full h-1">
          <div className="bg-primary h-1 rounded-full w-1/3 transition-all duration-300"></div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>1:23</span>
          <span>3:45</span>
        </div>
      </div>
    </div>
  )
}
