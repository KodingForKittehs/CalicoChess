import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderWithProvider } from '../test/testUtils'
import SettingsModal from './SettingsModal'

describe('SettingsModal', () => {
  const mockOnClose = vi.fn()

  beforeEach(() => {
    mockOnClose.mockClear()
    localStorage.clear()
  })

  it('does not render when isOpen is false', () => {
    const { container } = renderWithProvider(
      <SettingsModal isOpen={false} onClose={mockOnClose} />
    )
    
    expect(container.querySelector('.settings-modal')).not.toBeInTheDocument()
  })

  it('renders when isOpen is true', () => {
    renderWithProvider(
      <SettingsModal isOpen={true} onClose={mockOnClose} />
    )
    
    expect(screen.getByText('Board Settings')).toBeInTheDocument()
    expect(screen.getByText('Square Colors')).toBeInTheDocument()
    expect(screen.getByText('Preset Themes')).toBeInTheDocument()
    expect(screen.getByText('State Management')).toBeInTheDocument()
  })

  it('closes when close button is clicked', () => {
    renderWithProvider(
      <SettingsModal isOpen={true} onClose={mockOnClose} />
    )
    
    fireEvent.click(screen.getByText('×'))
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('closes when overlay is clicked', () => {
    const { container } = renderWithProvider(
      <SettingsModal isOpen={true} onClose={mockOnClose} />
    )
    
    const overlay = container.querySelector('.settings-overlay')!
    fireEvent.click(overlay)
    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('does not close when modal content is clicked', () => {
    const { container } = renderWithProvider(
      <SettingsModal isOpen={true} onClose={mockOnClose} />
    )
    
    const modal = container.querySelector('.settings-modal')!
    fireEvent.click(modal)
    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('displays current colors', () => {
    renderWithProvider(
      <SettingsModal isOpen={true} onClose={mockOnClose} />
    )
    
    const lightInput = screen.getByLabelText('Light Squares') as HTMLInputElement
    const darkInput = screen.getByLabelText('Dark Squares') as HTMLInputElement
    
    expect(lightInput.value).toBe('#f0d9b5')
    expect(darkInput.value).toBe('#b58863')
  })

  it('updates light square color', async () => {
    renderWithProvider(
      <SettingsModal isOpen={true} onClose={mockOnClose} />
    )
    
    const lightInput = screen.getByLabelText('Light Squares') as HTMLInputElement
    fireEvent.change(lightInput, { target: { value: '#ffffff' } })
    
    await waitFor(() => {
      expect(lightInput.value).toBe('#ffffff')
    })
  })

  it('updates dark square color', async () => {
    renderWithProvider(
      <SettingsModal isOpen={true} onClose={mockOnClose} />
    )
    
    const darkInput = screen.getByLabelText('Dark Squares') as HTMLInputElement
    fireEvent.change(darkInput, { target: { value: '#000000' } })
    
    await waitFor(() => {
      expect(darkInput.value).toBe('#000000')
    })
  })

  it('applies preset theme', async () => {
    renderWithProvider(
      <SettingsModal isOpen={true} onClose={mockOnClose} />
    )
    
    // Click the Blue theme
    fireEvent.click(screen.getByTitle('Blue'))
    
    await waitFor(() => {
      const lightInput = screen.getByLabelText('Light Squares') as HTMLInputElement
      const darkInput = screen.getByLabelText('Dark Squares') as HTMLInputElement
      
      expect(lightInput.value).toBe('#dee3e6')
      expect(darkInput.value).toBe('#8ca2ad')
    })
  })

  it('shows all preset themes', () => {
    renderWithProvider(
      <SettingsModal isOpen={true} onClose={mockOnClose} />
    )
    
    expect(screen.getByTitle('Classic')).toBeInTheDocument()
    expect(screen.getByTitle('Blue')).toBeInTheDocument()
    expect(screen.getByTitle('Green')).toBeInTheDocument()
    expect(screen.getByTitle('Brown')).toBeInTheDocument()
    expect(screen.getByTitle('Purple')).toBeInTheDocument()
    expect(screen.getByTitle('Grey')).toBeInTheDocument()
  })

  it('displays state management buttons', () => {
    renderWithProvider(
      <SettingsModal isOpen={true} onClose={mockOnClose} />
    )
    
    expect(screen.getByText('Export Settings')).toBeInTheDocument()
    expect(screen.getByText('Import Settings')).toBeInTheDocument()
    expect(screen.getByText('Reset to Default')).toBeInTheDocument()
  })

  it('resets settings with confirmation', async () => {
    // Mock window.confirm before render
    const confirmSpy = vi.spyOn(window, 'confirm')
    confirmSpy.mockReturnValue(true)
    
    renderWithProvider(
      <SettingsModal isOpen={true} onClose={mockOnClose} />
    )
    
    // Change color first
    const lightInput = screen.getByLabelText('Light Squares') as HTMLInputElement
    fireEvent.change(lightInput, { target: { value: '#123456' } })
    
    await waitFor(() => {
      expect(lightInput.value).toBe('#123456')
    })
    
    // Reset
    fireEvent.click(screen.getByText('Reset to Default'))
    
    await waitFor(() => {
      expect(confirmSpy).toHaveBeenCalled()
      expect(screen.getByText('Settings reset successfully!')).toBeInTheDocument()
    })

    confirmSpy.mockRestore()
  })

  it('does not reset if user cancels confirmation', () => {
    const confirmSpy = vi.spyOn(window, 'confirm')
    confirmSpy.mockReturnValue(false)
    
    renderWithProvider(
      <SettingsModal isOpen={true} onClose={mockOnClose} />
    )
    
    fireEvent.click(screen.getByText('Reset to Default'))
    
    expect(confirmSpy).toHaveBeenCalled()
    expect(screen.queryByText('Settings reset successfully!')).not.toBeInTheDocument()

    confirmSpy.mockRestore()
  })
})
