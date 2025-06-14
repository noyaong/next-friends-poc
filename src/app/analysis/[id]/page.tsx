'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowLeft, Globe, Calendar, Clock, AlertCircle, CheckCircle, Info, AlertTriangle, Brain, Loader2 } from 'lucide-react'
import { useSeoAnalysisStore } from '@/store/seoAnalysisStore'
import { SeoAnalysisResult } from '@/types/seo'
import MainLayout from '@/components/layout/MainLayout'
import AiOptimizationDetail from '@/components/analysis/AiOptimizationDetail'
import SeoFactorsDetail from '@/components/analysis/SeoFactorsDetail'

export default function AnalysisDetailPage() {
  const params = useParams()
  const router = useRouter()
  const analysisId = params.id as string
  
  const analysisHistory = useSeoAnalysisStore((state) => state.analysisHistory)
  const addAiSuggestions = useSeoAnalysisStore((state) => state.addAiSuggestions)
  const storedAiSuggestions = useSeoAnalysisStore((state) => state.aiSuggestions)
  
  const [analysisResult, setAnalysisResult] = useState<SeoAnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)
  
  // AI 개선안 생성 상태
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [aiError, setAiError] = useState<string>('')

  useEffect(() => {
    if (analysisId && analysisHistory) {
      const result = analysisHistory.find(item => item.id === analysisId)
      setAnalysisResult(result || null)
      setLoading(false)
    }
  }, [analysisId, analysisHistory])

  const handleBack = () => {
    router.back()
  }

  // 현재 분석 ID에 대한 AI 개선안 가져오기
  const currentAiSuggestions = analysisResult ? storedAiSuggestions[analysisResult.id] : null

  // AI 개선안 생성 함수
  const generateAISuggestions = async () => {
    if (!analysisResult) return

    setIsGeneratingAI(true)
    setAiError('')

    try {
      const response = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: analysisResult.url,
          title: analysisResult.title || '',
          description: analysisResult.description || '',
          analysisId: analysisResult.id,
          structuredData: analysisResult.structuredData,
          aiOptimization: analysisResult.aiOptimization
        })
      })

      const result = await response.json()
      
      if (result.success) {
        // Zustand store에 AI 개선안 저장
        addAiSuggestions(analysisResult.id, result.data.suggestions)
      } else {
        setAiError(result.error || 'AI 개선안 생성에 실패했습니다.')
      }
    } catch (error) {
      console.error('AI 개선안 생성 오류:', error)
      setAiError('네트워크 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsGeneratingAI(false)
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/20'
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/20'
    return 'bg-red-100 dark:bg-red-900/20'
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600'
    if (score >= 60) return 'from-yellow-500 to-yellow-600'
    return 'from-red-500 to-red-600'
  }

  const getIssueIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'info':
        return <Info className="w-4 h-4 text-blue-500" />
      default:
        return <Info className="w-4 h-4 text-gray-500" />
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">분석 결과를 불러오는 중...</p>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  if (!analysisResult) {
    return (
      <MainLayout>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <AlertCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">분석 결과를 찾을 수 없습니다</h2>
              <p className="text-muted-foreground mb-6">요청하신 분석 결과가 존재하지 않거나 삭제되었습니다.</p>
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                <ArrowLeft className="w-4 h-4" />
                돌아가기
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            분석 결과로 돌아가기
          </button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{analysisResult.domain}</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">
                {analysisResult.title || '제목 없음'}
              </h1>
              {analysisResult.description && (
                <p className="text-muted-foreground text-lg mb-4">
                  {analysisResult.description}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(analysisResult.analyzedAt)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {(analysisResult.duration / 1000).toFixed(1)}초 소요
                </div>
                <div className="flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {analysisResult.issues.length}개 이슈 발견
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 점수 대시보드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* SEO 점수 */}
          <div className={`p-6 rounded-lg bg-gradient-to-br ${getScoreGradient(analysisResult.seoScore)} text-white`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">SEO 점수</h3>
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="text-4xl font-bold mb-2">{analysisResult.seoScore}/100</div>
            <div className="text-sm opacity-90">
              메타태그, 구조화, 기술적 SEO 종합 점수
            </div>
          </div>

          {/* AI 친화도 점수 */}
          <div className={`p-6 rounded-lg bg-gradient-to-br ${getScoreGradient(analysisResult.aiScore)} text-white`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">AI 친화도</h3>
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="text-4xl font-bold mb-2">{analysisResult.aiScore}/100</div>
            <div className="text-sm opacity-90">
              AI 검색엔진 최적화 및 구조화 데이터
            </div>
          </div>

          {/* 성능 점수 */}
          <div className={`p-6 rounded-lg bg-gradient-to-br ${getScoreGradient(analysisResult.performanceScore)} text-white`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">성능 점수</h3>
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="text-4xl font-bold mb-2">{analysisResult.performanceScore}/100</div>
            <div className="text-sm opacity-90">
              로딩 속도, 이미지 최적화, Core Web Vitals
            </div>
          </div>
        </div>

        {/* 상세 분석 섹션들 */}
        <div className="space-y-8">
          {/* 발견된 이슈들 */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">발견된 이슈</h2>
            <div className="space-y-4">
              {analysisResult.issues.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                  <p>발견된 이슈가 없습니다!</p>
                </div>
              ) : (
                analysisResult.issues.map((issue, index) => (
                  <div key={index} className="flex gap-3 p-4 rounded-lg bg-muted/50">
                    {getIssueIcon(issue.type)}
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{issue.message}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        카테고리: {issue.category}
                      </p>
                      <p className="text-sm bg-background p-2 rounded border-l-2 border-blue-500">
                        💡 {issue.suggestion}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* SEO 요소 상세 분석 */}
          <SeoFactorsDetail analysisResult={analysisResult} />

          {/* AI 친화도 상세 분석 */}
          <AiOptimizationDetail analysisResult={analysisResult} />

          {/* 성능 메트릭 상세 */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">성능 메트릭 상세</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">페이지 로딩 시간</span>
                  <span className="text-sm font-mono">{(analysisResult.performance.loadTime / 1000).toFixed(2)}초</span>
                </div>
                <div className="w-full bg-background rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      analysisResult.performance.loadTime < 2000 
                        ? 'bg-gradient-to-r from-green-500 to-green-600' 
                        : analysisResult.performance.loadTime < 3000
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                        : 'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                    style={{ width: `${Math.min(100, (analysisResult.performance.loadTime / 5000) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>빠름 (0-2초)</span>
                  <span>보통 (2-3초)</span>
                  <span>느림 (3초+)</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">이미지 최적화</span>
                  <span className="text-sm font-mono">{analysisResult.performance.imageOptimization.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      analysisResult.performance.imageOptimization > 80 
                        ? 'bg-gradient-to-r from-green-500 to-green-600'
                        : analysisResult.performance.imageOptimization > 60
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                        : 'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                    style={{ width: `${analysisResult.performance.imageOptimization}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  ALT 태그가 있는 이미지의 비율
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-3">Core Web Vitals</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-muted/50 rounded">
                    <div className="text-sm text-muted-foreground">First Contentful Paint</div>
                    <div className="text-lg font-semibold">{(analysisResult.performance.coreWebVitals.fcp / 1000).toFixed(2)}s</div>
                    <div className={`text-xs ${
                      analysisResult.performance.coreWebVitals.fcp < 1800 
                        ? 'text-green-600' 
                        : analysisResult.performance.coreWebVitals.fcp < 3000
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}>
                      {analysisResult.performance.coreWebVitals.fcp < 1800 ? '좋음' : 
                       analysisResult.performance.coreWebVitals.fcp < 3000 ? '개선 필요' : '나쁨'}
                    </div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded">
                    <div className="text-sm text-muted-foreground">Largest Contentful Paint</div>
                    <div className="text-lg font-semibold">{(analysisResult.performance.coreWebVitals.lcp / 1000).toFixed(2)}s</div>
                    <div className={`text-xs ${
                      analysisResult.performance.coreWebVitals.lcp < 2500 
                        ? 'text-green-600' 
                        : analysisResult.performance.coreWebVitals.lcp < 4000
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}>
                      {analysisResult.performance.coreWebVitals.lcp < 2500 ? '좋음' : 
                       analysisResult.performance.coreWebVitals.lcp < 4000 ? '개선 필요' : '나쁨'}
                    </div>
                  </div>
                  <div className="p-3 bg-muted/50 rounded">
                    <div className="text-sm text-muted-foreground">Cumulative Layout Shift</div>
                    <div className="text-lg font-semibold">{analysisResult.performance.coreWebVitals.cls.toFixed(3)}</div>
                    <div className={`text-xs ${
                      analysisResult.performance.coreWebVitals.cls < 0.1 
                        ? 'text-green-600' 
                        : analysisResult.performance.coreWebVitals.cls < 0.25
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}>
                      {analysisResult.performance.coreWebVitals.cls < 0.1 ? '좋음' : 
                       analysisResult.performance.coreWebVitals.cls < 0.25 ? '개선 필요' : '나쁨'}
                    </div>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
                  <p className="text-blue-800 dark:text-blue-200">
                    <strong>Core Web Vitals</strong>는 Google이 정의한 웹 사이트 사용자 경험 메트릭이며, 
                    검색 순위에 직접적인 영향을 미칩니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI 개선안 생성 섹션 */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold mb-2">🤖 AI 맞춤 개선안</h2>
                <p className="text-muted-foreground">
                  분석 결과를 바탕으로 GPT-4o가 구체적인 SEO 개선안을 제안합니다
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">AI 기반 맞춤형 개선안</h3>
                <p className="text-muted-foreground mb-4">
                  현재 페이지의 SEO 점수({analysisResult.seoScore}/100)와 발견된 {analysisResult.issues.length}개 이슈를 
                  분석하여 구체적인 개선 방법을 제안받으세요.
                </p>
                {currentAiSuggestions ? (
                  <div className="text-center">
                    <div className="text-green-600 dark:text-green-400 mb-3">
                      ✅ AI 개선안이 이미 생성되었습니다
                    </div>
                    <button 
                      onClick={generateAISuggestions}
                      disabled={isGeneratingAI}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGeneratingAI ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <span>🔄</span>
                      )}
                      {isGeneratingAI ? '재생성 중...' : '다시 생성하기'}
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={generateAISuggestions}
                    disabled={isGeneratingAI}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGeneratingAI ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <span className="text-lg">✨</span>
                    )}
                    {isGeneratingAI ? 'AI 개선안 생성 중...' : 'AI 개선안 생성하기'}
                  </button>
                )}
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded">
                  <div className="font-medium text-blue-600 dark:text-blue-400">📝 메타 태그</div>
                  <div className="text-muted-foreground">제목과 설명 최적화</div>
                </div>
                <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded">
                  <div className="font-medium text-purple-600 dark:text-purple-400">🔧 기술적 SEO</div>
                  <div className="text-muted-foreground">구조화 데이터, 성능</div>
                </div>
                <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded">
                  <div className="font-medium text-green-600 dark:text-green-400">📊 콘텐츠</div>
                  <div className="text-muted-foreground">키워드, 가독성</div>
                </div>
              </div>
            </div>

            {/* AI 개선안 결과 표시 */}
            {aiError && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">오류 발생</span>
                </div>
                <p className="mt-1 text-sm text-red-700 dark:text-red-300">{aiError}</p>
              </div>
            )}

            {currentAiSuggestions && (
              <div className="mt-6 p-6 bg-white dark:bg-gray-800 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2 text-green-800 dark:text-green-200 mb-4">
                  <Brain className="w-5 h-5" />
                  <span className="font-medium">🎉 AI 개선안이 생성되었습니다!</span>
                </div>
                
                <div className="space-y-4">
                  {currentAiSuggestions?.map((suggestion: any, index: number) => (
                    <div key={suggestion.id} className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-blue-900/20 p-4 rounded-lg border">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                          {suggestion.title}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          suggestion.impact === 'high' 
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                            : suggestion.impact === 'medium'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                        }`}>
                          {suggestion.impact === 'high' ? '높은 영향' : 
                           suggestion.impact === 'medium' ? '중간 영향' : '낮은 영향'}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          suggestion.difficulty === 'easy' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            : suggestion.difficulty === 'medium'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {suggestion.difficulty === 'easy' ? '쉬움' : 
                           suggestion.difficulty === 'medium' ? '보통' : '어려움'}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {suggestion.description}
                      </p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded border-l-2 border-red-300">
                          <div className="font-medium text-red-700 dark:text-red-300">현재:</div>
                          <div className="text-red-600 dark:text-red-400">{suggestion.before}</div>
                        </div>
                                                 <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded border-l-2 border-green-300">
                           <div className="font-medium text-green-700 dark:text-green-300">개선안:</div>
                           <div className="text-green-600 dark:text-green-400">
                             {typeof suggestion.after === 'object' 
                               ? <pre className="text-xs overflow-x-auto">{JSON.stringify(suggestion.after, null, 2)}</pre>
                               : suggestion.after
                             }
                           </div>
                         </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded text-sm">
                  <div className="text-purple-800 dark:text-purple-200">
                    <strong>생성 정보:</strong> 저장된 AI 개선안 | 
                    총 {currentAiSuggestions?.length || 0}개 개선안
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
