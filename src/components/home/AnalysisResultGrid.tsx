'use client'

import { BarChart3, Calendar, Globe, TrendingUp, AlertCircle, CheckCircle, Trash2, Eye } from 'lucide-react'
import { useAnalysisHistory, useSeoAnalysisStore } from '@/store/seoAnalysisStore'
import { SeoAnalysisResult } from '@/types/seo'
import { useRouter } from 'next/navigation'

// Client Component - Zustand와 연결된 분석 결과 그리드
export default function AnalysisResultGrid() {
  const analysisHistory = useAnalysisHistory()
  const { selectAnalysis, deleteAnalysis } = useSeoAnalysisStore()
  const router = useRouter()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'analyzing':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return null
    }
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(new Date(date))
  }

  const handleViewDetails = (result: SeoAnalysisResult) => {
    selectAnalysis(result.id)
    router.push(`/analysis/${result.id}`)
  }

  const handleDelete = (e: React.MouseEvent, resultId: string) => {
    e.stopPropagation()
    if (confirm('이 분석 결과를 삭제하시겠습니까?')) {
      deleteAnalysis(resultId)
    }
  }

  if (analysisHistory.length === 0) {
    return (
      <div className="text-center py-12">
        <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">아직 분석된 사이트가 없습니다</h3>
        <p className="text-muted-foreground">
          위의 URL 입력 필드에 웹사이트 주소를 입력하고 분석을 시작해보세요.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">분석 결과</h2>
        <span className="text-sm text-muted-foreground">
          총 {analysisHistory.length}개 사이트 분석됨
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analysisHistory.map((result) => (
          <div 
            key={result.id}
            onClick={() => handleViewDetails(result)}
            className="group bg-card border border-border rounded-lg p-6 hover:bg-muted/50 transition-all duration-300 hover:scale-105 cursor-pointer relative"
          >
            {/* 삭제 버튼 */}
            <button
              onClick={(e) => handleDelete(e, result.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
              title="삭제"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>

            {/* 도메인 및 상태 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium text-sm truncate max-w-[150px]" title={result.domain}>
                  {result.domain}
                </span>
              </div>
              {getStatusIcon(result.status)}
            </div>

            {/* 페이지 제목 */}
            {result.title && (
              <div className="mb-3">
                <h3 className="font-medium text-sm line-clamp-2 text-foreground/90">
                  {result.title}
                </h3>
              </div>
            )}

            {/* SEO 점수 메인 */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">종합 SEO 점수</span>
              </div>
              <div className={`text-3xl font-bold ${getScoreColor(result.seoScore)}`}>
                {result.seoScore}
                <span className="text-lg text-muted-foreground">/100</span>
              </div>
            </div>

            {/* 세부 점수들 */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className={`p-2 rounded ${getScoreBgColor(result.aiScore)}`}>
                <div className="text-xs text-muted-foreground">AI 대응</div>
                <div className={`text-lg font-semibold ${getScoreColor(result.aiScore)}`}>
                  {result.aiScore}
                </div>
              </div>
              <div className={`p-2 rounded ${getScoreBgColor(result.performanceScore)}`}>
                <div className="text-xs text-muted-foreground">성능</div>
                <div className={`text-lg font-semibold ${getScoreColor(result.performanceScore)}`}>
                  {result.performanceScore}
                </div>
              </div>
            </div>

            {/* 이슈 및 날짜 */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{result.issues.length}개 이슈</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(result.analyzedAt)}</span>
              </div>
            </div>

            {/* 호버 시 상세보기 힌트 */}
            <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-1 text-xs text-primary font-medium">
                <Eye className="w-3 h-3" />
                클릭하여 상세 분석 결과 보기
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 더 보기 버튼 - 향후 페이지네이션용 */}
      {analysisHistory.length >= 6 && (
        <div className="text-center mt-8">
          <button className="px-6 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors">
            더 많은 분석 결과 보기
          </button>
        </div>
      )}
    </div>
  )
}
