import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithProvider } from '../test/testUtils'
import MoveExplorer from './MoveExplorer'

describe('MoveExplorer', () => {
  it('renders without crashing', () => {
    renderWithProvider(<MoveExplorer />)
    expect(screen.getByText('Move Explorer')).toBeInTheDocument()
  })

  it('renders placeholder text', () => {
    renderWithProvider(<MoveExplorer />)
    expect(screen.getByText('Move history and analysis will appear here')).toBeInTheDocument()
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
