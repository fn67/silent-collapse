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
      <p className="end-text" style={{ whiteSpace: "pre-line", fontSize:"1.3rem" }}>
        {SUCCESS_TEXT}
      </p>

        <p className="end-body" style={{marginTop:"2rem", opacity:"0.5"}}>That someone is you. Every time this experience asked you to choose - you chose to act. That instinct to speak up, to show up, to refuse to let things fade quietly - that is the soul of Club 18. You didn't just play this. You lived it. Now you know us.</p>
    
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
