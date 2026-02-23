// Config Values
export const MAX_INACTIONS = 5;
export const TOTAL_SCENARIOS = 40;

// Pillars Config
export const PILLARS = {
  leadership: { name: "Leadership", logo: "/leadership.svg" },
  innovation: { name: "Innovation", logo: "/innovation.svg" },
  credibility: { name: "Credibility", logo: "/credibility.svg" },
  togetherness: { name: "Togetherness", logo: "/togetherness.svg" },
};

// Intro Sequence Phrases (shown in order, not random)
export const INTRO_PHRASES = [
  "Every universe begins with balance.",
  "Every collapse begins with silence.",
  "Try not to let it fade.",
];

// Scenarios (shown in order, no shuffling)

export const SCENARIOS = [
  { id: 1, text: "A junior member wants to lead a small initiative but lacks confidence.", pillar: "leadership" },
  { id: 2, text: "A good idea fails in a small pilot and the team becomes hesitant to try again.", pillar: "innovation" },
  { id: 3, text: "Stakeholders ask for progress updates, but the reality is behind schedule.", pillar: "credibility" },
  { id: 4, text: "The team splits into groups based on experience level or role.", pillar: "togetherness" },
  { id: 5, text: "Recognition is uneven and some members feel overlooked.", pillar: "leadership" },
  { id: 6, text: "The same problems keep recurring and people accept them as “normal”. challenge the status quo.", pillar: "innovation" },
  { id: 7, text: "A decision is made, but the reasoning isn’t shared and people start speculating.", pillar: "credibility" },
  { id: 8, text: "A conflict starts small but creates tension across the group.", pillar: "togetherness" },
  { id: 9, text: "Various high priority tasks clash and the team is confused impacting the deliveries.", pillar: "leadership" },
  { id: 10, text: "A proven process works well enough, but the team is bored and progress is very slow in executing.", pillar: "innovation" },
  { id: 11, text: "A very sensitive issue is discussed in a casual setting and confidentiality is at risk.", pillar: "credibility" },
  { id: 12, text: "Collaboration breaks down because people work in silos and don’t share context.", pillar: "togetherness" },
  { id: 13, text: "A team member expresses burnout, but deadlines are tight.", pillar: "togetherness" },
  { id: 14, text: "An innovative idea is dismissed without discussion.", pillar: "innovation" },
  { id: 15, text: "A conflict between two members is quietly ignored.", pillar: "togetherness" },
  { id: 16, text: "A skill gap in the team is visible but unaddressed.", pillar: "innovation" },
  { id: 17, text: "A decision lacks transparency.", pillar: "credibility" },
  { id: 18, text: "Credit for work is misattributed.", pillar: "credibility" },
  { id: 19, text: "A process inefficiency keeps repeating.", pillar: "innovation" },
  { id: 20, text: "A member wants to switch projects but fears speaking up.", pillar: "togetherness" },
  { id: 21, text: "Someone's repeated contributions go unacknowledged.", pillar: "credibility" },
  { id: 22, text: "A member's personal struggle is noticed but left unaddressed.", pillar: "togetherness" },
  { id: 23, text: "An outdated way of working is followed just because it always has been.", pillar: "innovation" },
  { id: 24, text: "Someone takes the blame for a collective failure. Alone.", pillar: "credibility" },
  { id: 25, text: "A promising collaboration never happens because nobody initiates it.", pillar: "togetherness" },
  { id: 26, text: "Someone volunteers for everything and is quietly burning out.", pillar: "togetherness" },
  { id: 27, text: "A decision is made. The people it affects most are told last.", pillar: "credibility" },
  { id: 28, text: "The team celebrates a win. The people who made it happen aren't in the room.", pillar: "togetherness" },
  { id: 29, text: "A miscommunication causes a delay. Nobody examines why it keeps happening.", pillar: "innovation" },
  { id: 30, text: "Someone is clearly overwhelmed. The team assumes they'll ask for help if they need it.", pillar: "togetherness" },
  { id: 31, text: "A junior member spots a flaw in the plan. They decide it's not their place to say it.", pillar: "leadership" },
  { id: 32, text: "Feedback is collected. A month passes. Nothing changes.", pillar: "credibility" },
  { id: 33, text: "Two members stop collaborating. Everyone notices. Nobody asks why.", pillar: "togetherness" },
  { id: 34, text: "Someone new joins the team. Nobody makes them feel like they belong.", pillar: "togetherness" },
  { id: 35, text: "A risk is flagged early. It is noted, filed, and forgotten.", pillar: "leadership" },
  { id: 36, text: "A member disagrees with the direction but goes along to avoid conflict.", pillar: "leadership" },
  { id: 37, text: "Knowledge that only one person holds is never documented or shared.", pillar: "innovation" },
  { id: 38, text: "A small win goes uncelebrated. The team moves on without pausing.", pillar: "togetherness" },
  { id: 39, text: "A conflict is resolved on the surface. The real issue is never addressed.", pillar: "leadership" },
  { id: 40, text: "A member asks for help. They are told to figure it out.", pillar: "togetherness" },
];


// Inaction Phrases (random selection)
export const INACTION_PHRASES = [
  "Inaction is also a decision.",
  "Silence grows roots.",
  "Neglect compounds quietly.",
  "Balance shifts unnoticed.",
  "Small fractures widen.",
  "Nothing changes - until everything does.",
  "The fade has begun.",
  "Quiet choices echo longest.",
  "Stillness can be decay.",
  "The cost of silence accumulates.",
];

// Action Phrases (random selection)
export const ACTION_PHRASES = [
  "Balance is restored - for now.",
  "A voice was heard.",
  "Small actions hold universes together.",
  "Intervention delays collapse.",
  "Leadership is participation.",
  "Togetherness resists decay.",
  "Innovation requires courage.",
  "Silence was interrupted.",
  "A fracture was sealed.",
  "The universe steadies.",
];

// Recovery Action Phrases (shown during recovery phase only)
export const RECOVERY_ACTION_PHRASES = [
  "A silence confronted. The universe breathes.",
  "You came back. That matters.",
  "What was broken begins to mend.",
  "Accountability is its own kind of courage.",
  "The fracture closes.",
  "Late action is still action.",
  "The universe remembers those who return.",
  "Healing is not instant. But it has begun.",
  "You chose differently this time.",
  "The red recedes.",
];

// End Screen Strings - Success
export const SUCCESS_TEXT =
  "The universe survives because someone chose to act.";

// End Screen Strings - Collapse
export const COLLAPSE_TITLE = "THE UNIVERSE HAS COLLAPSED";

// export const COLLAPSE_BODY =
//   "You were given moments to speak up, to act, to intervene.\nYou chose silence.\nAnd silence, given enough time, collapses everything.\nThe universe didn't end with a bang.\nIt faded — one quiet choice at a time.";

  export const COLLAPSE_BODY = `You had the chance to act.\nYou chose silence.\nAnd silence collapses everything.\nThe universe didn’t end with a bang - it faded, quietly.`;
// Recovery Strings
export const RECOVERY_PROMPT =
  "The universe is collapsing. But it is not too late.";

export const RECOVERY_SUCCESS =
  "The universe is restored. But remember - it was never guaranteed.";

// Button Labels
export const BUTTON_LABELS = {
  play: "PLAY",
  about: "ABOUT",
  takeAction: "Take Action",
  doNothing: "Do Nothing",
  recover: "RESTORE THE UNIVERSE",
  retry: "RETRY",
  quit: "QUIT",
};

// Home Screen Strings
export const HOME_CONTENT = {
  title: "SILENT COLLAPSE",
  subtitle: "by Club 18",
  tagline: "Universes don't collapse loudly.\nThey fade quietly.",
  subtext: "A scenario-based interactive experience.\nNo big brains. Just choices.",
};

// Random Phrase Selection Helper
export function getRandomPhrase(phraseArray, lastPhrase = null) {
  let available = phraseArray;
  if (lastPhrase && phraseArray.length > 1) {
    available = phraseArray.filter((p) => p !== lastPhrase);
  }
  return available[Math.floor(Math.random() * available.length)];
}
