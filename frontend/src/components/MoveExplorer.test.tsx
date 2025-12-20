import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithProvider } from '../test/testUtils'
import MoveExplorer from './MoveExplorer'
import type { AppState } from '../utils/appState'

describe('MoveExplorer', () => {
  it('renders without crashing', () => {
    renderWithProvider(<MoveExplorer />)
    expect(screen.getByText('Move Explorer')).toBeInTheDocument()
  })

  it('renders placeholder text when no repertoire selected', () => {
    renderWithProvider(<MoveExplorer />)
    expect(screen.getByText('Select a repertoire to view moves')).toBeInTheDocument()
  })

  it('renders placeholder when repertoire has no moves', () => {
    const mockState: Partial<AppState> = {
      selectedRepertoireId: 'test-rep-1',
      currentPositionNodeId: 'initial',
      repertoires: [{
        id: 'test-rep-1',
        name: 'Test Repertoire',
        perspective: 'white',
        rootNodeId: 'initial',
        nodes: {
          initial: {
            id: 'initial',
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            moves: [],
            parentMoves: []
          }
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }]
    }
    renderWithProvider(<MoveExplorer />, mockState)
    expect(screen.getByText(/No moves in this repertoire yet/)).toBeInTheDocument()
  })

  it('displays moves in PGN-like format', () => {
    const mockState: Partial<AppState> = {
      selectedRepertoireId: 'test-rep-1',
      currentPositionNodeId: 'initial',
      repertoires: [{
        id: 'test-rep-1',
        name: 'Test Repertoire',
        perspective: 'white',
        rootNodeId: 'initial',
        nodes: {
          initial: {
            id: 'initial',
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            moves: [
              {
                san: 'e4',
                uci: 'e2e4',
                targetNodeId: 'node1',
                isMainLine: true
              }
            ],
            parentMoves: []
          },
          node1: {
            id: 'node1',
            fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
            moves: [
              {
                san: 'e5',
                uci: 'e7e5',
                targetNodeId: 'node2',
                isMainLine: true
              }
            ],
            parentMoves: [{
              fromNodeId: 'initial',
              san: 'e4',
              uci: 'e2e4'
            }]
          },
          node2: {
            id: 'node2',
            fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq e6 0 2',
            moves: [],
            parentMoves: [{
              fromNodeId: 'node1',
              san: 'e5',
              uci: 'e7e5'
            }]
          }
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }]
    }
    renderWithProvider(<MoveExplorer />, mockState)
    
    // Check for move numbers and moves
    expect(screen.getByText('1.')).toBeInTheDocument()
    expect(screen.getByText('e4')).toBeInTheDocument()
    expect(screen.getByText('e5')).toBeInTheDocument()
  })

  it('highlights current position', () => {
    const mockState: Partial<AppState> = {
      selectedRepertoireId: 'test-rep-1',
      currentPositionNodeId: 'node1',
      repertoires: [{
        id: 'test-rep-1',
        name: 'Test Repertoire',
        perspective: 'white',
        rootNodeId: 'initial',
        nodes: {
          initial: {
            id: 'initial',
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            moves: [
              {
                san: 'e4',
                uci: 'e2e4',
                targetNodeId: 'node1',
                isMainLine: true
              }
            ],
            parentMoves: []
          },
          node1: {
            id: 'node1',
            fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
            moves: [],
            parentMoves: [{
              fromNodeId: 'initial',
              san: 'e4',
              uci: 'e2e4'
            }]
          }
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }]
    }
    const { container } = renderWithProvider(<MoveExplorer />, mockState)
    
    const e4Move = screen.getByText('e4')
    expect(e4Move).toHaveClass('current-position')
  })

  it('renders back to root button when not at root', () => {
    const mockState: Partial<AppState> = {
      selectedRepertoireId: 'test-rep-1',
      currentPositionNodeId: 'node1',
      repertoires: [{
        id: 'test-rep-1',
        name: 'Test Repertoire',
        perspective: 'white',
        rootNodeId: 'initial',
        nodes: {
          initial: {
            id: 'initial',
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            moves: [
              {
                san: 'e4',
                uci: 'e2e4',
                targetNodeId: 'node1',
                isMainLine: true
              }
            ],
            parentMoves: []
          },
          node1: {
            id: 'node1',
            fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
            moves: [],
            parentMoves: [{
              fromNodeId: 'initial',
              san: 'e4',
              uci: 'e2e4'
            }]
          }
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }]
    }
    const { container } = renderWithProvider(<MoveExplorer />, mockState)
    
    const backButton = container.querySelector('.back-button')
    expect(backButton).toBeInTheDocument()
  })

  it('does not render back button at root position', () => {
    const mockState: Partial<AppState> = {
      selectedRepertoireId: 'test-rep-1',
      currentPositionNodeId: 'initial',
      repertoires: [{
        id: 'test-rep-1',
        name: 'Test Repertoire',
        perspective: 'white',
        rootNodeId: 'initial',
        nodes: {
          initial: {
            id: 'initial',
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            moves: [],
            parentMoves: []
          }
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }]
    }
    const { container } = renderWithProvider(<MoveExplorer />, mockState)
    
    const backButton = container.querySelector('.back-button')
    expect(backButton).not.toBeInTheDocument()
  })

  it('calls navigateToPosition when move is clicked', () => {
    const mockState: Partial<AppState> = {
      selectedRepertoireId: 'test-rep-1',
      currentPositionNodeId: 'initial',
      repertoires: [{
        id: 'test-rep-1',
        name: 'Test Repertoire',
        perspective: 'white',
        rootNodeId: 'initial',
        nodes: {
          initial: {
            id: 'initial',
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            moves: [
              {
                san: 'e4',
                uci: 'e2e4',
                targetNodeId: 'node1',
                isMainLine: true
              }
            ],
            parentMoves: []
          },
          node1: {
            id: 'node1',
            fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
            moves: [],
            parentMoves: [{
              fromNodeId: 'initial',
              san: 'e4',
              uci: 'e2e4'
            }]
          }
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }]
    }
    const { container } = renderWithProvider(<MoveExplorer />, mockState)
    
    const e4Move = screen.getByText('e4')
    fireEvent.click(e4Move)
    
    // Should highlight the clicked move as current position
    expect(e4Move).toHaveClass('current-position')
  })

  it('calls navigateToPosition when back button is clicked', () => {
    const mockState: Partial<AppState> = {
      selectedRepertoireId: 'test-rep-1',
      currentPositionNodeId: 'node1',
      repertoires: [{
        id: 'test-rep-1',
        name: 'Test Repertoire',
        perspective: 'white',
        rootNodeId: 'initial',
        nodes: {
          initial: {
            id: 'initial',
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            moves: [
              {
                san: 'e4',
                uci: 'e2e4',
                targetNodeId: 'node1',
                isMainLine: true
              }
            ],
            parentMoves: []
          },
          node1: {
            id: 'node1',
            fen: 'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
            moves: [],
            parentMoves: [{
              fromNodeId: 'initial',
              san: 'e4',
              uci: 'e2e4'
            }]
          }
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }]
    }
    const { container } = renderWithProvider(<MoveExplorer />, mockState)
    
    const backButton = container.querySelector('.back-button') as HTMLElement
    expect(backButton).toBeInTheDocument()
    
    fireEvent.click(backButton)
    
    // Should no longer show back button (we're at root now)
    expect(container.querySelector('.back-button')).not.toBeInTheDocument()
  })

  it('has the correct structure', () => {
    const { container } = renderWithProvider(<MoveExplorer />)
    expect(container.querySelector('.move-explorer')).toBeInTheDocument()
    expect(container.querySelector('.move-explorer-header')).toBeInTheDocument()
    expect(container.querySelector('.move-explorer-content')).toBeInTheDocument()
  })

  it('renders resize handle', () => {
    const { container } = renderWithProvider(<MoveExplorer />)
    const resizeHandle = container.querySelector('.resize-handle')
    expect(resizeHandle).toBeInTheDocument()
  })

  it('handles drag resize', () => {
    const { container } = renderWithProvider(<MoveExplorer />)
    
    const resizeHandle = container.querySelector('.resize-handle') as HTMLElement
    const moveExplorer = container.querySelector('.move-explorer') as HTMLElement
    expect(resizeHandle).toBeInTheDocument()

    // Get initial dimensions
    const initialWidth = parseInt(moveExplorer.style.width || '320')
    const initialHeight = parseInt(moveExplorer.style.height || '400')

    // Simulate drag start
    fireEvent.mouseDown(resizeHandle, { clientX: 100, clientY: 100 })
    
    // Simulate drag move
    fireEvent.mouseMove(document, { clientX: 150, clientY: 150 })
    
    // Simulate drag end
    fireEvent.mouseUp(document)
    
    // Dimensions should have changed
    const newWidth = parseInt(moveExplorer.style.width)
    const newHeight = parseInt(moveExplorer.style.height)
    expect(newWidth).toBeGreaterThan(initialWidth)
    expect(newHeight).toBeGreaterThan(initialHeight)
  })

  it('respects minimum size during drag resize', () => {
    const { container } = renderWithProvider(<MoveExplorer />)
    
    const resizeHandle = container.querySelector('.resize-handle') as HTMLElement
    const moveExplorer = container.querySelector('.move-explorer') as HTMLElement

    // Simulate drag that would go below minimum
    fireEvent.mouseDown(resizeHandle, { clientX: 100, clientY: 100 })
    fireEvent.mouseMove(document, { clientX: -1000, clientY: -1000 })
    fireEvent.mouseUp(document)
    
    // Should clamp to minimum
    const width = parseInt(moveExplorer.style.width)
    const height = parseInt(moveExplorer.style.height)
    expect(width).toBeGreaterThanOrEqual(280)
    expect(height).toBeGreaterThanOrEqual(300)
  })

  it('respects maximum size during drag resize', () => {
    const { container } = renderWithProvider(<MoveExplorer />)
    
    const resizeHandle = container.querySelector('.resize-handle') as HTMLElement
    const moveExplorer = container.querySelector('.move-explorer') as HTMLElement

    // Simulate drag that would go above maximum
    fireEvent.mouseDown(resizeHandle, { clientX: 100, clientY: 100 })
    fireEvent.mouseMove(document, { clientX: 2000, clientY: 2000 })
    fireEvent.mouseUp(document)
    
    // Should clamp to maximum
    const width = parseInt(moveExplorer.style.width)
    const height = parseInt(moveExplorer.style.height)
    expect(width).toBeLessThanOrEqual(600)
    expect(height).toBeLessThanOrEqual(800)
  })
})
