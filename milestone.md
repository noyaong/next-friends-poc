# 🧠 AI SEO Analyzer – 프로젝트 개요 (Next.js 14 + LangGraph + Zustand)

AI 시대의 검색 환경에 맞춰 웹사이트를 **전통 SEO + 구조화 데이터 + LLM 검색 대응력** 측면에서 분석하고,  
LangGraph + GPT를 활용해 콘텐츠 개선안을 자동 생성하는 SEO 진단/개선 도구입니다.

## ✅ 프로젝트 목표

- 웹사이트의 SEO 및 구조화 데이터 품질 자동 분석
- AI 검색엔진(GPT, Perplexity 등) 대응력 진단
- LangGraph를 활용한 개선안 자동 생성 (meta, schema, FAQ 등)
- 개선 전/후 결과 비교 및 보고서 제공
- GPT 인식 여부 테스트를 통한 AI 검색 반영 검증

## ✅ 주요 기능

1. 사용자 URL 입력 → 자동 크롤링 및 분석
2. 항목별 점수화 (SEO, 스키마, AI 친화도)
3. GPT 기반 콘텐츠 개선안 자동 제안 (LangGraph 활용)
4. 개선 후 구조에 대해 재분석 → 전/후 점수 비교
5. 분석 결과를 PDF 또는 SSR 공유 페이지로 출력
6. AI 검색엔진 인식 여부 확인 (GPT 질의/Perplexity 테스트)

## ✅ 분석 척도 (SEO + AI 대응 기준)

### 1. 기본 SEO 요소
- title, meta 태그 적절성
- H1~H6 구조 존재 여부
- 이미지 ALT 태그 유무
- canonical, sitemap.xml, robots.txt 구성 확인
- Lighthouse 기반 속도/UX 점수

### 2. 구조화 데이터 (Schema.org)
- JSON-LD 포맷 여부
- Article, FAQ, Organization 스키마 포함 여부
- 필수 필드/속성 구성 상태

### 3. AI 검색 대응력 (LLM 기준)
- LLM이 이해하기 좋은 구조와 문장 구성
- TL;DR, 요약문 포함 여부
- GPT 인용 가능성, 정보 신뢰도 (E-E-A-T 기준)

## ✅ 시스템 구조 요약

| 단계         | 도구                            | 역할 |
|--------------|----------------------------------|------|
| 크롤링/분석  | Puppeteer, Cheerio, Lighthouse   | HTML 렌더링 기반 구조 분석 |
| 점수 계산    | Custom JS 로직                   | 항목별 룰 기반 스코어링 |
| 개선안 생성  | LangGraph + GPT                  | meta, schema, FAQ, TL;DR 생성 |
| 개선 후 비교 | 재분석 + GPT 평가                | 점수/요약 품질 비교 |
| AI 검증      | GPT 질의 / Perplexity 테스트     | 실제 인식/인용 여부 확인 |

## ✅ 기술 스택

### 프론트엔드
- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Zustand (상태관리)
- react-pdf or html2pdf.js

### 백엔드 / 분석
- API Routes (app/api/analyze/route.ts)
- Puppeteer (크롤링)
- Cheerio (HTML 파싱)
- Lighthouse CLI (속도/UX 분석)
- schema-dts, JSON-LD 파서

### LLM 기반 개선
- LangGraph (/lib/langgraph.ts)
- LangChain + OpenAI GPT API
- 개선 흐름: 평가 → 제안 → 재평가 → 비교

## ✅ 디렉토리 구조 예시 (App Router 기준)

- /app  
  - page.tsx  
  - report/[id]/page.tsx  
  - api/analyze/route.ts  
- /store  
  - useSeoStore.ts  
- /lib  
  - langgraph.ts  
  - crawler.ts  
  - parser.ts  
  - scorer.ts  
  - summarizeWithGPT.ts  
- /components  
  - ScoreCard.tsx  
  - DetailSection.tsx  
  - PDFButton.tsx  
- /types  
  - SeoResult.ts

## ✅ 향후 확장 가능성

- GPT 기반 SEO 자동 문서 생성기 (AI SEO Writer)
- 분석 후 개선 구조 GitHub PR 자동 생성
- CMS (Notion, WordPress 등) 연동
- 관리자용 워크플로우 UI (Low-code LangGraph Editor)
- 사용자 계정 기반 분석 이력 관리 (SaaS화)

## 🔗 참고 문서

- https://nextjs.org/docs/app  
- https://docs.langchain.com/langgraph/  
- https://schema.org/  
- https://developer.chrome.com/docs/lighthouse/  
- https://platform.openai.com/docs/guides/function-calling/  
- https://developers.google.com/search/apis