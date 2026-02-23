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
  // Game phase: "intro" | "scenario" | "transition" | "collapse" | "recovery" | "recovery-scenario"
  const [gamePhase, setGamePhase] = useState("intro")
  const [introIndex, setIntroIndex] = useState(0)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [currentPhrase, setCurrentPhrase] = useState(null)
  const [phraseVisible, setPhraseVisible] = useState(false)

  // Recovery phase state
  const [missedScenarios, setMissedScenarios] = useState([])
  const [recoveryIndex, setRecoveryIndex] = useState(0)
  const [currentPillar, setCurrentPillar] = useState(null)

  // Track the latest inactionCount for use in async handlers
  const inactionCountRef = useRef(inactionCount)
  useEffect(() => {
    inactionCountRef.current = inactionCount
  }, [inactionCount])

  // Update currentPillar when scenario changes
  useEffect(() => {
    if (gamePhase === "scenario" && SCENARIOS[scenarioIndex]) {
      setCurrentPillar(SCENARIOS[scenarioIndex].pillar)
    }
  }, [gamePhase, scenarioIndex])

  // Update currentPillar when recovery scenario changes
  useEffect(() => {
    if (gamePhase === "recovery-scenario" && missedScenarios[recoveryIndex]) {
      setCurrentPillar(missedScenarios[recoveryIndex].pillar)
    }
  }, [gamePhase, recoveryIndex, missedScenarios])

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
    // 1. Set gamePhase to "transition"
    setGamePhase("transition")

    // 2. Wait 1.5s
    await delay(1500)

    // 3. Call onInaction()
    onInaction()

    // 4. Add current scenario to missedScenarios
    const currentScenario = SCENARIOS[scenarioIndex]
    setMissedScenarios((prev) => [...prev, currentScenario])

    // 5. Pick random phrase from INACTION_PHRASES
    const phrase = getRandomPhrase(INACTION_PHRASES, currentPhrase)
    setCurrentPhrase(phrase)

    // 6. Fade in the phrase
    setPhraseVisible(true)

    // 7. Wait 2s (plus fade in time)
    await delay(1500 + 2000)

    // 8. Fade out the phrase
    setPhraseVisible(false)

    // 9. Wait 1.5s
    await delay(1500)

    // 10. Check if collapse (use ref for latest value after increment)
    const newInactionCount = inactionCountRef.current
    if (newInactionCount >= MAX_INACTIONS) {
      // Trigger collapse → recovery phase (NOT EndScreen)
      setGamePhase("collapse")
    } else {
      // Advance scenarioIndex and set gamePhase to "scenario"
      setScenarioIndex((prev) => prev + 1)
      setGamePhase("scenario")
    }
  }

  // Handle "Take Action" click during NORMAL PLAY
  const handleTakeAction = async () => {
    // 1. Set gamePhase to "transition"
    setGamePhase("transition")

    // 2. Wait 1s
    await delay(1000)

    // Note: onAction does nothing during normal play (red overlay doesn't reduce)
    // We don't call onAction() here - it's only for recovery phase

    // 3. Pick random phrase from ACTION_PHRASES
    const phrase = getRandomPhrase(ACTION_PHRASES, currentPhrase)
    setCurrentPhrase(phrase)

    // 4. Fade in the phrase
    setPhraseVisible(true)

    // 5. Wait 2s (plus fade in time)
    await delay(1500 + 2000)

    // 6. Fade out the phrase
    setPhraseVisible(false)

    // 7. Wait 1s
    await delay(1500)

    // 8. Check if success
    if (scenarioIndex + 1 >= SCENARIOS.length) {
      onSuccess()
    } else {
      // 9. Advance scenarioIndex and set gamePhase to "scenario"
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
    // 1. Set gamePhase to "transition"
    setGamePhase("transition")

    // 2. Wait 1s
    await delay(1000)

    // 3. Call onAction() → decrements inactionCount by 1 in App
    onAction()

    // 4. Pick random phrase from RECOVERY_ACTION_PHRASES
    const phrase = getRandomPhrase(RECOVERY_ACTION_PHRASES, currentPhrase)
    setCurrentPhrase(phrase)

    // 5. Fade in the phrase
    setPhraseVisible(true)

    // 6. Wait 2s (plus fade in time)
    await delay(1500 + 2000)

    // 7. Fade out the phrase
    setPhraseVisible(false)

    // 8. Wait 1s
    await delay(1500)

    // 9. Remove this scenario from missedScenarios
    const resolvedScenarioId = missedScenarios[recoveryIndex].id
    const updatedMissedScenarios = missedScenarios.filter(
      (s) => s.id !== resolvedScenarioId
    )
    setMissedScenarios(updatedMissedScenarios)

    // 10. Check if all missed scenarios resolved
    if (updatedMissedScenarios.length === 0) {
      // All resolved - show success message and resume normal play
      setCurrentPhrase(RECOVERY_SUCCESS)
      setPhraseVisible(true)

      await delay(1500 + 2000)

      setPhraseVisible(false)

      await delay(1500)

      // Resume normal play from where we left off
      // Advance to next scenario since we were on scenarioIndex when collapse happened
      if (scenarioIndex + 1 >= SCENARIOS.length) {
        onSuccess()
      } else {
        setScenarioIndex((prev) => prev + 1)
        setGamePhase("scenario")
      }
    } else {
      // More scenarios to resolve - show next one
      // Since we removed the current one, recoveryIndex now points to next (or we keep it at 0 if needed)
      setRecoveryIndex(0) // Always start from beginning of remaining list
      setGamePhase("recovery-scenario")
    }
  }

  // Handle "Do Nothing" click during RECOVERY PHASE
  const handleRecoveryDoNothing = async () => {
    // 1. Set gamePhase to "transition"
    setGamePhase("transition")

    // 2. Wait 1.5s
    await delay(1500)

    // 3. Call onInaction() → increments inactionCount by 1
    onInaction()

    // 4. Keep this scenario in missedScenarios (not resolved)

    // 5. Pick random phrase from INACTION_PHRASES
    const phrase = getRandomPhrase(INACTION_PHRASES, currentPhrase)
    setCurrentPhrase(phrase)

    // 6. Fade in the phrase
    setPhraseVisible(true)

    // 7. Wait 2s (plus fade in time)
    await delay(1500 + 2000)

    // 8. Fade out the phrase
    setPhraseVisible(false)

    // 9. Wait 1.5s
    await delay(1500)

    // 10. Check if collapse again
    const newInactionCount = inactionCountRef.current
    if (newInactionCount >= MAX_INACTIONS) {
      // Collapse again → show collapse screen again
      setGamePhase("collapse")
    } else {
      // Advance to next missed scenario
      const nextIndex = recoveryIndex + 1
      if (nextIndex >= missedScenarios.length) {
        // Loop back to first missed scenario
        setRecoveryIndex(0)
      } else {
        setRecoveryIndex(nextIndex)
      }
      setGamePhase("recovery-scenario")
    }
  }

  // Get current scenario for display
  const currentScenario = SCENARIOS[scenarioIndex]
  const currentRecoveryScenario = missedScenarios[recoveryIndex]

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
          key={`recovery-${recoveryIndex}-${currentRecoveryScenario.id}`}
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
