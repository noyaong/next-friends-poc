// URL 유효성 검증
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// 도메인 추출
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return ''
  }
}

// 고유 ID 생성
export function generateAnalysisId(): string {
  return `analysis_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// 점수 계산 (0-100)
export function calculateScore(factors: Record<string, number>): number {
  const values = Object.values(factors)
  const average = values.reduce((sum, val) => sum + val, 0) / values.length
  return Math.round(Math.max(0, Math.min(100, average)))
}

// 텍스트 가독성 점수 계산 (간단한 Flesch Reading Ease 기반)
export function calculateReadabilityScore(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const words = text.split(/\s+/).filter(w => w.length > 0)
  const syllables = words.reduce((count, word) => {
    return count + countSyllables(word)
  }, 0)

  if (sentences.length === 0 || words.length === 0) return 0

  const avgSentenceLength = words.length / sentences.length
  const avgSyllablesPerWord = syllables / words.length

  // Flesch Reading Ease formula (simplified)
  const score = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord)
  return Math.round(Math.max(0, Math.min(100, score)))
}

// 간단한 음절 수 계산
function countSyllables(word: string): number {
  word = word.toLowerCase()
  let count = 0
  const vowels = 'aeiouy'
  let previousWasVowel = false

  for (let i = 0; i < word.length; i++) {
    const isVowel = vowels.includes(word[i])
    if (isVowel && !previousWasVowel) {
      count++
    }
    previousWasVowel = isVowel
  }

  // 최소 1개 음절
  return Math.max(1, count)
}

// 성능 점수 계산
export function calculatePerformanceScore(metrics: {
  loadTime: number
  fcp: number
  lcp: number
  cls: number
}): number {
  // 각 메트릭에 대한 점수 계산 (Google 기준)
  const loadTimeScore = metrics.loadTime < 3000 ? 100 : Math.max(0, 100 - (metrics.loadTime - 3000) / 100)
  const fcpScore = metrics.fcp < 1800 ? 100 : Math.max(0, 100 - (metrics.fcp - 1800) / 50)
  const lcpScore = metrics.lcp < 2500 ? 100 : Math.max(0, 100 - (metrics.lcp - 2500) / 50)
  const clsScore = metrics.cls < 0.1 ? 100 : Math.max(0, 100 - (metrics.cls - 0.1) * 1000)

  return calculateScore({
    loadTime: loadTimeScore,
    fcp: fcpScore,
    lcp: lcpScore,
    cls: clsScore
  })
}

// 지연 함수 (분석 진행 시뮬레이션용)
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// 오류 메시지 정규화
export function normalizeError(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  return '알 수 없는 오류가 발생했습니다.'
}
