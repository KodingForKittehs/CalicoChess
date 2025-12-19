import { useState } from 'react'
import Chessboard from './components/Chessboard'
import Menu from './components/Menu'
import SettingsModal from './components/SettingsModal'
import './App.css'

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [lightSquareColor, setLightSquareColor] = useState('#f0d9b5')
  const [darkSquareColor, setDarkSquareColor] = useState('#b58863')

  const handleNewGame = () => {
    console.log('New Game clicked')
    // TODO: Implement new game logic
  }

  const handleSave = () => {
    console.log('Save clicked')
    // TODO: Implement save game logic
  }

  const handleLoad = () => {
    console.log('Load clicked')
    // TODO: Implement load game logic
  }

  const handleUndo = () => {
    console.log('Undo clicked')
    // TODO: Implement undo logic
  }

  const handleRedo = () => {
    console.log('Redo clicked')
    // TODO: Implement redo logic
  }

  const handleSettings = () => {
    setIsSettingsOpen(true)
  }

  const handleCloseSettings = () => {
    setIsSettingsOpen(false)
  }

  return (
    <div className="app">
      <div className="app-container">
        <Menu
          onNewGame={handleNewGame}
          onSave={handleSave}
          onLoad={handleLoad}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onSettings={handleSettings}
        />
        <Chessboard 
          lightSquareColor={lightSquareColor}
          darkSquareColor={darkSquareColor}
        />
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={handleCloseSettings}
          lightSquareColor={lightSquareColor}
          darkSquareColor={darkSquareColor}
          onLightSquareColorChange={setLightSquareColor}
          onDarkSquareColorChange={setDarkSquareColor}
        />
      </div>
    </div>
  )
}

export default App
