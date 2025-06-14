import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { SeoAnalysisResult, AnalysisProgress, AiSuggestion } from '@/types/seo'

interface SeoAnalysisState {
  // 현재 분석 상태
  currentAnalysis: {
    url: string
    isAnalyzing: boolean
    progress?: AnalysisProgress
    error?: string
  }
  
  // 분석 결과 히스토리
  analysisHistory: SeoAnalysisResult[]
  
  // AI 개선 제안
  aiSuggestions: Record<string, AiSuggestion[]> // key는 analysis result id
  
  // UI 상태
  selectedAnalysisId?: string
  
  // Actions
  startAnalysis: (url: string) => void
  updateProgress: (progress: AnalysisProgress) => void
  completeAnalysis: (result: SeoAnalysisResult) => void
  failAnalysis: (error: string) => void
  clearCurrentAnalysis: () => void
  
  selectAnalysis: (id: string) => void
  deleteAnalysis: (id: string) => void
  clearHistory: () => void
  
  addAiSuggestions: (analysisId: string, suggestions: AiSuggestion[]) => void
  removeAiSuggestions: (analysisId: string) => void
}

export const useSeoAnalysisStore = create<SeoAnalysisState>()(
  devtools(
    persist(
      (set, get) => ({
        // 초기 상태
        currentAnalysis: {
          url: '',
          isAnalyzing: false,
        },
        analysisHistory: [],
        aiSuggestions: {},
        
        // 분석 관련 액션들
        startAnalysis: (url: string) => {
          set((state) => ({
            currentAnalysis: {
              url,
              isAnalyzing: true,
              progress: {
                step: 'crawling',
                progress: 0,
                message: '웹사이트 크롤링을 시작합니다...'
              },
              error: undefined
            }
          }), false, 'startAnalysis')
        },
        
        updateProgress: (progress: AnalysisProgress) => {
          set((state) => ({
            currentAnalysis: {
              ...state.currentAnalysis,
              progress
            }
          }), false, 'updateProgress')
        },
        
        completeAnalysis: (result: SeoAnalysisResult) => {
          set((state) => ({
            currentAnalysis: {
              url: '',
              isAnalyzing: false,
            },
            analysisHistory: [result, ...state.analysisHistory],
            selectedAnalysisId: result.id
          }), false, 'completeAnalysis')
        },
        
        failAnalysis: (error: string) => {
          set((state) => ({
            currentAnalysis: {
              ...state.currentAnalysis,
              isAnalyzing: false,
              error
            }
          }), false, 'failAnalysis')
        },
        
        clearCurrentAnalysis: () => {
          set((state) => ({
            currentAnalysis: {
              url: '',
              isAnalyzing: false,
            }
          }), false, 'clearCurrentAnalysis')
        },
        
        // 히스토리 관련 액션들
        selectAnalysis: (id: string) => {
          set({ selectedAnalysisId: id }, false, 'selectAnalysis')
        },
        
        deleteAnalysis: (id: string) => {
          set((state) => {
            const { [id]: _, ...remainingSuggestions } = state.aiSuggestions
            return {
              analysisHistory: state.analysisHistory.filter(result => result.id !== id),
              selectedAnalysisId: state.selectedAnalysisId === id ? undefined : state.selectedAnalysisId,
              aiSuggestions: remainingSuggestions
            }
          }, false, 'deleteAnalysis')
        },
        
        clearHistory: () => {
          set({
            analysisHistory: [],
            selectedAnalysisId: undefined,
            aiSuggestions: {}
          }, false, 'clearHistory')
        },
        
        // AI 제안 관련 액션들
        addAiSuggestions: (analysisId: string, suggestions: AiSuggestion[]) => {
          set((state) => ({
            aiSuggestions: {
              ...state.aiSuggestions,
              [analysisId]: suggestions
            }
          }), false, 'addAiSuggestions')
        },
        
        removeAiSuggestions: (analysisId: string) => {
          set((state) => {
            const { [analysisId]: _, ...remainingSuggestions } = state.aiSuggestions
            return {
              aiSuggestions: remainingSuggestions
            }
          }, false, 'removeAiSuggestions')
        }
      }),
      {
        name: 'seo-analysis-storage', // localStorage key
        partialize: (state) => ({
          // 분석 히스토리와 AI 제안만 저장 (현재 분석 상태는 제외)
          analysisHistory: state.analysisHistory,
          aiSuggestions: state.aiSuggestions,
        }),
      }
    ),
    {
      name: 'seo-analysis-store', // Redux DevTools name
    }
  )
)

// 편의를 위한 선택자들
export const useCurrentAnalysis = () => useSeoAnalysisStore((state) => state.currentAnalysis)
export const useAnalysisHistory = () => useSeoAnalysisStore((state) => state.analysisHistory)
export const useSelectedAnalysis = () => {
  const selectedId = useSeoAnalysisStore((state) => state.selectedAnalysisId)
  const history = useSeoAnalysisStore((state) => state.analysisHistory)
  return selectedId ? history.find(result => result.id === selectedId) : undefined
}
export const useAiSuggestions = (analysisId?: string) => {
  const suggestions = useSeoAnalysisStore((state) => state.aiSuggestions)
  return analysisId ? suggestions[analysisId] || [] : []
}
