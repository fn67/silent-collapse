import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  INTRO_PHRASES,
  SCENARIOS,
  BUTTON_LABELS,
  INACTION_PHRASES,
  ACTION_PHRASES,
  RECOVERY_ACTION_PHRASES,
  MAX_INACTIONS,
  PILLARS,
  COLLAPSE_TITLE,
  COLLAPSE_BODY,
  RECOVERY_PROMPT,
  RECOVERY_SUCCESS,
  getRandomPhrase,
} from "../config/scenarios"

// Helper for async delays
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Helper for smooth volume transitions
const fadeVolume = (audio, targetVolume, duration) => {
  return new Promise((resolve) => {
    const steps = 20
    const stepTime = duration / steps
    const volumeStep = (targetVolume - audio.volume) / steps
    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      audio.volume = Math.min(1, Math.max(0, audio.volume + volumeStep))
      if (currentStep >= steps || Math.abs(audio.volume - targetVolume) < 0.01) {
        audio.volume = targetVolume
        clearInterval(interval)
        resolve()
      }
    }, stepTime)
  })
}

// Voiceover playback with music ducking
const playVoiceover = (audioPath, musicRef, currentVoiceoverRef) => {
  return new Promise((resolve) => {
    // Stop any previous voiceover
    if (currentVoiceoverRef.current) {
      currentVoiceoverRef.current.pause()
      currentVoiceoverRef.current.currentTime = 0
      currentVoiceoverRef.current = null
    }

    // Create new voiceover audio
    const voiceover = new Audio(audioPath)
    voiceover.volume = 0.8
    currentVoiceoverRef.current = voiceover

    // Duck music volume
    if (musicRef?.current) {
      fadeVolume(musicRef.current, 0.15, 300)
    }

    // Play voiceover
    voiceover.play().catch(() => {
      // If playback fails, resolve immediately
      resolve()
    })

    // When voiceover ends, restore music and resolve
    voiceover.onended = () => {
      if (musicRef?.current) {
        fadeVolume(musicRef.current, 0.5, 500)
      }
      currentVoiceoverRef.current = null
      resolve()
    }

    // Also handle error case
    voiceover.onerror = () => {
      if (musicRef?.current) {
        fadeVolume(musicRef.current, 0.5, 500)
      }
      currentVoiceoverRef.current = null
      resolve()
    }
  })
}

export default function GameScreen({
  inactionCount,
  onInaction,
  onAction,
  onSuccess,
  musicRef,
}) {
  // Game phase: "intro" | "scenario" | "transition" | "collapse" | "recovery-scenario"
  const [gamePhase, setGamePhase] = useState("intro")
  const [introIndex, setIntroIndex] = useState(0)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [currentPhrase, setCurrentPhrase] = useState(null)
  const [phraseVisible, setPhraseVisible] = useState(false)

  // Recovery phase state
  // missedScenarios: persistent array of scenario objects user chose "Do Nothing" on
  // This array only shrinks when scenarios are resolved with "Take Action" in recovery
  // It only grows when "Do Nothing" is clicked during normal play
  const [missedScenarios, setMissedScenarios] = useState([])

  // recoveryIndex: current position in missedScenarios during recovery
  // Cycles through missedScenarios until all are resolved
  const [recoveryIndex, setRecoveryIndex] = useState(0)

  const [currentPillar, setCurrentPillar] = useState(null)

  // Track the latest inactionCount for use in async handlers
  const inactionCountRef = useRef(inactionCount)
  useEffect(() => {
    inactionCountRef.current = inactionCount
  }, [inactionCount])

  // Track current voiceover to stop it if a new one starts
  const currentVoiceoverRef = useRef(null)

  // Get current recovery scenario
  const currentRecoveryScenario = missedScenarios[recoveryIndex]

  // Update currentPillar when scenario changes (normal play)
  useEffect(() => {
    if (gamePhase === "scenario" && SCENARIOS[scenarioIndex]) {
      setCurrentPillar(SCENARIOS[scenarioIndex].pillar)
    }
  }, [gamePhase, scenarioIndex])

  // Update currentPillar when recovery scenario changes
  useEffect(() => {
    if (gamePhase === "recovery-scenario" && currentRecoveryScenario) {
      setCurrentPillar(currentRecoveryScenario.pillar)
    }
  }, [gamePhase, currentRecoveryScenario])

  // Intro sequence effect
  useEffect(() => {
    if (gamePhase !== "intro") return

    setPhraseVisible(true)

    // Play voiceover for intro phrase at the same time as fade in
    const introPhrase = INTRO_PHRASES[introIndex]
    if (introPhrase?.audio) {
      playVoiceover(introPhrase.audio, musicRef, currentVoiceoverRef)
    }

    const holdTimer = setTimeout(() => {
      setPhraseVisible(false)
    }, 2500)

    const nextTimer = setTimeout(() => {
      if (introIndex < INTRO_PHRASES.length - 1) {
        setIntroIndex((prev) => prev + 1)
      } else {
        setGamePhase("scenario")
      }
    }, 4000)

    return () => {
      clearTimeout(holdTimer)
      clearTimeout(nextTimer)
    }
  }, [gamePhase, introIndex, musicRef])

  // Play voiceover for RECOVERY_PROMPT when collapse phase starts
  // useEffect(() => {
  //   if (gamePhase === "collapse" && RECOVERY_PROMPT?.audio) {
  //     playVoiceover(RECOVERY_PROMPT.audio, musicRef, currentVoiceoverRef)
  //   }
  // }, [gamePhase, musicRef])

  // Handle "Do Nothing" click during NORMAL PLAY
  const handleDoNothing = async () => {
    setGamePhase("transition")
    await delay(1500)

    // Increment inactionCount (only during normal play)
    onInaction()

    // Add current scenario to missedScenarios
    const currentScenario = SCENARIOS[scenarioIndex]
    setMissedScenarios((prev) => [...prev, currentScenario])

    const phrase = getRandomPhrase(INACTION_PHRASES, currentPhrase)
    setCurrentPhrase(phrase)
    setPhraseVisible(true)

    // Play voiceover at the same time as fade in
    if (phrase?.audio) {
      playVoiceover(phrase.audio, musicRef, currentVoiceoverRef)
    }

    await delay(1500 + 2000)
    setPhraseVisible(false)
    await delay(1500)

    const newInactionCount = inactionCountRef.current
    if (newInactionCount >= MAX_INACTIONS) {
      // Trigger collapse → recovery phase
      setGamePhase("collapse")
    } else {
      setScenarioIndex((prev) => prev + 1)
      setGamePhase("scenario")
    }
  }

  // Handle "Take Action" click during NORMAL PLAY
  const handleTakeAction = async () => {
    setGamePhase("transition")
    await delay(1000)

    // Note: onAction not called during normal play - red overlay doesn't reduce

    const phrase = getRandomPhrase(ACTION_PHRASES, currentPhrase)
    setCurrentPhrase(phrase)
    setPhraseVisible(true)

    // Play voiceover at the same time as fade in
    if (phrase?.audio) {
      playVoiceover(phrase.audio, musicRef, currentVoiceoverRef)
    }

    await delay(1500 + 2000)
    setPhraseVisible(false)
    await delay(1500)

    if (scenarioIndex + 1 >= SCENARIOS.length) {
      onSuccess()
    } else {
      setScenarioIndex((prev) => prev + 1)
      setGamePhase("scenario")
    }
  }

  // Handle "RESTORE THE UNIVERSE" button click
  const handleStartRecovery = () => {
    setRecoveryIndex(0)
    setGamePhase("recovery-scenario")
  }

  // Handle "Take Action" click during RECOVERY PHASE
  const handleRecoveryTakeAction = async () => {
    setGamePhase("transition")
    await delay(1000)

    // Decrement inactionCount (only action that reduces the overlay)
    onAction()

    const phrase = getRandomPhrase(RECOVERY_ACTION_PHRASES, currentPhrase)
    setCurrentPhrase(phrase)
    setPhraseVisible(true)

    // Play voiceover at the same time as fade in
    if (phrase?.audio) {
      playVoiceover(phrase.audio, musicRef, currentVoiceoverRef)
    }

    await delay(1500 + 2000)
    setPhraseVisible(false)
    await delay(1500)

    // Remove resolved scenario from missedScenarios
    const resolvedId = currentRecoveryScenario.id
    const updatedMissedScenarios = missedScenarios.filter(s => s.id !== resolvedId)
    setMissedScenarios(updatedMissedScenarios)

    // Check if all scenarios resolved
    if (updatedMissedScenarios.length === 0) {
      // ALL scenarios resolved - show full recovery message
      setCurrentPhrase(RECOVERY_SUCCESS)
      setPhraseVisible(true)

      // Play RECOVERY_SUCCESS voiceover
      if (RECOVERY_SUCCESS?.audio) {
        playVoiceover(RECOVERY_SUCCESS.audio, musicRef, currentVoiceoverRef)
      }

      await delay(1500 + 2000)
      setPhraseVisible(false)
      await delay(1500)

      // Resume normal play
      if (scenarioIndex + 1 >= SCENARIOS.length) {
        onSuccess()
      } else {
        setScenarioIndex((prev) => prev + 1)
        setGamePhase("scenario")
      }
    } else {
      // More scenarios to resolve - adjust index if needed and continue
      // After removing an item, if recoveryIndex >= new length, wrap to 0
      if (recoveryIndex >= updatedMissedScenarios.length) {
        setRecoveryIndex(0)
      }
      // Otherwise keep the same index (next item shifted into current position)
      setGamePhase("recovery-scenario")
    }
  }

  // Handle "Do Nothing" click during RECOVERY PHASE
  const handleRecoveryDoNothing = async () => {
    setGamePhase("transition")
    await delay(1500)

    // DO NOT increment inactionCount during recovery
    // The scenario stays in missedScenarios, it will come around again

    const phrase = getRandomPhrase(INACTION_PHRASES, currentPhrase)
    setCurrentPhrase(phrase)
    setPhraseVisible(true)

    // Play voiceover at the same time as fade in
    if (phrase?.audio) {
      playVoiceover(phrase.audio, musicRef, currentVoiceoverRef)
    }

    await delay(1500 + 2000)
    setPhraseVisible(false)
    await delay(1500)

    // Advance to next scenario in the loop (with wrap-around)
    const nextIndex = recoveryIndex + 1
    if (nextIndex >= missedScenarios.length) {
      setRecoveryIndex(0) // Loop back to start
    } else {
      setRecoveryIndex(nextIndex)
    }
    setGamePhase("recovery-scenario")
  }

  // Get current scenario for display (normal play)
  const currentScenario = SCENARIOS[scenarioIndex]

  return (
    <div className="screen">
      {/* Intro Phase */}
      {gamePhase === "intro" && (
        <AnimatePresence mode="wait">
          {phraseVisible && (
            <motion.p
              key={`intro-${introIndex}`}
              className="phrase-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {INTRO_PHRASES[introIndex].text}
            </motion.p>
          )}
        </AnimatePresence>
      )}

      {/* Scenario Phase - Normal Play */}
      {gamePhase === "scenario" && currentScenario && (
        <motion.div
          key={`scenario-${scenarioIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" , }}
        >
          {/* Pillar Logo */}
          {currentPillar && (
            <motion.img
              src={PILLARS[currentPillar].logo}
              alt={PILLARS[currentPillar].name}
              className="pillar-logo"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 96, height: 96, marginBottom: "3rem" }}
            />
          )}

          <p className="scenario-text">
            {currentScenario.text}
          </p>

          <div className="button-group mt-6">
            <button
              className="btn-action"
              onClick={handleTakeAction}
            >
              {BUTTON_LABELS.takeAction}
            </button>
            <button
              className="btn-passive"
              onClick={handleDoNothing}
            >
              {BUTTON_LABELS.doNothing}
            </button>
          </div>
        </motion.div>
      )}

      {/* Collapse Phase - Show collapse message and recover button */}
      {gamePhase === "collapse" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          <h1 className="title" style={{ fontSize: "2rem", marginBottom: "2rem" }}>
            {COLLAPSE_TITLE}
          </h1>

          <p
            className="end-text"
            style={{ whiteSpace: "pre-line", lineHeight: "1.8", marginBottom: "3rem" }}
          >
            {COLLAPSE_BODY}
          </p>

          <button onClick={handleStartRecovery}>
            {BUTTON_LABELS.recover}
          </button>
        </motion.div>
      )}

      {/* Recovery Scenario Phase */}
      {gamePhase === "recovery-scenario" && currentRecoveryScenario && (
        <motion.div
          key={`recovery-${currentRecoveryScenario.id}-${recoveryIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          {/* Recovery Mode Label */}
          <p
            className="recovery-label"
            style={{
              fontSize: "1rem",
              letterSpacing: "0.2em",
              opacity: 0.5,
              marginBottom: "2rem",
            }}
          >
            RECOVERY MODE
          </p>

          {/* Pillar Logo */}
          {currentPillar && (
            <motion.img
              src={PILLARS[currentPillar].logo}
              alt={PILLARS[currentPillar].name}
              className="pillar-logo"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 96, height: 96, marginBottom: "2rem" }}
            />
          )}

          <p className="scenario-text">
            {currentRecoveryScenario.text}
          </p>

          <div className="button-group mt-6">
            <button
              className="btn-action"
              onClick={handleRecoveryTakeAction}
            >
              {BUTTON_LABELS.takeAction}
            </button>
            <button
              className="btn-passive"
              onClick={handleRecoveryDoNothing}
            >
              {BUTTON_LABELS.doNothing}
            </button>
          </div>
        </motion.div>
      )}

      {/* Transition Phase - Show phrase feedback */}
      {gamePhase === "transition" && (
        <AnimatePresence mode="wait">
          {phraseVisible && currentPhrase && (
            <motion.p
              key={currentPhrase.text}
              className="phrase-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {currentPhrase.text}
            </motion.p>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}