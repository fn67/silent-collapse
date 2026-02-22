import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { INTRO_PHRASES } from "../config/scenarios"

export default function GameScreen({
  inactionCount,
  onInaction,
  onAction,
  onCollapse,
  onSuccess,
}) {
  const [gamePhase, setGamePhase] = useState("intro")
  const [introIndex, setIntroIndex] = useState(0)
  const [phraseVisible, setPhraseVisible] = useState(false)

  // Intro sequence effect
  useEffect(() => {
    if (gamePhase !== "intro") return

    // Start showing the current phrase
    setPhraseVisible(true)

    // After fade in (1.5s) + hold (1s), start fade out
    const holdTimer = setTimeout(() => {
      setPhraseVisible(false)
    }, 2500) // 1.5s fade in + 1s hold

    // After fade out (1.5s), move to next phrase or end intro
    const nextTimer = setTimeout(() => {
      if (introIndex < INTRO_PHRASES.length - 1) {
        setIntroIndex((prev) => prev + 1)
      } else {
        setGamePhase("scenario")
      }
    }, 4000) // 1.5s fade in + 1s hold + 1.5s fade out

    return () => {
      clearTimeout(holdTimer)
      clearTimeout(nextTimer)
    }
  }, [gamePhase, introIndex])

  return (
    <div className="screen">
      {/* Intro Phase */}
      {gamePhase === "intro" && (
        <AnimatePresence mode="wait">
          {phraseVisible && (
            <motion.p
              key={introIndex}
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

      {/* Scenario Phase - Placeholder for now */}
      {gamePhase === "scenario" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <p className="scenario-text">SCENARIO AREA</p>
        </motion.div>
      )}
    </div>
  )
}
