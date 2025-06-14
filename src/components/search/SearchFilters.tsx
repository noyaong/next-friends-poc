'use client'

import { useState } from 'react'
import { Filter, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchFiltersProps {
  className?: string
  onClose?: () => void
}

export default function SearchFilters({ className, onClose }: SearchFiltersProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedArtist, setSelectedArtist] = useState('')

  const genres = ['K-Pop', 'Pop', 'Rock', 'Jazz', 'Classical', 'Hip-Hop', 'Electronic', 'Indie']
  const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018']

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) 
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
  }

  const clearFilters = () => {
    setSelectedGenres([])
    setSelectedYear('')
    setSelectedArtist('')
  }

  return (
    <div className={cn(
      "bg-card border border-border rounded-lg",
      "p-4 md:p-4", // 모바일에서는 부모가 패딩 처리
      className
    )}>
      {/* 헤더 - 모바일과 데스크톱에서 다름 */}
      <div className="flex items-center justify-between mb-4 md:mb-4">
        {/* 모바일 헤더 */}
        <h2 className="text-lg font-semibold md:hidden">필터</h2>
        
        {/* 데스크톱 헤더 */}
        <h3 className="hidden md:flex font-medium items-center gap-2">
          <Filter size={16} />
          필터
        </h3>
        
        {/* 모바일 닫기 버튼 */}
        {onClose && (
          <button 
            onClick={onClose}
            className="md:hidden p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        )}
        
        {/* 데스크톱 초기화 버튼 */}
        <button 
          onClick={clearFilters}
          className="hidden md:block text-sm text-primary hover:text-primary/80 transition-colors"
        >
          초기화
        </button>
      </div>

      <div className="space-y-6">
        {/* 장르 필터 */}
        <div>
          <h4 className="font-medium mb-3">장르</h4>
          <div className="grid grid-cols-2 gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={cn(
                  "p-2 text-sm rounded-md border transition-colors text-left",
                  selectedGenres.includes(genre)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:bg-muted"
                )}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* 연도 필터 */}
        <div>
          <h4 className="font-medium mb-3">연도</h4>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full p-2 bg-background border border-border rounded-md text-sm"
          >
            <option value="">전체</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* 아티스트 검색 */}
        <div>
          <h4 className="font-medium mb-3">아티스트</h4>
          <input
            type="text"
            placeholder="아티스트 이름 검색..."
            value={selectedArtist}
            onChange={(e) => setSelectedArtist(e.target.value)}
            className="w-full p-2 bg-background border border-border rounded-md text-sm"
          />
        </div>

        {/* 모바일 전용 하단 버튼들 */}
        <div className="md:hidden flex gap-3 pt-4">
          <button 
            onClick={clearFilters}
            className="flex-1 p-3 border border-border rounded-md hover:bg-muted transition-colors"
          >
            초기화
          </button>
          <button 
            onClick={onClose}
            className="flex-1 p-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            적용
          </button>
        </div>
      </div>
    </div>
  )
}
