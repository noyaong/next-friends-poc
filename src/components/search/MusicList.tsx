'use client'

import { Play, Heart, MoreHorizontal, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const mockSongs = [
  { id: 1, title: '좋은 날', artist: '아이유 (IU)', album: 'Real', duration: '3:45', year: '2010', genre: 'K-Pop' },
  { id: 2, title: 'Dynamite', artist: 'BTS', album: 'BE', duration: '3:19', year: '2020', genre: 'K-Pop' },
  { id: 3, title: 'Celebrity', artist: '아이유 (IU)', album: 'LILAC', duration: '3:15', year: '2021', genre: 'K-Pop' },
  { id: 4, title: 'Next Level', artist: 'aespa', album: 'Savage', duration: '3:29', year: '2021', genre: 'K-Pop' },
  { id: 5, title: 'ELEVEN', artist: 'IVE', album: 'ELEVEN', duration: '2:58', year: '2021', genre: 'K-Pop' },
  { id: 6, title: 'LOVE DIVE', artist: 'IVE', album: 'LOVE DIVE', duration: '2:57', year: '2022', genre: 'K-Pop' },
  { id: 7, title: 'Attention', artist: 'NewJeans', album: 'Get Up', duration: '3:01', year: '2022', genre: 'K-Pop' },
  { id: 8, title: 'OMG', artist: 'NewJeans', album: 'Get Up', duration: '3:35', year: '2023', genre: 'K-Pop' },
]

export default function MusicList() {
  return (
    <>
      {/* 모바일 카드 뷰 */}
      <div className="md:hidden space-y-3">
        {mockSongs.map((song) => (
          <div 
            key={song.id}
            className="bg-card border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {/* 앨범 아트 */}
              <div className="w-12 h-12 bg-muted rounded-md flex-shrink-0 flex items-center justify-center">
                <button className="p-2 hover:bg-background/50 rounded-full transition-colors">
                  <Play size={16} />
                </button>
              </div>
              
              {/* 곡 정보 */}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{song.title}</h4>
                <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                <p className="text-xs text-muted-foreground">{song.album} • {song.year}</p>
              </div>
              
              {/* 액션 버튼들 */}
              <div className="flex items-center gap-1">
                <button className="p-2 hover:bg-muted rounded-full transition-colors">
                  <Heart size={16} />
                </button>
                <button className="p-2 hover:bg-muted rounded-full transition-colors">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 데스크톱 테이블 뷰 */}
      <div className="hidden md:block">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          {/* 테이블 헤더 */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-border text-sm font-medium text-muted-foreground">
            <div className="col-span-1">#</div>
            <div className="col-span-5">제목</div>
            <div className="col-span-3">앨범</div>
            <div className="col-span-2">장르</div>
            <div className="col-span-1 flex justify-center">
              <Clock size={16} />
            </div>
          </div>
          
          {/* 테이블 바디 */}
          <div>
            {mockSongs.map((song, index) => (
              <div 
                key={song.id}
                className={cn(
                  "grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 transition-colors group cursor-pointer",
                  index !== mockSongs.length - 1 && "border-b border-border"
                )}
              >
                {/* 번호/재생 버튼 */}
                <div className="col-span-1 flex items-center">
                  <span className="group-hover:hidden text-muted-foreground">
                    {index + 1}
                  </span>
                  <button className="hidden group-hover:block p-1 hover:bg-background/50 rounded-full">
                    <Play size={14} />
                  </button>
                </div>
                
                {/* 제목과 아티스트 */}
                <div className="col-span-5 flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 bg-muted rounded flex-shrink-0"></div>
                  <div className="min-w-0">
                    <div className="font-medium truncate">{song.title}</div>
                    <div className="text-sm text-muted-foreground truncate">{song.artist}</div>
                  </div>
                </div>
                
                {/* 앨범 */}
                <div className="col-span-3 flex items-center text-sm text-muted-foreground truncate">
                  {song.album}
                </div>
                
                {/* 장르 */}
                <div className="col-span-2 flex items-center text-sm text-muted-foreground">
                  {song.genre}
                </div>
                
                {/* 재생시간과 액션 */}
                <div className="col-span-1 flex items-center justify-center gap-2">
                  <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded-full transition-all">
                    <Heart size={14} />
                  </button>
                  <span className="text-sm text-muted-foreground">{song.duration}</span>
                  <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-muted rounded-full transition-all">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
