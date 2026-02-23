import { motion } from "framer-motion"
import { SUCCESS_TEXT, BUTTON_LABELS } from "../config/scenarios"

export default function EndScreen({ onRetry, onQuit }) {
  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      <p className="end-text" style={{ whiteSpace: "pre-line" }}>
        {SUCCESS_TEXT}
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
