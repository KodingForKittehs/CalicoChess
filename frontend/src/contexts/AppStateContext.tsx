import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { AppState, Theme } from '../utils/appState'
import { loadState, saveState, exportState, importState, resetState, getCurrentTheme, THEMES } from '../utils/appState'

interface AppStateContextType {
  state: AppState
  currentTheme: Theme
  updateLightSquareColor: (color: string) => void
  updateDarkSquareColor: (color: string) => void
  updateBoardSize: (size: number) => void
  updateTheme: (themeName: string) => void
  exportAppState: () => void
  importAppState: () => Promise<void>
  resetAppState: () => void
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(loadState())
  const currentTheme = getCurrentTheme(state)

  // Automatically sync to localStorage whenever state changes
  useEffect(() => {
    saveState(state)
  }, [state])

  const updateLightSquareColor = (color: string) => {
    setState(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        lightSquareColor: color
      }
    }))
  }

  const updateDarkSquareColor = (color: string) => {
    setState(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        darkSquareColor: color
      }
    }))
  }

  const updateBoardSize = (size: number) => {
    setState(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        boardSize: size
      }
    }))
  }

  const updateTheme = (themeName: string) => {
    if (!THEMES[themeName]) {
      console.error(`Theme "${themeName}" not found`)
      return
    }
    setState(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        theme: themeName
      }
    }))
  }

  const exportAppState = () => {
    exportState()
  }

  const importAppState = async () => {
    const newState = await importState()
    setState(newState)
  }

  const resetAppState = () => {
    resetState()
    setState(loadState())
  }

  return (
    <AppStateContext.Provider
      value={{
        state,
        currentTheme,
        updateLightSquareColor,
        updateDarkSquareColor,
        updateBoardSize,
        updateTheme,
        exportAppState,
        importAppState,
        resetAppState
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

// Custom hook for easy access
export function useAppState() {
  const context = useContext(AppStateContext)
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider')
  }
  return context
}
