import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { renderWithProvider } from '../test/testUtils'
import Menu from './Menu'

describe('Menu', () => {
  it('renders all buttons', () => {
    renderWithProvider(<Menu />)
    
    expect(screen.getByText('New Game')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByText('Load')).toBeInTheDocument()
    expect(screen.getByText('Undo')).toBeInTheDocument()
    expect(screen.getByText('Redo')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })

  it('calls onNewGame when New Game button is clicked', () => {
    const mockOnNewGame = vi.fn()
    renderWithProvider(<Menu onNewGame={mockOnNewGame} />)
    
    fireEvent.click(screen.getByText('New Game'))
    expect(mockOnNewGame).toHaveBeenCalledTimes(1)
  })

  it('calls onSave when Save button is clicked', () => {
    const mockOnSave = vi.fn()
    renderWithProvider(<Menu onSave={mockOnSave} />)
    
    fireEvent.click(screen.getByText('Save'))
    expect(mockOnSave).toHaveBeenCalledTimes(1)
  })

  it('calls onLoad when Load button is clicked', () => {
    const mockOnLoad = vi.fn()
    renderWithProvider(<Menu onLoad={mockOnLoad} />)
    
    fireEvent.click(screen.getByText('Load'))
    expect(mockOnLoad).toHaveBeenCalledTimes(1)
  })

  it('calls onUndo when Undo button is clicked', () => {
    const mockOnUndo = vi.fn()
    renderWithProvider(<Menu onUndo={mockOnUndo} />)
    
    fireEvent.click(screen.getByText('Undo'))
    expect(mockOnUndo).toHaveBeenCalledTimes(1)
  })

  it('calls onRedo when Redo button is clicked', () => {
    const mockOnRedo = vi.fn()
    renderWithProvider(<Menu onRedo={mockOnRedo} />)
    
    fireEvent.click(screen.getByText('Redo'))
    expect(mockOnRedo).toHaveBeenCalledTimes(1)
  })

  it('calls onSettings when Settings button is clicked', () => {
    const mockOnSettings = vi.fn()
    renderWithProvider(<Menu onSettings={mockOnSettings} />)
    
    fireEvent.click(screen.getByText('Settings'))
    expect(mockOnSettings).toHaveBeenCalledTimes(1)
  })

  it('does not crash when handlers are not provided', () => {
    renderWithProvider(<Menu />)
    
    fireEvent.click(screen.getByText('New Game'))
    fireEvent.click(screen.getByText('Save'))
    fireEvent.click(screen.getByText('Load'))
    // Should not throw any errors
  })
})
