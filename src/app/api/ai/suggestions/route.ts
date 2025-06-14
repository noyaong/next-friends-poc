import { NextRequest, NextResponse } from 'next/server'
import { generateSimpleSeoSuggestion, handleOpenAIError } from '@/lib/ai/openai'

export async function POST(request: NextRequest) {
  console.log('🤖 SEO 개선안 생성 요청 수신')
  
  try {
    const body = await request.json()
    const { title, description, url, analysisId, structuredData, aiOptimization } = body

    // 입력값 검증
    if (!url) {
      return NextResponse.json(
        { error: 'URL이 필요합니다.' },
        { status: 400 }
      )
    }

    console.log('📊 분석 데이터:', {
      url,
      title: title || '없음',
      description: description || '없음',
      analysisId,
      hasStructuredData: structuredData?.hasJsonLd || false,
      schemas: structuredData?.schemas || []
    })

    // OpenAI를 사용하여 개선안 생성
    console.log('🔄 OpenAI API 호출 시작...')
    const suggestionJson = await generateSimpleSeoSuggestion(
      title || '',
      description || '',
      url,
      structuredData,
      aiOptimization
    )

    // JSON 파싱
    const suggestion = JSON.parse(suggestionJson)
    
    console.log('✅ milestone.md 척도 기반 SEO 개선안 생성 완료:', suggestion)

    // milestone.md 척도에 맞는 응답 형태로 변환
    const aiSuggestions = []

    // 1. 기본 SEO 요소 개선안
    if (suggestion.basicSEO) {
      aiSuggestions.push({
        id: `suggestion_${Date.now()}_1`,
        category: 'seo' as const,
        title: '🏷️ Title 태그 최적화',
        description: suggestion.basicSEO.title,
        before: title || '현재 제목 없음',
        after: suggestion.basicSEO.title,
        impact: 'high' as const,
        difficulty: 'easy' as const
      })

      aiSuggestions.push({
        id: `suggestion_${Date.now()}_2`,
        category: 'seo' as const,
        title: '📝 Meta Description 최적화',
        description: suggestion.basicSEO.description,
        before: description || '현재 설명 없음',
        after: suggestion.basicSEO.description,
        impact: 'high' as const,
        difficulty: 'easy' as const
      })

      if (suggestion.basicSEO.headingStructure) {
        aiSuggestions.push({
          id: `suggestion_${Date.now()}_3`,
          category: 'seo' as const,
          title: '🏗️ 헤딩 구조 개선',
          description: suggestion.basicSEO.headingStructure,
          before: '현재 헤딩 구조',
          after: suggestion.basicSEO.headingStructure,
          impact: 'medium' as const,
          difficulty: 'medium' as const
        })
      }
    }

    // 2. 구조화 데이터 개선안
    if (suggestion.structuredData) {
      const isExisting = suggestion.structuredData.status === 'existing'
      const currentSchemas = suggestion.structuredData.currentSchemas || []
      
      aiSuggestions.push({
        id: `suggestion_${Date.now()}_4`,
        category: 'technical' as const,
        title: isExisting ? '🔧 구조화 데이터 개선' : '🔧 JSON-LD 구조화 데이터 추가',
        description: isExisting 
          ? `기존 구조화 데이터(${currentSchemas.join(', ')})를 개선하거나 추가 스키마 적용`
          : '검색엔진과 AI가 이해하기 쉬운 구조화 데이터 추가',
        before: isExisting 
          ? `현재: ${currentSchemas.join(', ')} 스키마 적용됨`
          : '구조화 데이터 없음',
        after: typeof suggestion.structuredData.jsonLD === 'object' 
          ? JSON.stringify(suggestion.structuredData.jsonLD, null, 2)
          : suggestion.structuredData.jsonLD,
        impact: 'high' as const,
        difficulty: isExisting ? 'easy' as const : 'medium' as const
      })
    }

    // 3. AI 대응력 개선안
    if (suggestion.aiReadiness) {
      if (suggestion.aiReadiness.summary) {
        aiSuggestions.push({
          id: `suggestion_${Date.now()}_5`,
          category: 'ai-readiness' as const,
          title: '🤖 TL;DR 요약문 추가',
          description: 'AI 검색엔진이 쉽게 인용할 수 있는 요약문',
          before: '요약문 없음',
          after: suggestion.aiReadiness.summary,
          impact: 'high' as const,
          difficulty: 'easy' as const
        })
      }

      if (suggestion.aiReadiness.llmFriendlyStructure) {
        aiSuggestions.push({
          id: `suggestion_${Date.now()}_6`,
          category: 'ai-readiness' as const,
          title: '🧠 LLM 친화적 구조 개선',
          description: suggestion.aiReadiness.llmFriendlyStructure,
          before: '현재 구조',
          after: '개선된 LLM 친화적 구조',
          impact: 'medium' as const,
          difficulty: 'medium' as const
        })
      }
    }

    // 4. 우선순위 액션 추가
    if (suggestion.prioritizedActions && Array.isArray(suggestion.prioritizedActions)) {
      suggestion.prioritizedActions.forEach((action: any, index: number) => {
                 aiSuggestions.push({
           id: `suggestion_${Date.now()}_${index + 7}`,
           category: action.category || 'seo',
           title: `⚡ 우선순위 액션 ${index + 1}`,
           description: action.action,
           before: '현재 상태',
           after: '개선 후 상태',
           impact: action.impact || 'medium',
           difficulty: action.difficulty || 'medium'
         })
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        analysisId,
        suggestions: aiSuggestions,
        generatedAt: new Date().toISOString(),
        model: process.env.AI_MODEL || 'gpt-4'
      }
    })

  } catch (error) {
    console.error('❌ SEO 개선안 생성 실패:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: handleOpenAIError(error)
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'SEO 개선안 생성 API입니다. POST 요청을 사용해주세요.',
      example: {
        method: 'POST',
        body: {
          url: 'https://example.com',
          title: '현재 페이지 제목',
          description: '현재 메타 설명',
          analysisId: 'analysis_xxx'
        }
      }
    }
  )
}
