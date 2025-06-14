'use client'

import { useState, useEffect } from 'react'

// Client Component - 상호작용과 상태 관리
export default function InteractiveCounter() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const [browserInfo, setBrowserInfo] = useState('')

  // useEffect - Client Component에서만 사용 가능
  useEffect(() => {
    // 브라우저 정보 가져오기
    setBrowserInfo(navigator.userAgent)
    
    // 실시간 시계
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('ko-KR'))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 비동기 함수 - Client Component에서는 이벤트 핸들러에서 사용
  const handleAsyncOperation = async () => {
    setMessage('데이터를 가져오는 중...')
    
    try {
      // 시뮬레이션: API 호출
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const response = await fetch('/api/demo-data')
      if (response.ok) {
        const data = await response.text()
        setMessage(`서버에서 받은 데이터: ${data}`)
      } else {
        setMessage('API 엔드포인트가 없어도 괜찮습니다 - 데모용입니다!')
      }
    } catch (error) {
      setMessage('데이터 로딩 완료! (데모용)')
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded border">
        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-4">
          상호작용 데모:
        </h4>
        
        {/* 카운터 */}
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => setCount(count - 1)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            -1
          </button>
          <span className="font-mono text-lg font-bold">{count}</span>
          <button
            onClick={() => setCount(count + 1)}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            +1
          </button>
          <button
            onClick={() => setCount(0)}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            리셋
          </button>
        </div>

        {/* 비동기 작업 */}
        <div className="mb-4">
          <button
            onClick={handleAsyncOperation}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            비동기 데이터 가져오기
          </button>
          {message && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {message}
            </p>
          )}
        </div>
      </div>

      {/* 실시간 정보 */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded border">
        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
          실시간 브라우저 정보:
        </h4>
        <div className="space-y-2 text-sm">
          <p><strong>현재 시간:</strong> {currentTime}</p>
          <p><strong>화면 크기:</strong> {typeof window !== 'undefined' ? `${window.innerWidth} x ${window.innerHeight}` : '로딩 중...'}</p>
          <p><strong>브라우저:</strong> {browserInfo ? browserInfo.split(' ')[0] : '로딩 중...'}</p>
        </div>
        <p className="text-xs text-green-600 dark:text-green-300 mt-2">
          ℹ️ 이 정보는 클라이언트에서만 접근 가능한 브라우저 API 데이터입니다.
        </p>
      </div>

      {/* 장점 설명 */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded border">
        <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
          장점 시연:
        </h4>
        <ul className="text-sm space-y-1">
          <li>✅ 실시간 상호작용 (버튼 클릭, 실시간 시계)</li>
          <li>✅ 브라우저 API 접근 (navigator, window 객체)</li>
          <li>✅ 상태 관리 (useState로 카운터 상태 관리)</li>
          <li>✅ 비동기 작업 (fetch API, setTimeout)</li>
          <li>❌ 이 컴포넌트는 JavaScript 번들에 포함됨</li>
        </ul>
      </div>
    </div>
  )
}
