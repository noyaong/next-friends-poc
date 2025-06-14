'use client'

import { useState } from 'react'
import { Brain, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

export default function OpenAITestPanel() {
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false)
  const [connectionResult, setConnectionResult] = useState<any>(null)
  const [suggestions, setSuggestions] = useState<any>(null)
  const [error, setError] = useState<string>('')

  // OpenAI 연결 테스트
  const testConnection = async () => {
    setIsTestingConnection(true)
    setError('')
    setConnectionResult(null)

    try {
      const response = await fetch('/api/ai/test')
      const result = await response.json()
      
      if (result.success) {
        setConnectionResult(result)
      } else {
        setError(result.error || '연결 테스트 실패')
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setIsTestingConnection(false)
    }
  }

  // SEO 개선안 생성 테스트
  const generateSuggestions = async () => {
    setIsGeneratingSuggestions(true)
    setError('')
    setSuggestions(null)

    try {
      const response = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: 'https://example.com',
          title: '예시 웹사이트',
          description: '이것은 테스트용 웹사이트입니다.',
          analysisId: 'test_analysis_123',
          structuredData: {
            hasJsonLd: false,
            schemas: []
          },
          aiOptimization: {
            hasHeadings: true,
            hasStructuredContent: false,
            hasSummary: false,
            readabilityScore: 65
          }
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setSuggestions(result.data)
      } else {
        setError(result.error || 'SEO 개선안 생성 실패')
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setIsGeneratingSuggestions(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-bold">OpenAI API 테스트</h2>
      </div>

      {/* 연결 테스트 */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={testConnection}
            disabled={isTestingConnection}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isTestingConnection ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            {isTestingConnection ? '연결 테스트 중...' : 'OpenAI 연결 테스트'}
          </button>
          
          <button
            onClick={generateSuggestions}
            disabled={isGeneratingSuggestions || !connectionResult}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isGeneratingSuggestions ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Brain className="w-4 h-4" />
            )}
            {isGeneratingSuggestions ? 'AI 개선안 생성 중...' : 'SEO 개선안 생성 테스트'}
          </button>
        </div>

        {/* 에러 표시 */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">오류 발생</span>
            </div>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* 연결 테스트 결과 */}
        {connectionResult && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800 mb-2">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">OpenAI 연결 성공!</span>
            </div>
            <div className="text-sm text-green-700">
              <p>모델: {connectionResult.config?.model}</p>
              <p>온도: {connectionResult.config?.temperature}</p>
              <p>최대 토큰: {connectionResult.config?.maxTokens}</p>
              <p>테스트 시간: {new Date(connectionResult.timestamp).toLocaleString()}</p>
            </div>
          </div>
        )}

        {/* SEO 개선안 결과 */}
        {suggestions && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center gap-2 text-purple-800 mb-3">
              <Brain className="w-5 h-5" />
              <span className="font-medium">AI SEO 개선안 생성 성공!</span>
            </div>
            <div className="space-y-3">
              {suggestions.suggestions?.map((suggestion: any, index: number) => (
                <div key={suggestion.id} className="bg-white p-3 rounded border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-purple-700">
                      {suggestion.title}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      suggestion.impact === 'high' 
                        ? 'bg-red-100 text-red-700'
                        : suggestion.impact === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {suggestion.impact} impact
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{suggestion.description}</p>
                  <div className="text-xs">
                    <div className="mb-1">
                      <strong>현재:</strong> {suggestion.before}
                    </div>
                    <div>
                      <strong>개선안:</strong> {suggestion.after}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-purple-600">
              생성 시간: {new Date(suggestions.generatedAt).toLocaleString()} | 
              사용 모델: {suggestions.model}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
