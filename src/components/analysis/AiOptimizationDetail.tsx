import { CheckCircle, AlertCircle, Brain, FileText, Hash, BarChart } from 'lucide-react'
import { SeoAnalysisResult } from '@/types/seo'

interface AiOptimizationDetailProps {
  analysisResult: SeoAnalysisResult
}

export default function AiOptimizationDetail({ analysisResult }: AiOptimizationDetailProps) {
  const { aiOptimization, structuredData, detailedData } = analysisResult

  const getReadabilityLevel = (score: number) => {
    if (score >= 80) return { level: '매우 좋음', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/20' }
    if (score >= 60) return { level: '좋음', color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/20' }
    if (score >= 40) return { level: '보통', color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/20' }
    return { level: '개선 필요', color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/20' }
  }

  const readability = getReadabilityLevel(aiOptimization.readabilityScore)

  // 헤딩 구조 분석
  const getHeadingAnalysis = () => {
    if (!detailedData?.headings || detailedData.headings.length === 0) {
      return null
    }
    
    const headingCounts = detailedData.headings.reduce((acc, heading) => {
      acc[`H${heading.level}`] = (acc[`H${heading.level}`] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    return headingCounts
  }

  // 이미지 최적화 분석
  const getImageAnalysis = () => {
    if (!detailedData?.images) return null
    
    const totalImages = detailedData.images.length
    const imagesWithAlt = detailedData.images.filter(img => img.alt.trim() !== '').length
    const optimizationRate = totalImages > 0 ? Math.round((imagesWithAlt / totalImages) * 100) : 0
    
    return {
      totalImages,
      imagesWithAlt,
      optimizationRate
    }
  }

  // 콘텐츠 분석
  const getContentAnalysis = () => {
    if (!detailedData) return null
    
    return {
      totalWords: detailedData.totalWords,
      avgSentenceLength: detailedData.avgSentenceLength,
      contentLength: detailedData.totalWords > 300 ? '충분함' : detailedData.totalWords > 150 ? '보통' : '부족함'
    }
  }

  const headingAnalysis = getHeadingAnalysis()
  const imageAnalysis = getImageAnalysis()
  const contentAnalysis = getContentAnalysis()

  // 모바일 친화적 JSON 포맷팅
  const formatJsonForMobile = (obj: any) => {
    return JSON.stringify(obj, null, 2)
      .replace(/("https?:\/\/[^"]{50,}")/g, (match) => {
        // 긴 URL을 줄바꿈으로 분할
        const url = match.slice(1, -1) // 따옴표 제거
        if (url.length > 50) {
          return `"${url.substring(0, 50)}...${url.substring(url.length - 10)}"`
        }
        return match
      })
  }

  const optimizationChecks = [
    {
      icon: Hash,
      title: '헤딩 구조',
      status: aiOptimization.hasHeadings,
      description: aiOptimization.hasHeadings 
        ? headingAnalysis 
          ? `${Object.entries(headingAnalysis).map(([tag, count]) => `${tag}: ${count}개`).join(', ')} 발견됨`
          : 'H1-H6 태그가 적절히 사용되고 있습니다'
        : '헤딩 태그가 없거나 부족합니다. 콘텐츠 구조를 명확히 하세요',
      suggestion: '계층적 헤딩 구조(H1 → H2 → H3)를 사용하여 AI가 콘텐츠를 더 잘 이해할 수 있도록 하세요'
    },
    {
      icon: FileText,
      title: '구조화된 콘텐츠',
      status: aiOptimization.hasStructuredContent,
      description: aiOptimization.hasStructuredContent
        ? contentAnalysis 
          ? `총 ${contentAnalysis.totalWords}개 단어, 평균 문장 길이 ${contentAnalysis.avgSentenceLength}단어 (${contentAnalysis.contentLength})`
          : '콘텐츠가 잘 구조화되어 있습니다'
        : '콘텐츠 구조가 개선이 필요합니다',
      suggestion: '명확한 섹션 구분과 논리적 흐름으로 콘텐츠를 구성하세요'
    },
    {
      icon: BarChart,
      title: '요약문 존재',
      status: aiOptimization.hasSummary,
      description: aiOptimization.hasSummary
        ? `적절한 길이의 요약문이 있습니다 (${analysisResult.description?.length || 0}자)`
        : '요약문이 없거나 너무 짧습니다',
      suggestion: '120자 이상의 명확한 요약문을 메타 설명에 포함하세요'
    },
    {
      icon: Brain,
      title: '구조화 데이터',
      status: structuredData.hasJsonLd,
      description: structuredData.hasJsonLd
        ? `${structuredData.schemas.length}개의 구조화 데이터가 발견되었습니다 (${structuredData.schemas.join(', ')})`
        : 'JSON-LD 구조화 데이터가 없습니다',
      suggestion: 'JSON-LD를 사용하여 Article, Organization, FAQ 등의 스키마를 추가하세요'
    }
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-bold">AI 친화도 상세 분석</h2>
      </div>

      {/* 가독성 점수 */}
      <div className="mb-6 p-4 rounded-lg bg-muted/50">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">텍스트 가독성</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${readability.bg} ${readability.color}`}>
            {readability.level}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="w-full bg-background rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${aiOptimization.readabilityScore}%` }}
              />
            </div>
          </div>
          <span className="text-sm font-medium">{aiOptimization.readabilityScore}/100</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          AI가 이해하기 쉬운 문장 구조와 단어 사용도를 측정합니다
        </p>
      </div>

      {/* AI 최적화 체크리스트 */}
      <div className="space-y-4">
        <h3 className="font-semibold mb-3">AI 검색 최적화 체크리스트</h3>
        {optimizationChecks.map((check, index) => (
          <div key={index} className="flex gap-3 p-4 rounded-lg bg-muted/30">
            <div className="flex-shrink-0">
              {check.status ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <check.icon className="w-4 h-4 text-muted-foreground" />
                <h4 className="font-medium">{check.title}</h4>
                <span className={`text-xs px-2 py-1 rounded ${
                  check.status 
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                    : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                }`}>
                  {check.status ? '통과' : '개선 필요'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {check.description}
              </p>
              {!check.status ? (
                <div className="bg-background p-3 rounded border-l-4 border-blue-500">
                  <p className="text-sm">
                    💡 <strong>개선 제안:</strong> {check.suggestion}
                  </p>
                </div>
              ) : (
                // 통과한 경우 추가 상세 정보 표시
                check.title === '헤딩 구조' && headingAnalysis && detailedData?.headings && detailedData.headings.length > 0 ? (
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border-l-4 border-green-500">
                    <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">발견된 헤딩 구조:</p>
                    <div className="space-y-1 text-sm text-green-700 dark:text-green-300">
                      {detailedData.headings.slice(0, 5).map((heading, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="font-mono text-xs bg-green-100 dark:bg-green-800/30 px-2 py-1 rounded">
                            H{heading.level}
                          </span>
                          <span className="truncate">{heading.text}</span>
                        </div>
                      ))}
                      {detailedData.headings.length > 5 && (
                        <p className="text-xs text-green-600 dark:text-green-400">
                          ...그 외 {detailedData.headings.length - 5}개 더
                        </p>
                      )}
                    </div>
                  </div>
                ) : check.title === '구조화된 콘텐츠' && contentAnalysis ? (
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded border-l-4 border-green-500">
                    <p className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">콘텐츠 분석 결과:</p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-green-700 dark:text-green-300">
                      <div>
                        <span className="font-medium">총 단어 수:</span> {contentAnalysis.totalWords}개
                      </div>
                      <div>
                        <span className="font-medium">평균 문장 길이:</span> {contentAnalysis.avgSentenceLength}단어
                      </div>
                      <div>
                        <span className="font-medium">콘텐츠 분량:</span> {contentAnalysis.contentLength}
                      </div>
                      {imageAnalysis && (
                        <div>
                          <span className="font-medium">이미지 최적화:</span> {imageAnalysis.optimizationRate}% ({imageAnalysis.imagesWithAlt}/{imageAnalysis.totalImages})
                        </div>
                      )}
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 구조화 데이터 상세 */}
      {structuredData.hasJsonLd && structuredData.schemas.length > 0 && (
        <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">발견된 구조화 데이터</h4>
          <div className="flex flex-wrap gap-2 mb-3">
            {structuredData.schemas.map((schema, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-800/30 text-blue-800 dark:text-blue-200 text-sm rounded-full"
              >
                {schema}
              </span>
            ))}
          </div>
          <div className="mb-3 space-y-1 text-sm">
            {structuredData.articleSchema && (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Article 스키마 감지됨</span>
              </div>
            )}
            {structuredData.organizationSchema && (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Organization 스키마 감지됨</span>
              </div>
            )}
            {structuredData.faqSchema && (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>FAQ 스키마 감지됨</span>
              </div>
            )}
          </div>

          {/* JSON-LD 데이터 내용 표시 */}
          {structuredData.jsonLdData && structuredData.jsonLdData.length > 0 && (
            <div className="mt-4">
              <h5 className="font-medium mb-2 text-blue-800 dark:text-blue-200">JSON-LD 구조화 데이터 내용:</h5>
              <div className="space-y-3">
                {structuredData.jsonLdData.map((jsonLd, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded border">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {jsonLd['@type'] || 'Unknown'}
                      </span>
                      {jsonLd.name && (
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {jsonLd.name}
                        </span>
                      )}
                    </div>
                    
                    {/* 주요 필드들 표시 */}
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      {jsonLd.headline && (
                        <div><strong>제목:</strong> {jsonLd.headline}</div>
                      )}
                      {jsonLd.description && (
                        <div><strong>설명:</strong> {jsonLd.description}</div>
                      )}
                      {jsonLd.author && (
                        <div><strong>작성자:</strong> {typeof jsonLd.author === 'string' ? jsonLd.author : jsonLd.author.name || JSON.stringify(jsonLd.author)}</div>
                      )}
                      {jsonLd.datePublished && (
                        <div><strong>발행일:</strong> {jsonLd.datePublished}</div>
                      )}
                      {jsonLd.url && (
                        <div><strong>URL:</strong> {jsonLd.url}</div>
                      )}
                      {jsonLd.logo && (
                        <div><strong>로고:</strong> {typeof jsonLd.logo === 'string' ? jsonLd.logo : jsonLd.logo.url || JSON.stringify(jsonLd.logo)}</div>
                      )}
                    </div>

                    {/* 전체 JSON 보기 (접기/펼치기) */}
                    <details className="mt-3">
                      <summary className="cursor-pointer text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                        <span>전체 JSON 데이터 보기</span>
                        <span className="text-gray-500">({JSON.stringify(jsonLd).length > 1000 ? '큰 파일' : '작은 파일'})</span>
                      </summary>
                      <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded border w-full max-w-full overflow-hidden" style={{ maxWidth: '100%', wordWrap: 'break-word' }}>
                        <div className="relative">
                          {/* 모바일에서 경고 메시지 */}
                          {JSON.stringify(jsonLd).length > 2000 && (
                            <div className="mb-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded text-xs text-yellow-800 dark:text-yellow-200 sm:hidden">
                              ⚠️ 큰 데이터입니다. 가로 스크롤이 필요할 수 있습니다.
                            </div>
                          )}
                                                      <div className="w-full overflow-hidden" style={{ maxWidth: '100%' }}>
                             <div className="w-full max-w-full overflow-hidden rounded border border-gray-200 dark:border-gray-700">
                               <pre className="text-xs whitespace-pre-wrap break-all word-break-all max-w-full max-h-96 overflow-y-auto p-2 m-0 bg-white dark:bg-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600" style={{
                                 wordBreak: 'break-all',
                                 overflowWrap: 'break-word',
                                 whiteSpace: 'pre-wrap',
                                 maxWidth: '100%',
                                 width: '100%',
                                 boxSizing: 'border-box'
                               }}>
                                 <code className="block font-mono leading-relaxed text-gray-800 dark:text-gray-200" style={{ 
                                   wordBreak: 'break-all', 
                                   overflowWrap: 'break-word',
                                   whiteSpace: 'pre-wrap',
                                   maxWidth: '100%',
                                   width: '100%',
                                   display: 'block'
                                 }}>
                                   {formatJsonForMobile(jsonLd)}
                                 </code>
                               </pre>
                             </div>
                           </div>
                          {/* 모바일에서 스크롤 힌트 */}
                          <div className="absolute top-2 right-2 text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-sm sm:hidden">
                            스크롤 가능
                          </div>
                        </div>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
