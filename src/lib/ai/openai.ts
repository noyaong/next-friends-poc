import OpenAI from 'openai'
// import { ChatOpenAI } from '@langchain/openai' // 나중에 필요시 사용

// OpenAI 클라이언트 설정
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// AI 설정 상수
export const AI_CONFIG = {
  model: process.env.AI_MODEL || 'gpt-4o-mini', // 더 저렴한 모델로 시작
  temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
  maxTokens: parseInt(process.env.AI_MAX_TOKENS || '1500'),
} as const

// OpenAI 연결 테스트 함수 (quota 절약을 위해 실제 API 호출 최소화)
export async function testOpenAIConnection(): Promise<boolean> {
  try {
    console.log('🔑 API 키 확인:', process.env.OPENAI_API_KEY ? '설정됨' : '없음')
    console.log('🔑 API 키 길이:', process.env.OPENAI_API_KEY?.length || 0)
    
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ OPENAI_API_KEY 환경변수가 설정되지 않았습니다.')
      return false
    }

    // quota 절약을 위해 매우 간단한 테스트만 수행
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // 가장 저렴한 모델 사용
      messages: [
        {
          role: 'user',
          content: 'Hi'
        }
      ],
      max_tokens: 5, // 최소 토큰으로 설정
      temperature: 0
    })

    const reply = response.choices[0]?.message?.content?.trim()
    console.log('✅ OpenAI 연결 테스트 성공:', reply)
    return true
  } catch (error) {
    console.error('❌ OpenAI 연결 테스트 실패:', error)
    if (error instanceof OpenAI.APIError) {
      console.error('API 에러 상세:', {
        status: error.status,
        message: error.message,
        type: error.type,
        code: error.code
      })
      
      // quota 초과인 경우 특별한 처리
      if (error.status === 429 && error.code === 'insufficient_quota') {
        console.error('💳 OpenAI API quota를 초과했습니다. 결제 정보를 확인해주세요.')
        console.error('💡 해결방법: https://platform.openai.com/account/billing')
      }
    }
    return false
  }
}

// milestone.md 척도 기반 포괄적 SEO 개선안 생성 함수
export async function generateSimpleSeoSuggestion(
  title: string,
  description: string,
  url: string,
  structuredData?: { hasJsonLd: boolean; schemas: string[] },
  aiOptimization?: { hasHeadings: boolean; hasStructuredContent: boolean; hasSummary: boolean; readabilityScore: number }
): Promise<string> {
  try {
    const prompt = `당신은 AI 시대의 SEO 전문가입니다. 다음 웹사이트를 milestone.md에 정의된 3가지 척도로 분석하고 포괄적인 개선안을 제안해주세요.

**현재 상태:**
- URL: ${url}
- Title: ${title || '없음'}
- Description: ${description || '없음'}
- 구조화 데이터: ${structuredData?.hasJsonLd ? `있음 (${structuredData.schemas.join(', ')})` : '없음'}
- AI 최적화: ${aiOptimization ? `헤딩 구조: ${aiOptimization.hasHeadings ? '있음' : '없음'}, 요약문: ${aiOptimization.hasSummary ? '있음' : '없음'}, 가독성 점수: ${aiOptimization.readabilityScore}/100` : '분석되지 않음'}

**분석 척도 (SEO + AI 대응 기준):**

### 1. 기본 SEO 요소
- title, meta 태그 적절성
- H1~H6 구조 존재 여부  
- 이미지 ALT 태그 유무
- canonical, sitemap.xml, robots.txt 구성
- Lighthouse 기반 속도/UX 점수

### 2. 구조화 데이터 (Schema.org)
- JSON-LD 포맷 여부
- Article, FAQ, Organization 스키마 포함 여부
- 필수 필드/속성 구성 상태

### 3. AI 검색 대응력 (LLM 기준)  
- LLM이 이해하기 좋은 구조와 문장 구성
- TL;DR, 요약문 포함 여부
- GPT 인용 가능성, 정보 신뢰도 (E-E-A-T 기준)

**중요한 지시사항:**
- 현재 구조화 데이터가 있는 경우: 기존 스키마를 개선하거나 추가 스키마를 제안하세요. "없다"고 하지 마세요.
- 현재 구조화 데이터가 없는 경우에만: 새로운 JSON-LD 구조화 데이터 생성을 제안하세요.
- 실제 분석 결과와 일치하는 개선안을 제시해주세요.

**요청사항:**
각 척도별로 현재 상태를 정확히 반영한 구체적인 개선안을 제시해주세요.

응답은 JSON 형식으로 해주세요:
{
  "basicSEO": {
    "title": "개선된 제목 (30-60자)",
    "description": "개선된 설명 (120-160자)",
    "headingStructure": "H1-H6 개선 구조 제안",
    "imageOptimization": "이미지 ALT 태그 전략",
    "technicalSEO": ["canonical 설정", "sitemap 개선", "robots.txt 최적화"]
  },
  "structuredData": {
    "status": "${structuredData?.hasJsonLd ? 'existing' : 'missing'}",
    "currentSchemas": ${structuredData?.hasJsonLd ? JSON.stringify(structuredData.schemas) : '[]'},
    "jsonLD": "JSON-LD 스키마 예시 코드 (기존 스키마가 있으면 개선안, 없으면 신규 생성)",
    "schemaTypes": ["Article", "FAQ", "Organization"],
    "requiredFields": ["필수 필드1", "필수 필드2", "필수 필드3"],
    "recommendation": "${structuredData?.hasJsonLd ? '기존 구조화 데이터 개선 또는 추가 스키마 제안' : '새로운 구조화 데이터 생성 제안'}"
  },
  "aiReadiness": {
    "llmFriendlyStructure": "LLM 친화적 구조 개선안",
    "summary": "TL;DR 요약문 예시",
    "eatSignals": ["전문성", "권위성", "신뢰성"] 개선 방법,
    "contentOptimization": "GPT 인용 가능성 향상 전략"
  },
  "prioritizedActions": [
    {
      "category": "basicSEO|structuredData|aiReadiness",
      "action": "구체적 실행 방법",
      "impact": "high|medium|low",
      "difficulty": "easy|medium|hard"
    }
  ]
}`

    const response = await openai.chat.completions.create({
      model: AI_CONFIG.model,
      messages: [
        {
          role: 'system',
          content: '당신은 SEO 최적화 전문가입니다. 검색엔진 친화적이고 사용자 친화적인 메타데이터 개선안을 제공합니다.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: AI_CONFIG.maxTokens,
      temperature: AI_CONFIG.temperature,
      response_format: { type: 'json_object' }
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('OpenAI 응답이 비어있습니다')
    }

    console.log('✅ SEO 개선안 생성 성공')
    return content
  } catch (error) {
    console.error('❌ SEO 개선안 생성 실패:', error)
    throw new Error(`SEO 개선안 생성 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`)
  }
}

// 에러 처리 유틸리티
export function handleOpenAIError(error: unknown): string {
  if (error instanceof OpenAI.APIError) {
    switch (error.status) {
      case 401:
        return 'OpenAI API 키가 유효하지 않습니다.'
      case 429:
        return 'API 사용량 한도를 초과했습니다. 잠시 후 다시 시도해주세요.'
      case 500:
        return 'OpenAI 서버에 일시적인 문제가 발생했습니다.'
      default:
        return `OpenAI API 오류: ${error.message}`
    }
  }
  
  if (error instanceof Error) {
    return error.message
  }
  
  return '알 수 없는 오류가 발생했습니다.'
}
