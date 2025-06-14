import { NextRequest, NextResponse } from 'next/server'
import { testOpenAIConnection, handleOpenAIError } from '@/lib/ai/openai'

export async function GET() {
  console.log('🧪 OpenAI 연결 테스트 시작...')
  
  try {
    // quota 절약을 위한 테스트 건너뛰기 옵션
    if (process.env.SKIP_OPENAI_TEST === 'true') {
      console.log('⏭️ OpenAI 테스트 건너뛰기 (SKIP_OPENAI_TEST=true)')
      return NextResponse.json({
        success: true,
        message: 'OpenAI API 테스트가 건너뛰어졌습니다 (quota 절약 모드)',
        skipped: true,
        config: {
          model: process.env.AI_MODEL || 'gpt-3.5-turbo',
          temperature: process.env.AI_TEMPERATURE || '0.7',
          maxTokens: process.env.AI_MAX_TOKENS || '500'
        },
        timestamp: new Date().toISOString()
      })
    }

    // 환경변수 확인
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'OPENAI_API_KEY 환경변수가 설정되지 않았습니다.',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }

    console.log('🔑 API 키 확인됨')
    
    // OpenAI 연결 테스트
    const isConnected = await testOpenAIConnection()
    
    if (isConnected) {
      console.log('✅ OpenAI 연결 성공!')
      return NextResponse.json({
        success: true,
        message: 'OpenAI API 연결이 성공적으로 확인되었습니다.',
        config: {
          model: process.env.AI_MODEL || 'gpt-3.5-turbo',
          temperature: process.env.AI_TEMPERATURE || '0.7',
          maxTokens: process.env.AI_MAX_TOKENS || '500'
        },
        timestamp: new Date().toISOString()
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'OpenAI API 연결 테스트에 실패했습니다.',
          timestamp: new Date().toISOString()
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('❌ OpenAI 테스트 오류:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: handleOpenAIError(error),
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'POST 메서드는 지원되지 않습니다. GET을 사용해주세요.' },
    { status: 405 }
  )
}
