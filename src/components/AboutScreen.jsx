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
      <p className="about-description"><strong style={{textDecoration: 'underline'}}>Take Action</strong> - you intervene. You speak. You show up.</p>
      <p className="about-description"><strong style={{textDecoration: 'underline'}}>Do Nothing</strong> - you stay silent. It feels easier. It usually does.</p>
      <p className="about-description">This is not a game about winning. There is no score. No timer. No finish line. It is an experience about what our choices - and our silences - do to the world around us.</p>
      <p className="about-description">Every time you choose silence, the universe decays a little. You will see it - a red slowly creeping in. Red is not just a color here. It is the weight of every ignored voice, every missed moment, every choice to look away. It is what a club looks like when it stops showing up for itself.</p>
      <p className="about-description">Five silences and the universe collapses.</p>
      <p className="about-description">But taking action going forward does not undo the silence that already happened. The red does not reduce. The damage stays. What was broken in silence stays broken - until you go back.</p>
      <p className="about-description">When the universe collapses - and it will, if enough silences accumulate - it is not over. But recovery is not free.</p>
      <p className="about-description">You will enter recovery mode. Every moment you chose silence will come back, one by one. You will have to face them again and choose differently. As you do, the red fades. Slowly. One resolved silence at a time.</p>
      <p className="about-description">But choose silence again during recovery and the red grows back. The universe can collapse again. It will keep collapsing until you confront everything you ignored. Not most of it. All of it.</p>
      <p className="about-description">This is not a metaphor. Silence accumulates. Recovery requires confrontation. Thriving only happens when we choose to act - every time, for each other.</p>
    </section>

  <section className="about-section">
    <h2 className="about-title">WHY WE BUILT THIS</h2>
    <p className="about-description">When we were asked to show what makes Club 18 unique, we didn't want to just say it. We wanted you to feel it.</p>
    <p className="about-description">'CLUBVERSE18:TOGETHER WE THRIVE' is built on a simple truth — universes don't collapse loudly. They fade. One small silence at a time. One ignored voice. One unaddressed moment. One choice to do nothing.</p>
    <p className="about-description">This experience is a reminder. To us, and to everyone who plays it — that we are all part of something larger than ourselves, and that our inactions have weight.</p>
    <p className="about-description">The universe in this experience is not fictional. It is every team, every club, every room where people work together. It is us.</p>
    <p className="about-description">In Club 18, we choose to act. Always. Not because it is easy. Because silence has a cost we are not willing to pay.</p>
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
