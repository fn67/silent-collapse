import { motion } from "framer-motion"
import { HOME_CONTENT, BUTTON_LABELS } from "../config/scenarios"

export default function HomeScreen({ onPlay, onAbout }) {
  return (
    <motion.div
      className="screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      <div className="title-wrapper">
      <h1 className="title">{HOME_CONTENT.title}</h1>
      <p className="game-subtitle">{HOME_CONTENT.subtitle}</p>
      </div>

      <p className="game-credit">{HOME_CONTENT.credit}</p>

      <p className="tagline mt-3" style={{ whiteSpace: "pre-line" }}>
        {HOME_CONTENT.tagline}
      </p>

      <p className="subtext mt-4" style={{ whiteSpace: "pre-line" }}>
        {HOME_CONTENT.subtext}
      </p>

      <div className="button-group mt-6">
        <button onClick={onPlay}>
          {BUTTON_LABELS.play}
        </button>
        <button onClick={onAbout}>
          {BUTTON_LABELS.about}
        </button>
      </div>
    </motion.div>
  )
}
