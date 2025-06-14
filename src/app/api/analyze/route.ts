import { NextRequest, NextResponse } from 'next/server'
import { performFullAnalysis } from '@/lib/analyzer'
import { isValidUrl, normalizeError } from '@/lib/utils/analysisUtils'

export async function POST(request: NextRequest) {
  console.log('📞 API /analyze POST 요청 수신')
  
  try {
    const body = await request.json()
    const { url } = body
    
    console.log('🔍 분석 요청 URL:', url)

    // URL 유효성 검증
    if (!url || typeof url !== 'string') {
      console.log('❌ URL 누락 오류')
      return NextResponse.json(
        { error: 'URL이 필요합니다.' },
        { status: 400 }
      )
    }

    if (!isValidUrl(url)) {
      console.log('❌ URL 유효성 검증 실패:', url)
      return NextResponse.json(
        { error: '유효하지 않은 URL입니다.' },
        { status: 400 }
      )
    }

    console.log('✅ URL 유효성 검증 통과, 분석 시작...')
    
    // 분석 실행
    const result = await performFullAnalysis(url)
    
    console.log('✅ 분석 완료:', {
      id: result.id,
      domain: result.domain,
      seoScore: result.seoScore,
      status: result.status
    })

    return NextResponse.json({
      success: true,
      data: result
    })

  } catch (error) {
    console.error('❌ 분석 오류:', error)
    
    return NextResponse.json(
      { 
        error: normalizeError(error),
        success: false 
      },
      { status: 500 }
    )
  }
}

// 분석 상태 조회 (향후 확장용)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const analysisId = searchParams.get('id')

  if (!analysisId) {
    return NextResponse.json(
      { error: '분석 ID가 필요합니다.' },
      { status: 400 }
    )
  }

  // TODO: 실제 분석 상태 조회 로직 구현
  // 현재는 Mock 응답
  return NextResponse.json({
    success: true,
    data: {
      id: analysisId,
      status: 'completed',
      progress: 100
    }
  })
}
