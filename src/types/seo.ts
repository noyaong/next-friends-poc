// SEO 분석 결과 타입 정의
export interface SeoAnalysisResult {
  id: string
  url: string
  domain: string
  title?: string
  description?: string
  
  // 점수들
  seoScore: number
  aiScore: number
  performanceScore: number
  
  // 상세 분석 결과
  metaTags: {
    title: boolean
    description: boolean
    keywords: boolean
    ogTags: boolean
    twitterTags: boolean
  }
  
  structuredData: {
    hasJsonLd: boolean
    schemas: string[]
    articleSchema: boolean
    organizationSchema: boolean
    faqSchema: boolean
    jsonLdData: any[] // 실제 JSON-LD 구조화 데이터 내용
  }
  
  performance: {
    loadTime: number
    imageOptimization: number
    coreWebVitals: {
      fcp: number // First Contentful Paint
      lcp: number // Largest Contentful Paint
      cls: number // Cumulative Layout Shift
    }
  }
  
  // AI 친화도 분석
  aiOptimization: {
    hasHeadings: boolean
    hasStructuredContent: boolean
    hasSummary: boolean
    readabilityScore: number
  }

  // 상세 분석 데이터 (통과한 항목의 구체적 정보 표시용)
  detailedData?: {
    headings: { level: number; text: string }[]
    images: { src: string; alt: string }[]
    totalWords: number
    avgSentenceLength: number
  }
  
  // 발견된 이슈들
  issues: Array<{
    type: 'error' | 'warning' | 'info'
    category: 'seo' | 'performance' | 'ai' | 'technical'
    message: string
    suggestion: string
  }>
  
  // 메타데이터
  status: 'analyzing' | 'completed' | 'failed'
  analyzedAt: Date
  duration: number // 분석 소요 시간 (ms)
}

// 분석 진행 상태
export interface AnalysisProgress {
  step: 'crawling' | 'parsing' | 'seo-analysis' | 'ai-analysis' | 'generating-suggestions' | 'completed'
  progress: number // 0-100
  message: string
}

// AI 개선 제안
export interface AiSuggestion {
  id: string
  category: 'meta' | 'content' | 'structure' | 'performance'
  title: string
  description: string
  before: string
  after: string
  impact: 'high' | 'medium' | 'low'
  difficulty: 'easy' | 'medium' | 'hard'
}
