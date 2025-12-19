import './SettingsModal.css'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  lightSquareColor: string
  darkSquareColor: string
  onLightSquareColorChange: (color: string) => void
  onDarkSquareColorChange: (color: string) => void
}

function SettingsModal({
  isOpen,
  onClose,
  lightSquareColor,
  darkSquareColor,
  onLightSquareColorChange,
  onDarkSquareColorChange
}: SettingsModalProps) {
  if (!isOpen) return null

  const presetThemes = [
    { name: 'Classic', light: '#f0d9b5', dark: '#b58863' },
    { name: 'Blue', light: '#dee3e6', dark: '#8ca2ad' },
    { name: 'Green', light: '#ffffdd', dark: '#86a666' },
    { name: 'Brown', light: '#f0d9b5', dark: '#946f51' },
    { name: 'Purple', light: '#e3c1d8', dark: '#9b5d87' },
    { name: 'Grey', light: '#c0c0c0', dark: '#808080' }
  ]

  const handleThemeClick = (light: string, dark: string) => {
    onLightSquareColorChange(light)
    onDarkSquareColorChange(dark)
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="settings-overlay" onClick={handleOverlayClick}>
      <div className="settings-modal">
        <div className="settings-header">
          <h2>Board Settings</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="settings-content">
          <div className="color-section">
            <h3>Square Colors</h3>
            
            <div className="color-picker-group">
              <div className="color-picker">
                <label htmlFor="light-square-color">Light Squares</label>
                <div className="color-input-wrapper">
                  <input
                    type="color"
                    id="light-square-color"
                    value={lightSquareColor}
                    onChange={(e) => onLightSquareColorChange(e.target.value)}
                  />
                  <span className="color-value">{lightSquareColor}</span>
                </div>
              </div>

              <div className="color-picker">
                <label htmlFor="dark-square-color">Dark Squares</label>
                <div className="color-input-wrapper">
                  <input
                    type="color"
                    id="dark-square-color"
                    value={darkSquareColor}
                    onChange={(e) => onDarkSquareColorChange(e.target.value)}
                  />
                  <span className="color-value">{darkSquareColor}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="preset-section">
            <h3>Preset Themes</h3>
            <div className="preset-themes">
              {presetThemes.map((theme) => (
                <button
                  key={theme.name}
                  className="preset-theme"
                  onClick={() => handleThemeClick(theme.light, theme.dark)}
                  title={theme.name}
                >
                  <div className="theme-preview">
                    <div 
                      className="theme-square" 
                      style={{ backgroundColor: theme.light }}
                    />
                    <div 
                      className="theme-square" 
                      style={{ backgroundColor: theme.dark }}
                    />
                  </div>
                  <span className="theme-name">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
