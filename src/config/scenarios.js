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
  { id: 1, text: "A team member expresses burnout, but deadlines are tight.", pillar: "togetherness" },
  { id: 2, text: "An innovative idea is dismissed without discussion.", pillar: "innovation" },
  { id: 3, text: "A conflict between two members is quietly ignored.", pillar: "togetherness" },
  { id: 4, text: "A junior member asks for mentorship.", pillar: "leadership" },
  { id: 5, text: "A skill gap in the team is visible but unaddressed.", pillar: "innovation" },
  { id: 6, text: "A decision lacks transparency.", pillar: "credibility" },
  { id: 7, text: "Credit for work is misattributed.", pillar: "credibility" },
  { id: 8, text: "A process inefficiency keeps repeating.", pillar: "innovation" },
  { id: 9, text: "A member wants to switch projects but fears speaking up.", pillar: "togetherness" },
  { id: 10, text: "Feedback from the club is left unheard.", pillar: "leadership" },
  { id: 11, text: "A team meeting ends with no clear owner for any decision.", pillar: "leadership" },
  { id: 12, text: "Someone's repeated contributions go unacknowledged.", pillar: "credibility" },
  { id: 13, text: "A new member feels invisible in group discussions.", pillar: "togetherness" },
  { id: 14, text: "A deadline is clearly unrealistic but nobody says it out loud.", pillar: "credibility" },
  { id: 15, text: "Two teams are doing the same work without knowing it.", pillar: "innovation" },
  { id: 16, text: "A member's personal struggle is noticed but left unaddressed.", pillar: "togetherness" },
  { id: 17, text: "An outdated way of working is followed just because it always has been.", pillar: "innovation" },
  { id: 18, text: "Someone takes the blame for a collective failure. Alone.", pillar: "credibility" },
  { id: 19, text: "A promising collaboration never happens because nobody initiates it.", pillar: "togetherness" },
  { id: 20, text: "The loudest voice in the room shapes every decision. Nobody pushes back.", pillar: "leadership" },
  { id: 21, text: "A member consistently arrives late to meetings. Nothing is said.", pillar: "credibility" },
  { id: 22, text: "An important email goes unanswered for weeks.", pillar: "leadership" },
  { id: 23, text: "A team goal shifts but not everyone is informed.", pillar: "credibility" },
  { id: 24, text: "Someone volunteers for everything and is quietly burning out.", pillar: "togetherness" },
  { id: 25, text: "A decision is made. The people it affects most are told last.", pillar: "credibility" },
  { id: 26, text: "A member's idea is ignored, then praised when someone else repeats it.", pillar: "credibility" },
  { id: 27, text: "The team celebrates a win. The people who made it happen aren't in the room.", pillar: "togetherness" },
  { id: 28, text: "A miscommunication causes a delay. Nobody examines why it keeps happening.", pillar: "innovation" },
  { id: 29, text: "Someone is clearly overwhelmed. The team assumes they'll ask for help if they need it.", pillar: "togetherness" },
  { id: 30, text: "A junior member spots a flaw in the plan. They decide it's not their place to say it.", pillar: "leadership" },
  { id: 31, text: "Feedback is collected. A month passes. Nothing changes.", pillar: "credibility" },
  { id: 32, text: "Two members stop collaborating. Everyone notices. Nobody asks why.", pillar: "togetherness" },
  { id: 33, text: "A team ritual that once meant something becomes an empty routine.", pillar: "togetherness" },
  { id: 34, text: "Someone new joins the team. Nobody makes them feel like they belong.", pillar: "togetherness" },
  { id: 35, text: "A risk is flagged early. It is noted, filed, and forgotten.", pillar: "leadership" },
  { id: 36, text: "The team is asked for honest input. Everyone gives the safe answer.", pillar: "credibility" },
  { id: 37, text: "A member disagrees with the direction but goes along to avoid conflict.", pillar: "leadership" },
  { id: 38, text: "Knowledge that only one person holds is never documented or shared.", pillar: "innovation" },
  { id: 39, text: "A small win goes uncelebrated. The team moves on without pausing.", pillar: "togetherness" },
  { id: 40, text: "The hardest working person on the team is also the quietest. Nobody wonders why.", pillar: "togetherness" },
];

// Inaction Phrases (random selection)
export const INACTION_PHRASES = [
  "Inaction is also a decision.",
  "Silence grows roots.",
  "Neglect compounds quietly.",
  "Balance shifts unnoticed.",
  "Small fractures widen.",
  "Nothing changes — until everything does.",
  "The fade has begun.",
  "Quiet choices echo longest.",
  "Stillness can be decay.",
  "The cost of silence accumulates.",
];

// Action Phrases (random selection)
export const ACTION_PHRASES = [
  "Balance is restored — for now.",
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

export const COLLAPSE_BODY =
  "You were given moments to speak up, to act, to intervene.\nYou chose silence.\nAnd silence, given enough time, collapses everything.\nThe universe didn't end with a bang.\nIt faded — one quiet choice at a time.";

// Recovery Strings
export const RECOVERY_PROMPT =
  "The universe is collapsing. But it is not too late.";

export const RECOVERY_SUCCESS =
  "The universe is restored. But remember — it was never guaranteed.";

// Button Labels
export const BUTTON_LABELS = {
  play: "PLAY",
  about: "ABOUT",
  takeAction: "Take Action to Resolve This",
  doNothing: "Do Nothing",
  recover: "REBUILD THE UNIVERSE",
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
