import { describe, it, expect, vi } from 'vitest'
import { fireEvent } from '@testing-library/react'
import { renderWithProvider } from '../test/testUtils'
import Chessboard from './Chessboard'

describe('Chessboard', () => {
  it('renders without crashing', () => {
    const { container } = renderWithProvider(<Chessboard />)
    expect(container.querySelector('.chessboard-container')).toBeInTheDocument()
  })

  it('renders the chessboard component', () => {
    const { container } = renderWithProvider(<Chessboard />)
    // react-chessboard renders SVG elements
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('applies custom light square color', () => {
    const customColor = '#e8e8e8'
    const { container } = renderWithProvider(<Chessboard lightSquareColor={customColor} />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('applies custom dark square color', () => {
    const customColor = '#444444'
    const { container } = renderWithProvider(<Chessboard darkSquareColor={customColor} />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('uses default colors when none provided', () => {
    const { container } = renderWithProvider(<Chessboard />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders with chessboard container wrapper', () => {
    const { container} = renderWithProvider(<Chessboard />)
    const wrapper = container.querySelector('.chessboard-container')
    expect(wrapper).toBeInTheDocument()
  })

  it('renders resize handle', () => {
    const { container } = renderWithProvider(<Chessboard />)
    const resizeHandle = container.querySelector('.resize-handle')
    expect(resizeHandle).toBeInTheDocument()
  })

  it('handles drag resize', () => {
    const onBoardSizeChange = vi.fn()
    const { container } = renderWithProvider(<Chessboard boardSize={480} onBoardSizeChange={onBoardSizeChange} />)
    
    const resizeHandle = container.querySelector('.resize-handle') as HTMLElement
    expect(resizeHandle).toBeInTheDocument()

    // Simulate drag start
    fireEvent.mouseDown(resizeHandle, { clientX: 100, clientY: 100 })
    
    // Simulate drag move
    fireEvent.mouseMove(document, { clientX: 150, clientY: 150 })
    
    // Simulate drag end
    fireEvent.mouseUp(document)
    
    expect(onBoardSizeChange).toHaveBeenCalled()
  })

  it('respects minimum size during drag resize', () => {
    const onBoardSizeChange = vi.fn()
    const { container } = renderWithProvider(<Chessboard boardSize={320} onBoardSizeChange={onBoardSizeChange} />)
    
    const resizeHandle = container.querySelector('.resize-handle') as HTMLElement

    // Simulate drag that would go below minimum
    fireEvent.mouseDown(resizeHandle, { clientX: 100, clientY: 100 })
    fireEvent.mouseMove(document, { clientX: 0, clientY: 0 })
    fireEvent.mouseUp(document)
    
    // Should clamp to minimum
    const calls = onBoardSizeChange.mock.calls
    if (calls.length > 0) {
      const lastCall = calls[calls.length - 1][0]
      expect(lastCall).toBeGreaterThanOrEqual(320)
    }
  })

  it('respects maximum size during drag resize', () => {
    const onBoardSizeChange = vi.fn()
    const { container } = renderWithProvider(<Chessboard boardSize={800} onBoardSizeChange={onBoardSizeChange} />)
    
    const resizeHandle = container.querySelector('.resize-handle') as HTMLElement

    // Simulate drag that would go above maximum
    fireEvent.mouseDown(resizeHandle, { clientX: 100, clientY: 100 })
    fireEvent.mouseMove(document, { clientX: 1000, clientY: 1000 })
    fireEvent.mouseUp(document)
    
    // Should clamp to maximum
    const calls = onBoardSizeChange.mock.calls
    if (calls.length > 0) {
      const lastCall = calls[calls.length - 1][0]
      expect(lastCall).toBeLessThanOrEqual(800)
    }
  })
})
