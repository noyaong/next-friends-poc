'use client'

import { useState } from 'react'
import MiniPlayer from './MiniPlayer'
import FullScreenPlayer from './FullScreenPlayer'

// Client Component - useState 때문에 필요
export default function MiniPlayerWrapper() {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false)

  return (
    <>
      {/* 미니 플레이어 */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 md:left-64 lg:left-72 xl:left-80">
        <MiniPlayer onExpand={() => setIsPlayerOpen(true)} />
      </div>
      
      {/* 풀스크린 플레이어 (모바일만) */}
      <FullScreenPlayer 
        isOpen={isPlayerOpen} 
        onClose={() => setIsPlayerOpen(false)} 
      />
    </>
  )
}
