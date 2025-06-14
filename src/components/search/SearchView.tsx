'use client'

import { useState } from 'react'
import { Search, Filter } from 'lucide-react'
import SearchFilters from './SearchFilters'
import MusicList from './MusicList'

export default function SearchView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="max-w-7xl mx-auto">
      {/* 검색 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">음악 검색</h1>
        
        {/* 검색 바 */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="곡명, 아티스트, 앨범 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          {/* 모바일 필터 버튼 */}
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="md:hidden px-4 py-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors"
          >
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* 데스크톱 사이드바 필터 */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-6">
            <SearchFilters />
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 min-w-0">
          {/* 결과 헤더 */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-muted-foreground">
              {searchQuery ? `"${searchQuery}"에 대한 검색 결과` : '인기 음악'}
            </p>
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              총 {8}곡
            </div>
          </div>

          {/* 음악 리스트 */}
          <MusicList />
        </div>
      </div>

      {/* 모바일 필터 모달 */}
      {isFilterOpen && (
        <>
          {/* 오버레이 */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsFilterOpen(false)}
          />
          
          {/* 모달 */}
          <div className="fixed inset-x-4 top-20 bottom-20 z-50 md:hidden">
            <div className="h-full overflow-y-auto p-6">
              <SearchFilters 
                onClose={() => setIsFilterOpen(false)}
                className="h-auto"
              />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
