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

  // Initialize audio and attempt autoplay on mount
  useEffect(() => {
    const audio = new Audio("/music.mp3")
    audio.loop = true
    audio.volume = 0.5
    audioRef.current = audio

    // Attempt to play immediately
    const playPromise = audio.play()

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was blocked - add one-time click listener
        const startMusic = () => {
          audio.play()
          document.removeEventListener("click", startMusic)
        }
        document.addEventListener("click", startMusic)
      })
    }
  }, [])

  // onPlay: begin game (music already playing or starts on this click)
  const handlePlay = () => {
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
