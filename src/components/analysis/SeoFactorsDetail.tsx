import { CheckCircle, AlertCircle, Search, Tag, Image, Link, Globe, Shield } from 'lucide-react'
import { SeoAnalysisResult } from '@/types/seo'

interface SeoFactorsDetailProps {
  analysisResult: SeoAnalysisResult
}

export default function SeoFactorsDetail({ analysisResult }: SeoFactorsDetailProps) {
  const { metaTags, title, description, url } = analysisResult

  const seoChecks = [
    {
      icon: Tag,
      title: 'Title 태그',
      status: metaTags.title,
      value: title,
      description: metaTags.title 
        ? `제목이 설정되어 있습니다 (${title?.length || 0}자)`
        : 'Title 태그가 없습니다',
      recommendation: metaTags.title
        ? (title && title.length > 60 ? '제목이 60자를 초과합니다. 검색 결과에서 잘릴 수 있습니다' : '적절한 길이의 제목입니다')
        : '30-60자 길이의 명확하고 매력적인 제목을 작성하세요',
      isGood: metaTags.title && (title?.length || 0) <= 60
    },
    {
      icon: Search,
      title: 'Meta Description',
      status: metaTags.description,
      value: description,
      description: metaTags.description
        ? `메타 설명이 설정되어 있습니다 (${description?.length || 0}자)`
        : 'Meta Description이 없습니다',
      recommendation: metaTags.description
        ? (description && description.length > 160 ? '설명이 160자를 초과합니다. 검색 결과에서 잘릴 수 있습니다' : '적절한 길이의 설명입니다')
        : '120-160자 길이의 페이지 내용을 요약한 설명을 작성하세요',
      isGood: metaTags.description && (description?.length || 0) <= 160
    },
    {
      icon: Tag,
      title: 'Keywords 태그',
      status: metaTags.keywords,
      description: metaTags.keywords
        ? 'Keywords 메타 태그가 설정되어 있습니다'
        : 'Keywords 메타 태그가 없습니다',
      recommendation: metaTags.keywords
        ? 'Keywords 태그는 현재 검색엔진에서 거의 사용되지 않습니다'
        : 'Keywords 태그는 선택적입니다. 대신 콘텐츠 품질에 집중하세요',
      isGood: true // Keywords는 필수가 아니므로 항상 true
    },
    {
      icon: Globe,
      title: 'Open Graph 태그',
      status: metaTags.ogTags,
      description: metaTags.ogTags
        ? 'Open Graph 태그가 설정되어 있습니다'
        : 'Open Graph 태그가 누락되었습니다',
      recommendation: metaTags.ogTags
        ? '소셜 미디어 공유가 최적화되어 있습니다'
        : 'og:title, og:description, og:image 태그를 추가하여 소셜 공유를 최적화하세요',
      isGood: metaTags.ogTags
    },
    {
      icon: Link,
      title: 'Twitter Card',
      status: metaTags.twitterTags,
      description: metaTags.twitterTags
        ? 'Twitter Card 태그가 설정되어 있습니다'
        : 'Twitter Card 태그가 없습니다',
      recommendation: metaTags.twitterTags
        ? 'Twitter 공유가 최적화되어 있습니다'
        : 'twitter:card, twitter:title, twitter:description 태그를 추가하세요',
      isGood: metaTags.twitterTags
    },
    {
      icon: Shield,
      title: 'HTTPS 보안',
      status: url.startsWith('https://'),
      description: url.startsWith('https://')
        ? 'HTTPS 보안 연결을 사용하고 있습니다'
        : 'HTTP 연결을 사용하고 있습니다',
      recommendation: url.startsWith('https://')
        ? '보안 연결이 적용되어 있어 SEO에 유리합니다'
        : 'SSL 인증서를 설치하여 HTTPS를 적용하세요. 이는 SEO 순위에 영향을 줍니다',
      isGood: url.startsWith('https://')
    }
  ]

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Search className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-bold">SEO 요소 상세 분석</h2>
      </div>

      <div className="space-y-6">
        {seoChecks.map((check, index) => (
          <div key={index} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {check.status ? (
                  <CheckCircle className={`w-5 h-5 ${check.isGood ? 'text-green-500' : 'text-yellow-500'}`} />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <check.icon className="w-4 h-4 text-muted-foreground" />
                  <h3 className="font-semibold">{check.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    check.status 
                      ? (check.isGood 
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                          : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                        )
                      : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                  }`}>
                    {check.status ? (check.isGood ? '최적화됨' : '주의 필요') : '개선 필요'}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {check.description}
                </p>

                {check.value && (
                  <div className="mb-3 p-3 bg-muted/50 rounded border">
                    <p className="text-sm break-words">
                      <strong>현재 값:</strong> {check.value}
                    </p>
                  </div>
                )}

                <div className={`p-3 rounded border-l-4 ${
                  check.status && check.isGood
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                    : check.status
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                }`}>
                  <p className="text-sm">
                    {check.status && check.isGood ? '✅' : check.status ? '⚠️' : '💡'} 
                    <strong>권장사항:</strong> {check.recommendation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SEO 개선 우선순위 */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-semibold mb-2 text-blue-800 dark:text-blue-200">개선 우선순위</h3>
        <div className="space-y-2 text-sm">
          {!metaTags.title && (
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
              <span>Title 태그 추가 (가장 중요한 SEO 요소)</span>
            </div>
          )}
          {!metaTags.description && (
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
              <span>Meta Description 추가 (클릭률 향상)</span>
            </div>
          )}
          {!url.startsWith('https://') && (
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">!</span>
              <span>HTTPS 적용 (보안 및 SEO 필수)</span>
            </div>
          )}
          {!metaTags.ogTags && (
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
              <span>Open Graph 태그 추가 (소셜 공유 최적화)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
