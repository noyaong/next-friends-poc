# 🧠 AI SEO Analyzer

> **OpenAI GPT를 활용한 지능형 웹사이트 SEO 분석 도구**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![OpenAI GPT](https://img.shields.io/badge/OpenAI-GPT--4o--mini-green?style=flat-square&logo=openai)](https://openai.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Ready-black?style=flat-square&logo=vercel)](https://vercel.com/)

## 🚀 프로젝트 개요

**AI SEO Analyzer**는 웹사이트의 SEO 성능을 자동으로 분석하고, OpenAI GPT를 활용해 맞춤형 개선안을 제공하는 차세대 SEO 분석 도구입니다. 

### ✨ 주요 특징

- 🔍 **실시간 웹사이트 크롤링 및 분석**
- 🤖 **AI 기반 개선안 자동 생성**
- 📊 **직관적인 점수 시스템 (0-100점)**
- 📱 **완전 반응형 모바일 최적화**
- 🎯 **구조화 데이터 상세 분석**
- 📈 **Core Web Vitals 성능 평가**
- ☁️ **Vercel 배포 완전 최적화**

---

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: Zustand (with persist & devtools)

### Backend & API
- **Runtime**: Node.js (Next.js API Routes)
- **Web Crawling**: Puppeteer + @sparticuz/chromium (Vercel 최적화) + Cheerio
- **AI Integration**: OpenAI GPT-4o-mini
- **Data Persistence**: LocalStorage (with Zustand persist)

### Tools & Infrastructure
- **Package Manager**: npm/yarn
- **Development**: Hot reload, TypeScript strict mode
- **Production**: Optimized build, static optimization
- **Deployment**: Vercel 완전 지원, Docker 지원

---

## 📋 주요 기능

### 🔍 **1. 종합 SEO 분석**
- **메타 데이터 분석**: Title, Description, Keywords 검증
- **헤딩 구조 분석**: H1-H6 태그 계층 구조 평가
- **이미지 최적화**: Alt 태그, 파일 크기, 포맷 검사
- **링크 구조**: 내부/외부 링크 분석
- **페이지 성능**: 로딩 속도, Core Web Vitals

### 🤖 **2. AI 개선안 생성**
- **맞춤형 제안**: 현재 사이트 상태 기반 개선안
- **우선순위 제시**: 중요도에 따른 개선 작업 순서
- **실행 가능한 가이드**: 구체적인 실행 방법 제시
- **구조화 데이터 제안**: JSON-LD 스키마 개선안

### 📊 **3. 상세 분석 리포트**
- **AI 친화도 점수**: 검색엔진 AI 최적화 수준
- **가독성 분석**: 문장 길이, 단어 수, 복잡도
- **구조화 데이터**: JSON-LD 실제 내용 표시
- **모바일 최적화**: 반응형 디자인 검증

### 💾 **4. 분석 히스토리 관리**
- **로컬 저장소**: 분석 결과 자동 저장
- **히스토리 관리**: 과거 분석 결과 조회
- **실시간 진행률**: 분석 진행 상황 실시간 표시

### ☁️ **5. Vercel 배포 최적화**
- **환경별 크롤링**: Vercel/개발/프로덕션 자동 감지
- **Chrome 의존성 해결**: @sparticuz/chromium으로 서버리스 지원
- **자동 폴백**: Puppeteer 실패 시 Fetch 크롤링 자동 전환

---

## 🚀 시작하기

### 1. 환경 설정

```bash
# 저장소 클론
git clone <repository-url>
cd next-js-practice

# 의존성 설치
npm install
# 또는
yarn install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# OpenAI API 설정 (.env.local - Git에서 제외됨)
OPENAI_API_KEY=your_openai_api_key_here

# 선택사항 (기본값이 설정되어 있음)
# AI_MODEL=gpt-4o-mini
# AI_TEMPERATURE=0.7
# AI_MAX_TOKENS=1500
```

> ⚠️ **보안 주의**: `.env.local` 파일은 Git에 커밋되지 않습니다. 실제 API 키를 안전하게 보관하세요.  
> 💡 **필수 환경변수**: `OPENAI_API_KEY`만 설정하면 됩니다. 나머지는 코드에서 기본값을 사용합니다.

### 3. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하세요.

---

## 📖 사용 방법

### 1. **기본 분석**
1. 홈페이지에서 분석하려는 웹사이트 URL 입력
2. "분석 시작" 버튼 클릭
3. 실시간 진행률 확인 (크롤링 → SEO 분석 → AI 분석)
4. 분석 완료 후 결과 카드 확인

### 2. **상세 분석 조회**
1. 분석 결과 카드 클릭
2. 상세 분석 페이지로 이동
3. SEO 요소별 점수 및 개선사항 확인
4. AI 친화도 상세 분석 결과 확인

### 3. **AI 개선안 생성**
1. 상세 분석 페이지에서 "AI 개선안 생성" 버튼 클릭
2. 현재 사이트 상태 기반 맞춤형 개선안 확인
3. 우선순위별 실행 가이드 활용

### 4. **구조화 데이터 확인**
1. AI 친화도 섹션에서 구조화 데이터 상태 확인
2. JSON-LD 데이터가 있는 경우 "자세히 보기" 클릭
3. 실제 스키마 내용 및 최적화 제안 확인

---

## 🏗 프로젝트 구조

```
src/
├── app/                          # Next.js App Router
│   ├── analysis/[id]/page.tsx    # 상세 분석 페이지
│   ├── api/                      # API 라우트
│   │   ├── analyze/route.ts      # 웹사이트 분석 API
│   │   └── ai/                   # AI 관련 API
│   │       ├── test/route.ts     # OpenAI 연결 테스트
│   │       └── suggestions/route.ts # AI 개선안 생성
│   ├── layout.tsx               # 루트 레이아웃
│   └── page.tsx                 # 홈페이지
├── components/                  # React 컴포넌트
│   ├── analysis/               # 분석 관련 컴포넌트
│   │   ├── AiOptimizationDetail.tsx
│   │   └── SeoFactorsDetail.tsx
│   ├── home/                   # 홈페이지 컴포넌트
│   │   ├── AnalysisResultGrid.tsx
│   │   └── SeoAnalysisForm.tsx
│   └── layout/                 # 레이아웃 컴포넌트
│       ├── Footer.tsx
│       └── MainLayout.tsx
├── lib/                        # 유틸리티 라이브러리
│   ├── ai/                    # AI 관련 로직
│   │   └── openai.ts          # OpenAI 클라이언트
│   ├── analyzer.ts            # SEO 분석 로직
│   ├── crawler.ts             # 웹 크롤링 로직 (환경별 최적화)
│   └── utils/                 # 공통 유틸리티
│       └── analysisUtils.ts
├── store/                     # 상태 관리
│   └── seoAnalysisStore.ts    # Zustand 스토어
└── types/                     # TypeScript 타입
    └── seo.ts                 # SEO 관련 타입 정의
```

---

## 🔧 주요 API 엔드포인트

### `POST /api/analyze`
웹사이트 종합 분석을 실행합니다.

**요청 Body:**
```json
{
  "url": "https://example.com"
}
```

**응답:**
```json
{
  "success": true,
  "data": {
    "id": "unique-analysis-id",
    "url": "https://example.com",
    "timestamp": "2024-12-15T10:30:00Z",
    "seoScore": 85,
    "aiOptimizationScore": 78,
    "performanceScore": 92,
    "seoFactors": { /* 상세 SEO 요소 */ },
    "aiOptimization": { /* AI 최적화 상세 */ },
    "performance": { /* 성능 메트릭 */ }
  }
}
```

### `POST /api/ai/suggestions`
AI 기반 개선안을 생성합니다.

**요청 Body:**
```json
{
  "analysisData": { /* 분석 결과 데이터 */ }
}
```

---

## 📊 분석 지표 설명

### SEO 점수 (0-100점)
- **Title 태그**: 길이, 키워드 포함 여부
- **Meta Description**: 최적 길이, 매력도
- **헤딩 구조**: H1-H6 계층 구조 적절성
- **이미지 최적화**: Alt 태그, 파일 크기
- **링크 구조**: 내부 링크 연결성

### AI 친화도 점수 (0-100점)
- **가독성**: 문장 길이, 복잡도
- **구조화 데이터**: JSON-LD 스키마 존재 여부
- **콘텐츠 품질**: 텍스트 길이, 정보 밀도
- **사용자 경험**: 네비게이션, 접근성

### 성능 점수 (0-100점)
- **로딩 속도**: 페이지 로드 시간
- **리소스 최적화**: CSS, JS 파일 크기
- **이미지 최적화**: 압축률, 포맷 적절성
- **Core Web Vitals**: LCP, FID, CLS

---

## 🎯 AI 개선안 생성 로직

### 1. **현재 상태 분석**
- 기존 분석 결과 데이터 파싱
- 구조화 데이터 존재 여부 확인
- 각 SEO 요소별 점수 평가

### 2. **맞춤형 제안 생성**
- **기존 데이터 개선**: 이미 있는 요소의 품질 향상
- **누락 요소 추가**: 없는 요소에 대한 추가 제안
- **우선순위 설정**: 영향도 기반 작업 순서 제시

### 3. **실행 가능한 가이드**
- **구체적 방법**: 실제 코드 예시 포함
- **단계별 설명**: 초보자도 따라할 수 있는 가이드
- **검증 방법**: 개선 효과 측정 방법 제시

---

## 🔄 크롤링 환경별 최적화

### **자동 환경 감지 시스템**
```typescript
// 환경별 최적화된 크롤링 전략
if (process.env.VERCEL === '1') {
  // Vercel: 서버리스 환경 최적화
  return crawlWebsiteWithFetch(url)
} else if (process.env.NODE_ENV === 'development') {
  // 개발: 빠른 테스트
  return crawlWebsiteWithFetch(url)
} else {
  // 프로덕션: 최고 품질 분석
  return crawlWebsiteWithPuppeteer(url)
}
```

### **Vercel 환경 특별 지원**
- **Chrome 의존성 해결**: @sparticuz/chromium 패키지
- **자동 폴백**: Puppeteer 실패 시 Fetch 자동 전환
- **성능 최적화**: SPA 감지, HTML 분석 강화

---

## 🎨 UI/UX 특징

### 📱 **완전 반응형 디자인**
- **데스크톱**: 넓은 화면 최적화, 멀티 컬럼 레이아웃
- **태블릿**: 중간 화면 대응, 터치 친화적 UI
- **모바일**: 한 손 조작 최적화, 세로 화면 집중

### 🎯 **사용자 중심 인터페이스**
- **직관적 네비게이션**: 명확한 정보 계층
- **실시간 피드백**: 진행률 표시, 로딩 상태
- **접근성 준수**: 색상 대비, 키보드 네비게이션

### 📊 **데이터 시각화**
- **점수 표시**: 색상 코딩, 프로그레스 바
- **상태 아이콘**: 직관적 성공/실패/개선 표시
- **코드 블록**: 구조화 데이터 예쁘게 표시

---

## 🚀 배포 가이드

### Vercel 배포 (추천) ✨

#### **자동 배포**
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 배포
vercel

# 환경 변수 설정 (필수)
vercel env add OPENAI_API_KEY

# 선택사항 (기본값 변경 시에만)
# vercel env add AI_MODEL
# vercel env add AI_TEMPERATURE
# vercel env add AI_MAX_TOKENS
```

#### **대시보드 설정**
1. Vercel 프로젝트 대시보드 접속
2. Settings → Environment Variables
3. **필수 환경변수** 추가:
   - `OPENAI_API_KEY`: 실제 OpenAI API 키
4. **자동 설정되는 환경변수** (추가 불필요):
   - `VERCEL=1`: Vercel 환경 자동 감지
   - `VERCEL_ENV=production`
   - `VERCEL_URL=your-app.vercel.app`

### Docker 배포
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### 기타 플랫폼
- **Netlify**: Next.js 지원
- **AWS/GCP**: 서버리스 또는 VM 배포
- **Railway**: 간편한 Git 연동 배포

---

## 🔐 환경변수 관리

### 로컬 개발 환경
- **파일**: `.env.local` (Git에서 자동 제외)
- **용도**: 개발 서버에서 사용
- **보안**: 로컬 머신에만 저장, 절대 커밋하지 않음

### Vercel 배포 환경
- **설정 위치**: Vercel 대시보드 → Settings → Environment Variables
- **환경별 설정**: Development, Preview, Production 각각 설정 가능
- **보안**: Vercel에서 암호화되어 안전하게 관리
- **자동 설정**: `VERCEL=1` 등은 자동으로 설정됨

### 환경변수 우선순위 (Next.js)
1. `process.env`
2. `.env.local`
3. `.env.production` (프로덕션 빌드 시)
4. `.env.development` (개발 모드 시)
5. `.env`

---

## 🔧 문제 해결

### 일반적인 문제들

**1. OpenAI API 키 관련**
```bash
# 로컬 환경 변수 확인
echo $OPENAI_API_KEY

# .env.local 파일 확인 (로컬 개발용)
cat .env.local

# Vercel 환경 변수 확인
vercel env ls
```

**2. 크롤링 실패**
- 대상 사이트의 robots.txt 확인
- CORS 정책 확인
- 네트워크 연결 상태 확인
- Vercel 환경에서는 자동으로 Fetch 크롤링 사용

**3. 분석 결과 저장 실패**
- 브라우저 LocalStorage 공간 확인
- 브라우저 개발자 도구 콘솔 확인

### 성능 최적화

**1. 크롤링 속도 개선**
```javascript
// 환경별 최적화된 크롤링
// Vercel: Fetch (빠름, 안정적)
// 개발: Fetch (빠름)
// 프로덕션: Puppeteer (정확함)
```

**2. AI API 호출 최적화**
```javascript
// 토큰 수 제한으로 비용 최적화
const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini', // 비용 효율적인 모델
  max_tokens: 1500,     // 토큰 수 제한
  temperature: 0.7      // 일관성 있는 결과
});
```

---

## 📈 향후 개발 계획

### 2차 개발 (고급 기능)
- **PDF 보고서 생성**: 분석 결과를 PDF로 내보내기
- **Lighthouse 연동**: Google Lighthouse API 통합
- **개선 전/후 비교**: 시간별 분석 결과 트래킹
- **대시보드 차트**: 시각적 통계 및 트렌드 분석

### 3차 개발 (비즈니스 확장)
- **사용자 계정 시스템**: 로그인, 분석 히스토리 관리
- **AI SEO Writer**: 콘텐츠 자동 생성 기능
- **White Label 솔루션**: 다른 기업을 위한 커스터마이징
- **API 서비스화**: 외부 서비스와 연동 가능한 API 제공

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

## 🏢 개발사 정보

**주식회사 성장**  
서울시 강동구 성내로 6길 16, 409호  
사업자등록번호: 123-45-67890  
대표전화: 02-1234-5678  
이메일: info@seongjang.co.kr  

---

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 지원 및 문의

- **GitHub Issues**: 버그 리포트 및 기능 요청
- **이메일**: dev@seongjang.co.kr
- **문서**: [프로젝트 위키](https://github.com/your-repo/wiki)

---

## 🎭 개발 스토리

> **"두 개의 AI, 하나의 완벽한 프로젝트"**

이 프로젝트는 특별한 개발 워크플로우로 탄생했습니다:

### 🧠 **기획 & 설계 단계**: Claude Desktop
- 🎯 **전략적 사고**: "어떤 SEO 도구를 만들까?"부터 시작
- 🏗️ **아키텍처 설계**: 컴포넌트 구조, API 설계, 데이터 플로우 계획
- 📋 **요구사항 정의**: "실제 사용자가 원하는 기능이 뭐지?"
- 🔍 **기술 연구**: Next.js 14, OpenAI API, Puppeteer 생태계 탐구
- 💡 **창의적 아이디어**: "AI가 SEO를 어떻게 도와줄 수 있을까?"

### ⚡ **개발 & 실행 단계**: Cursor
- ⌨️ **실제 코딩**: TypeScript, React 컴포넌트 구현
- 🐛 **디버깅 & 테스트**: "왜 Puppeteer가 Vercel에서 안 되지?"
- 🔧 **문제 해결**: Chrome 의존성, 환경별 분기 처리
- 🎨 **UI 구현**: Tailwind로 완전 반응형 디자인
- 🚀 **배포 최적화**: Vercel 환경에서 완벽 작동하도록 조정

### 🤝 **완벽한 콜라보레이션**
- **Claude**: "이론적으로 이렇게 하면 어떨까요?" 💭
- **Cursor**: "실제로 코드로 구현해보니 이런 문제가..." 🔨
- **결과**: 이론과 실무가 만나 탄생한 실전 프로젝트! ✨

**교훈**: AI도 각자의 특기가 있다. 큰 그림은 Claude, 세밀한 실행은 Cursor! 🎯

---

**⭐ 이 프로젝트가 도움이 되었다면 Star를 눌러주세요!** 

**🚀 프로젝트 완성도: 즉시 상용 서비스 런칭 가능!** 