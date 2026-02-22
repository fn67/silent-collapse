import { motion } from "framer-motion"
import {
  COLLAPSE_TITLE,
  COLLAPSE_BODY,
  SUCCESS_TEXT,
  BUTTON_LABELS,
} from "../config/scenarios"

export default function EndScreen({ endType, onRetry, onQuit }) {
  const isCollapse = endType === "collapse"

  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      {isCollapse ? (
        <>
          <motion.h1
            className="title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            {COLLAPSE_TITLE}
          </motion.h1>

          <motion.p
            className="end-text mt-4"
            style={{ whiteSpace: "pre-line", lineHeight: "1.8" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
          >
            {COLLAPSE_BODY}
          </motion.p>
        </>
      ) : (
        <p className="end-text" style={{ whiteSpace: "pre-line" }}>
          {SUCCESS_TEXT}
        </p>
      )}

      <motion.div
        className="button-group-row mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          delay: isCollapse ? 1 : 0,
        }}
      >
        <button onClick={onRetry}>
          {BUTTON_LABELS.retry}
        </button>
        <button onClick={onQuit}>
          {BUTTON_LABELS.quit}
        </button>
      </motion.div>
    </motion.div>
  )
}
