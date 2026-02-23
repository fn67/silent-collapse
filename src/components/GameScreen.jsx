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
  RECOVERY_SUCCESS,
  getRandomPhrase,
} from "../config/scenarios"

// Helper for async delays
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function GameScreen({
  inactionCount,
  onInaction,
  onAction,
  onSuccess,
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
  }, [gamePhase, introIndex])

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

  // Handle "REBUILD THE UNIVERSE" button click
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
              {INTRO_PHRASES[introIndex]}
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
          style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        >
          {/* Pillar Logo */}
          {currentPillar && (
            <motion.img
              src={PILLARS[currentPillar].logo}
              alt={PILLARS[currentPillar].name}
              className="pillar-logo"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 48, height: 48, marginBottom: "2rem" }}
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
              fontSize: "0.75rem",
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
              style={{ width: 48, height: 48, marginBottom: "2rem" }}
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
              key={currentPhrase}
              className="phrase-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              {currentPhrase}
            </motion.p>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}
