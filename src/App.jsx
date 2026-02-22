import { useState, useRef, useEffect } from 'react'
import './App.css'

import BackgroundParticles from './components/BackgroundParticles'
import RedOverlay from './components/RedOverlay'
import HomeScreen from './components/HomeScreen'
import GameScreen from './components/GameScreen'
import EndScreen from './components/EndScreen'

import { MAX_INACTIONS } from './config/scenarios'

function App() {
  const [screen, setScreen] = useState("home")
  const [inactionCount, setInactionCount] = useState(0)
  const [endType, setEndType] = useState(null)
  const audioRef = useRef(null)

  // Initialize audio once on mount
  useEffect(() => {
    audioRef.current = new Audio("/music.mp3")
    audioRef.current.loop = true
    audioRef.current.volume = 0.5
  }, [])

  // onPlay: start audio and begin game
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
    setScreen("game")
  }

  // onInaction: increment inaction count (never decreases)
  const handleInaction = () => {
    setInactionCount((prev) => prev + 1)
  }

  // onAction: no state change in App (red overlay does NOT reduce)
  const handleAction = () => {
    // Intentionally empty - action does not affect inactionCount
  }

  // onCollapse: game ends in collapse
  const handleCollapse = () => {
    setEndType("collapse")
    setScreen("end")
  }

  // onSuccess: game ends in success
  const handleSuccess = () => {
    setEndType("success")
    setScreen("end")
  }

  // onRetry: reset inactionCount, go back to game, music keeps playing
  const handleRetry = () => {
    setInactionCount(0)
    setScreen("game")
    setEndType(null)
  }

  // onQuit: reset everything, go back to home
  const handleQuit = () => {
    setScreen("home")
    setInactionCount(0)
    setEndType(null)
  }

  return (
    <>
      {/* Always rendered, never unmounts */}
      <BackgroundParticles />
      <RedOverlay
        inactionCount={inactionCount}
        maxInactions={MAX_INACTIONS}
      />

      {/* Conditional screen rendering */}
      {screen === "home" && (
        <HomeScreen onPlay={handlePlay} />
      )}

      {screen === "game" && (
        <GameScreen
          inactionCount={inactionCount}
          onInaction={handleInaction}
          onAction={handleAction}
          onCollapse={handleCollapse}
          onSuccess={handleSuccess}
        />
      )}

      {screen === "end" && (
        <EndScreen
          endType={endType}
          onRetry={handleRetry}
          onQuit={handleQuit}
        />
      )}
    </>
  )
}

export default App
