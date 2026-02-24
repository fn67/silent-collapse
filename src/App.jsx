import { useState, useRef, useEffect } from 'react'
import './App.css'

import BackgroundParticles from './components/BackgroundParticles'
import RedOverlay from './components/RedOverlay'
import HomeScreen from './components/HomeScreen'
import AboutScreen from './components/AboutScreen'
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

  // onAbout: navigate to about screen
  const handleAbout = () => {
    setScreen("about")
  }

  // onBack: return to home from about screen
  const handleBack = () => {
    setScreen("home")
  }

  // onInaction: increment inaction count (never decreases)
  const handleInaction = () => {
    setInactionCount((prev) => prev + 1)
  }

  // onAction: decrement inaction count during recovery phase (minimum 0)
  const handleAction = () => {
    setInactionCount((prev) => Math.max(0, prev - 1))
  }

  // onCollapse: collapse is now handled inside GameScreen (recovery phase)
  // This callback exists but does nothing — GameScreen manages recovery internally
  const handleCollapse = () => {
    // Intentionally empty — recovery phase is handled inside GameScreen
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
        <HomeScreen onPlay={handlePlay} onAbout={handleAbout} />
      )}

      {screen === "about" && (
        <AboutScreen onBack={handleBack} />
      )}

      {screen === "game" && (
        <GameScreen
          inactionCount={inactionCount}
          onInaction={handleInaction}
          onAction={handleAction}
          onCollapse={handleCollapse}
          onSuccess={handleSuccess}
          musicRef={audioRef}
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
