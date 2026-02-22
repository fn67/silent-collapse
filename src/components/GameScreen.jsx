import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  INTRO_PHRASES,
  SCENARIOS,
  BUTTON_LABELS,
  INACTION_PHRASES,
  ACTION_PHRASES,
  MAX_INACTIONS,
  getRandomPhrase,
} from "../config/scenarios"

// Helper for async delays
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function GameScreen({
  inactionCount,
  onInaction,
  onAction,
  onCollapse,
  onSuccess,
}) {
  const [gamePhase, setGamePhase] = useState("intro")
  const [introIndex, setIntroIndex] = useState(0)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [currentPhrase, setCurrentPhrase] = useState(null)
  const [phraseVisible, setPhraseVisible] = useState(false)

  // Track the latest inactionCount for use in async handlers
  const inactionCountRef = useRef(inactionCount)
  useEffect(() => {
    inactionCountRef.current = inactionCount
  }, [inactionCount])

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

  // Handle "Do Nothing" click
  const handleDoNothing = async () => {
    // 1. Set gamePhase to "transition"
    setGamePhase("transition")

    // 2. Wait 1.5s
    await delay(1500)

    // 3. Call onInaction()
    onInaction()

    // 4. Pick random phrase from INACTION_PHRASES
    const phrase = getRandomPhrase(INACTION_PHRASES, currentPhrase)
    setCurrentPhrase(phrase)

    // 5. Fade in the phrase
    setPhraseVisible(true)

    // 6. Wait 2s (plus fade in time)
    await delay(1500 + 2000)

    // 7. Fade out the phrase
    setPhraseVisible(false)

    // 8. Wait 1.5s
    await delay(1500)

    // 9. Check if collapse (use ref for latest value after increment)
    const newInactionCount = inactionCountRef.current
    if (newInactionCount >= MAX_INACTIONS) {
      onCollapse()
    } else {
      // 10. Advance scenarioIndex and set gamePhase to "scenario"
      setScenarioIndex((prev) => prev + 1)
      setGamePhase("scenario")
    }
  }

  // Handle "Take Action" click
  const handleTakeAction = async () => {
    // 1. Set gamePhase to "transition"
    setGamePhase("transition")

    // 2. Wait 1s
    await delay(1000)

    // Call onAction (intentionally does not reduce red overlay)
    onAction()

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

      {/* Scenario Phase */}
      {gamePhase === "scenario" && (
        <motion.div
          key={`scenario-${scenarioIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <p className="scenario-text">
            {SCENARIOS[scenarioIndex].text}
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
