'use client'

import { useState } from 'react'
import { Search, Globe, BarChart3, Brain, AlertCircle } from 'lucide-react'
import { useSeoAnalysisStore } from '@/store/seoAnalysisStore'

// URL 유효성 검증 함수
const isValidUrl = (string: string) => {
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

// Client Component - URL 입력 폼과 상태 관리
export default function SeoAnalysisForm() {
  const [url, setUrl] = useState('')
  const [urlError, setUrlError] = useState('')
  
  const { 
    currentAnalysis, 
    startAnalysis, 
    updateProgress, 
    completeAnalysis, 
    failAnalysis 
  } = useSeoAnalysisStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 입력 유효성 검증
    if (!url.trim()) {
      setUrlError('URL을 입력해주세요.')
      return
    }
    
    if (!isValidUrl(url.trim())) {
      setUrlError('유효한 URL을 입력해주세요. (예: https://example.com)')
      return
    }
    
    setUrlError('')
    
    // 분석 시작
    startAnalysis(url.trim())
    
    try {
      // 진행상황 업데이트
      updateProgress({
        step: 'crawling',
        progress: 10,
        message: '웹사이트 크롤링을 시작합니다...'
      })
      
      // 약간의 지연 (UI 피드백)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      updateProgress({
        step: 'crawling',
        progress: 25,
        message: '페이지 데이터를 수집하는 중...'
      })
      
      // API 호출
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      })
      
      updateProgress({
        step: 'parsing',
        progress: 60,
        message: 'HTML 구조를 분석하는 중...'
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || '분석 중 오류가 발생했습니다.')
      }
      
      const result = await response.json()
      
      updateProgress({
        step: 'seo-analysis',
        progress: 85,
        message: 'SEO 점수를 계산하는 중...'
      })
      
      await new Promise(resolve => setTimeout(resolve, 300))
      
      updateProgress({
        step: 'completed',
        progress: 100,
        message: '분석 완료!'
      })
      
      await new Promise(resolve => setTimeout(resolve, 200))
      
      if (result.success) {
        completeAnalysis(result.data)
        setUrl('') // 입력 필드 초기화
      } else {
        throw new Error(result.error || '분석에 실패했습니다.')
      }
      
    } catch (error) {
      console.error('Analysis failed:', error)
      failAnalysis(error instanceof Error ? error.message : '분석 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="mb-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
        🧠 AI SEO Analyzer
      </h1>
      <p className="text-muted-foreground text-lg md:text-xl mb-8">
        AI 기반 SEO 분석으로 웹사이트를 최적화하세요
      </p>
      
      {/* URL 입력 폼 */}
      <div className="max-w-2xl mx-auto mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value)
                  if (urlError) setUrlError('')
                }}
                placeholder="https://example.com"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background ${
                  urlError ? 'border-red-500' : 'border-border'
                }`}
                disabled={currentAnalysis.isAnalyzing}
              />
            </div>
            {urlError && (
              <div className="flex items-center gap-1 mt-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {urlError}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={!url.trim() || currentAnalysis.isAnalyzing}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
          >
            {currentAnalysis.isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                분석 중...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                분석 시작
              </>
            )}
          </button>
        </form>
        
        {/* 분석 진행 상태 표시 */}
        {currentAnalysis.isAnalyzing && currentAnalysis.progress && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{currentAnalysis.progress.message}</span>
              <span className="text-sm text-muted-foreground">{currentAnalysis.progress.progress}%</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentAnalysis.progress.progress}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              분석 중인 URL: {currentAnalysis.url}
            </div>
          </div>
        )}
        
        {/* 에러 표시 */}
        {currentAnalysis.error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">분석 실패</span>
            </div>
            <p className="mt-1 text-sm text-red-700">{currentAnalysis.error}</p>
          </div>
        )}
      </div>
      
      {/* 기능 소개 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="relative bg-cover bg-center text-white p-6 rounded-lg overflow-hidden" 
             style={{backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"}}>
          <div className="absolute inset-0 bg-blue-900/70 rounded-lg"></div>
          <div className="relative z-10">
            <BarChart3 className="w-8 h-8 mb-3" />
            <div className="text-xl font-bold mb-2">SEO 점수 분석</div>
            <div className="text-blue-100 text-sm">메타 태그, 구조화 데이터, 성능 점수를 종합 분석</div>
          </div>
        </div>
        <div className="relative bg-cover bg-center text-white p-6 rounded-lg overflow-hidden"
             style={{backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"}}>
          <div className="absolute inset-0 bg-green-900/70 rounded-lg"></div>
          <div className="relative z-10">
            <Brain className="w-8 h-8 mb-3" />
            <div className="text-xl font-bold mb-2">AI 개선안 생성</div>
            <div className="text-green-100 text-sm">OpenAI GPT를 활용한 자동 개선 제안</div>
          </div>
        </div>
        <div className="relative bg-cover bg-center text-white p-6 rounded-lg overflow-hidden"
             style={{backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')"}}>
          <div className="absolute inset-0 bg-purple-900/70 rounded-lg"></div>
          <div className="relative z-10">
            <Globe className="w-8 h-8 mb-3" />
            <div className="text-xl font-bold mb-2">AI 검색 대응</div>
            <div className="text-purple-100 text-sm">GPT, Perplexity 등 AI 검색엔진 최적화</div>
          </div>
        </div>
      </div>
    </div>
  )
}
