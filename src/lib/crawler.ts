import puppeteer, { Browser, Page } from 'puppeteer'
import * as cheerio from 'cheerio'
import { CrawledPageData } from './analyzer'
import { extractDomain } from './utils/analysisUtils'

// Puppeteer 브라우저 설정
const BROWSER_CONFIG = {
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--window-size=1920x1080'
  ]
}

// 타임아웃 설정
const TIMEOUTS = {
  page: 30000,      // 30초
  navigation: 20000, // 20초
  element: 10000     // 10초
}

// User Agent (봇 차단 방지)
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

/**
 * 실제 웹사이트 크롤링 함수
 */
export async function crawlWebsiteWithPuppeteer(url: string): Promise<CrawledPageData> {
  let browser: Browser | null = null
  let page: Page | null = null
  
  try {
    console.log(`🚀 크롤링 시작: ${url}`)
    
    // 브라우저 시작
    browser = await puppeteer.launch(BROWSER_CONFIG)
    page = await browser.newPage()
    
    // User Agent 설정
    await page.setUserAgent(USER_AGENT)
    
    // 뷰포트 설정
    await page.setViewport({ width: 1920, height: 1080 })
    
    // 성능 측정 시작
    const startTime = Date.now()
    
    // 페이지 이동 및 대기
    console.log(`📄 페이지 로딩: ${url}`)
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: TIMEOUTS.navigation 
    })
    
    // 로딩 시간 측정
    const loadTime = Date.now() - startTime
    console.log(`⏱️ 로딩 시간: ${loadTime}ms`)
    
    // 페이지 완전 로딩 대기 (JavaScript 실행 완료)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // HTML 소스 가져오기
    const html = await page.content()
    
    // Cheerio로 HTML 파싱
    const $ = cheerio.load(html)
    
    // 기본 메타데이터 추출
    const title = $('title').text().trim() || ''
    const description = $('meta[name="description"]').attr('content') || 
                       $('meta[property="og:description"]').attr('content') || ''
    
    // 헤딩 구조 추출
    const headings: { level: number; text: string }[] = []
    $('h1, h2, h3, h4, h5, h6').each((_, element) => {
      const level = parseInt(element.tagName.substring(1))
      const text = $(element).text().trim()
      if (text) {
        headings.push({ level, text })
      }
    })
    
    // 이미지 정보 추출
    const images: { src: string; alt: string }[] = []
    $('img').each((_, element) => {
      const src = $(element).attr('src') || ''
      const alt = $(element).attr('alt') || ''
      if (src) {
        images.push({ src, alt })
      }
    })
    
    // 링크 정보 추출
    const links: { href: string; text: string }[] = []
    $('a[href]').each((_, element) => {
      const href = $(element).attr('href') || ''
      const text = $(element).text().trim()
      if (href && text) {
        links.push({ href, text })
      }
    })
    
    // 메타 태그 추출
    const metaTags: Record<string, string> = {}
    
    // 기본 메타 태그
    $('meta').each((_, element) => {
      const name = $(element).attr('name') || $(element).attr('property') || ''
      const content = $(element).attr('content') || ''
      if (name && content) {
        metaTags[name] = content
      }
    })
    
    // title 태그도 포함
    if (title) {
      metaTags['title'] = title
    }
    
    // JSON-LD 구조화 데이터 추출
    const jsonLdData: any[] = []
    $('script[type="application/ld+json"]').each((_, element) => {
      try {
        const content = $(element).html()
        if (content) {
          const parsed = JSON.parse(content)
          jsonLdData.push(parsed)
        }
      } catch (error) {
        console.warn('JSON-LD 파싱 실패:', error)
      }
    })
    
    // 성능 메트릭 수집 (간단한 버전)
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
      }
    })
    
    console.log(`✅ 크롤링 완료: ${url}`)
    
    return {
      url,
      html,
      title,
      description,
      headings,
      images,
      links,
      metaTags,
      jsonLdData,
      loadTime,
      performanceMetrics
    }
    
  } catch (error) {
    console.error(`❌ 크롤링 실패: ${url}`, error)
    
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 크롤링 오류'
    
    // 기본 오류 응답
    return {
      url,
      html: '',
      title: '',
      description: '',
      headings: [],
      images: [],
      links: [],
      metaTags: {},
      jsonLdData: [],
      loadTime: 0,
      error: errorMessage
    }
    
  } finally {
    // 리소스 정리
    if (page) {
      await page.close()
    }
    if (browser) {
      await browser.close()
    }
  }
}

/**
 * 간단한 fetch 기반 크롤링 (Puppeteer 대체용)
 */
export async function crawlWebsiteWithFetch(url: string): Promise<CrawledPageData> {
  try {
    console.log(`🚀 Fetch 크롤링 시작: ${url}`)
    
    const startTime = Date.now()
    
    // Timeout을 위한 AbortController 사용
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUTS.page)
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': USER_AGENT,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const html = await response.text()
    const loadTime = Date.now() - startTime
    
    // Cheerio로 파싱
    const $ = cheerio.load(html)
    
    // 메타데이터 추출 (동일한 로직)
    const title = $('title').text().trim() || ''
    const description = $('meta[name="description"]').attr('content') || 
                       $('meta[property="og:description"]').attr('content') || ''
    
    const headings: { level: number; text: string }[] = []
    $('h1, h2, h3, h4, h5, h6').each((_, element) => {
      const level = parseInt(element.tagName.substring(1))
      const text = $(element).text().trim()
      if (text) {
        headings.push({ level, text })
      }
    })
    
    const images: { src: string; alt: string }[] = []
    $('img').each((_, element) => {
      const src = $(element).attr('src') || ''
      const alt = $(element).attr('alt') || ''
      if (src) {
        images.push({ src, alt })
      }
    })
    
    const links: { href: string; text: string }[] = []
    $('a[href]').each((_, element) => {
      const href = $(element).attr('href') || ''
      const text = $(element).text().trim()
      if (href && text) {
        links.push({ href, text })
      }
    })
    
    const metaTags: Record<string, string> = {}
    $('meta').each((_, element) => {
      const name = $(element).attr('name') || $(element).attr('property') || ''
      const content = $(element).attr('content') || ''
      if (name && content) {
        metaTags[name] = content
      }
    })
    
    if (title) {
      metaTags['title'] = title
    }
    
    const jsonLdData: any[] = []
    $('script[type="application/ld+json"]').each((_, element) => {
      try {
        const content = $(element).html()
        if (content) {
          const parsed = JSON.parse(content)
          jsonLdData.push(parsed)
        }
      } catch (error) {
        console.warn('JSON-LD 파싱 실패:', error)
      }
    })
    
    console.log(`✅ Fetch 크롤링 완료: ${url}`)
    
    return {
      url,
      html,
      title,
      description,
      headings,
      images,
      links,
      metaTags,
      jsonLdData,
      loadTime
    }
    
  } catch (error) {
    console.error(`❌ Fetch 크롤링 실패: ${url}`, error)
    
    return {
      url,
      html: '',
      title: '',
      description: '',
      headings: [],
      images: [],
      links: [],
      metaTags: {},
      jsonLdData: [],
      loadTime: 0,
      error: error instanceof Error ? error.message : '크롤링 실패'
    }
  }
}

/**
 * 메인 크롤링 함수 (Puppeteer 우선, 실패 시 Fetch 사용)
 */
export async function crawlWebsite(url: string): Promise<CrawledPageData> {
  console.log('📍 crawlWebsite 함수 호출됨:', url)
  
  // 개발 환경에서는 Fetch 우선 사용 (빠름)
  if (process.env.NODE_ENV === 'development') {
    console.log('🔧 개발 모드: Fetch 크롤링 사용')
    return crawlWebsiteWithFetch(url)
  }
  
  // 프로덕션에서는 Puppeteer 우선, 실패 시 Fetch
  try {
    console.log('🚀 Puppeteer 크롤링 시도')
    return await crawlWebsiteWithPuppeteer(url)
  } catch (error) {
    console.warn('Puppeteer 실패, Fetch로 재시도:', error)
    return crawlWebsiteWithFetch(url)
  }
}
