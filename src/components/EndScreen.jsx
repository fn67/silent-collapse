import { motion } from "framer-motion"
import { COLLAPSE_TEXT, SUCCESS_TEXT, BUTTON_LABELS } from "../config/scenarios"

export default function EndScreen({ endType, onRetry, onQuit }) {
  const displayText = endType === "collapse" ? COLLAPSE_TEXT : SUCCESS_TEXT

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      <p className="end-text" style={{ whiteSpace: "pre-line" }}>
        {displayText}
      </p>

      <div className="button-group-row mt-6">
        <button onClick={onRetry}>
          {BUTTON_LABELS.retry}
        </button>
        <button onClick={onQuit}>
          {BUTTON_LABELS.quit}
        </button>
      </div>
    </motion.div>
  )
}
