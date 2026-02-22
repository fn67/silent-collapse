import { motion } from "framer-motion"

export default function AboutScreen({ onBack }) {
  return (
    <motion.div
      className="screen about-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      <button className="back-button" onClick={onBack}>
        ← BACK
      </button>

      
      <div className="about-content">
  <section className="about-section">
    <h2 className="about-title">HOW TO PLAY</h2>
    <p className="about-description">You will be placed inside a universe - a living system of people, decisions, and moments.</p>
    <p className="about-description">One by one, scenarios will appear. Real situations. The kind that happen in every team, every club, every room where people work together.</p>
    <p className="about-description">For each one, you have two choices.</p>
    <p className="about-description"><strong>Take Action</strong> - you intervene. You speak. You show up.</p>
    <p className="about-description"><strong>Do Nothing</strong> - you stay silent. It feels easier. It usually does.</p>
    <p className="about-description">Every time you choose silence, the universe decays a little. You'll see it - a slow crimson creeping in. It doesn't announce itself. It never does.</p>
    <p className="about-description">Five silences and the universe collapses.</p>
    <p className="about-description">But taking action doesn't undo the damage already done. It only prevents more. Because that's how it works in real life too.</p>
    <p className="about-description">This is not a game about winning. It is a reminder about responsibility. About what we owe each other in the quiet moments nobody is watching.</p>
    <p className="about-description">Play it once. Then ask yourself - how many of those scenarios felt familiar?</p>
  </section>

  <section className="about-section">
    <h2 className="about-title">WHY WE BUILT THIS</h2>
    <p className="about-description">When we were asked to show what makes Club 18 unique, we didn't want to just say it. We wanted you to feel it.</p>
    <p className="about-description">Silent Collapse is an interactive experience built on a simple truth: universes don't collapse loudly. They fade - one small silence at a time. One ignored voice. One unaddressed moment. One choice to do nothing.</p>
    <p className="about-description">This game is a reminder. To us, and to everyone who plays it - that we are all part of something larger than ourselves, and that our inactions have weight.</p>
    <p className="about-description">In Club 18, we choose to act. Always.</p>
    <p className="about-description">This is what that choice looks like.</p>
  </section>

  <section className="about-section">
    <h2 className="about-title">ABOUT CLUB 18</h2>
    <p className="about-description">We exist for people - the quiet ones, the uncertain ones, the ones still finding their place. In our universe, every voice matters and everyone is heard.</p>
    <p className="about-description">We believe that silence has a cost. So we choose, always, to act.</p>
    <p className="about-description">No one fades quietly here.</p>
    <div className="club-photo-wrapper">
      <img
        src="/pic.jpg"
        alt="Club 18 Members"
        className="club-photo"
      />
    </div>
  
  </section>
</div>
    </motion.div>
  )
}
