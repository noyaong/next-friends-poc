'use client'

import MainLayout from '@/components/layout/MainLayout'
import AnalysisResultGrid from '@/components/home/AnalysisResultGrid'
import SeoAnalysisForm from '@/components/home/SeoAnalysisForm'

// Client Component - Zustand와 연결된 홈페이지
export default function Home() {
  return (
    <MainLayout activeTab="home">
      <div className="max-w-6xl mx-auto">
        <SeoAnalysisForm />
        <AnalysisResultGrid />
      </div>
    </MainLayout>
  )
}
