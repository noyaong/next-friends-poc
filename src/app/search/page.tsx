'use client'

import MainLayout from '@/components/layout/MainLayout'
import SearchView from '@/components/search/SearchView'

export default function SearchPage() {
  return (
    <MainLayout activeTab="search">
      <SearchView />
    </MainLayout>
  )
}
