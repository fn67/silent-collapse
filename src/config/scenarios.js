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
  { text: "Every universe begins with balance.", audio: "/audio/intro/every-universe-begins.mp3" },
  { text: "Every collapse begins with silence.", audio: "/audio/intro/every-collapse-begins.mp3" },
  { text: "Try not to let it fade.", audio: "/audio/intro/trynot.mp3" },
];

// Scenarios (shown in order, no shuffling)

export const SCENARIOS = [
  { id: 1, text: "A junior member wants to lead a small initiative but lacks confidence.", pillar: "leadership" },
  { id: 2, text: "A good idea fails in a small pilot and the team becomes hesitant to try again.", pillar: "innovation" },
  { id: 3, text: "Stakeholders ask for progress updates, but the reality is behind schedule.", pillar: "credibility" },
  { id: 4, text: "The team splits into groups based on experience level or role.", pillar: "togetherness" },
  { id: 5, text: "Recognition is uneven and some members feel overlooked.", pillar: "leadership" },
  { id: 6, text: "The same problems keep recurring and people accept them as 'normal'. Challenge the status quo.", pillar: "innovation" },
  { id: 7, text: "A decision is made, but the reasoning isn't shared and people start speculating.", pillar: "credibility" },
  { id: 8, text: "A conflict starts small but creates tension across the group.", pillar: "togetherness" },
  { id: 9, text: "Various high priority tasks clash and the team is confused impacting the deliveries.", pillar: "leadership" },
  { id: 10, text: "A proven process works well enough, but the team is bored and progress is very slow in executing.", pillar: "innovation" },
  { id: 11, text: "A very sensitive issue is discussed in a casual setting and confidentiality is at risk.", pillar: "credibility" },
  { id: 12, text: "Collaboration breaks down because people work in silos and don't share context.", pillar: "togetherness" },
  { id: 13, text: "A conflict between two members is quietly ignored.", pillar: "togetherness" },
  { id: 14, text: "A member wants to switch projects but fears speaking up.", pillar: "togetherness" },
  { id: 15, text: "A member's personal struggle is noticed but left unaddressed.", pillar: "togetherness" },
];


// Inaction Phrases (random selection)
export const INACTION_PHRASES = [
  { text: "Silence grows roots.", audio: "/audio/inaction/silence.mp3" },
  { text: "Balance shifts unnoticed.", audio: "/audio/inaction/balance.mp3" },
  { text: "Neglect compounds quietly.", audio: "/audio/inaction/neglect.mp3" },
  { text: "Inaction is also a decision.", audio: "/audio/inaction/inaction.mp3" },
  { text: "Small fractures widen.", audio: "/audio/inaction/smallfractures.mp3" },
  { text: "Nothing changes - until everything does.", audio: "/audio/inaction/nothingchanges.mp3" },
  { text: "The fade has begun.", audio: "/audio/inaction/fadebegun.mp3" },
  { text: "Quiet choices echo longest.", audio: "/audio/inaction/quietchoice.mp3"},
  { text: "Stillness can be decay.", audio: "/audio/inaction/stillness.mp3" },
  { text: "The cost of silence accumulates.", audio: "/audio/inaction/costofsilence.mp3" },
];

// Action Phrases (random selection)
export const ACTION_PHRASES = [
  { text: "Balance is restored - for now.", audio: "/audio/action/balancerestored.mp3" },
  { text: "A voice was heard.", audio: "/audio/action/voiceheard.mp3" },
  { text: "Small actions hold universes together.", audio: "/audio/action/smallactions.mp3" },
  { text: "Intervention delays collapse.", audio: "/audio/action/interventiondelays.mp3" },
  { text: "A hand reached out.", audio: "/audio/action/hand.mp3" },
  { text: "The universe remembers this.", audio: "/audio/action/universerem.mp3" },
  { text: "The void did not grow.", audio: "/audio/action/void.mp3" },
  { text: "Silence was interrupted.", audio: "/audio/action/silence.mp3" },
  { text: "A fracture was sealed.", audio: "/audio/action/fracture.mp3" },
  { text: "The universe steadies.", audio: "/audio/action/theuniverse.mp3" },
];

// Recovery Action Phrases (shown during recovery phase only)
export const RECOVERY_ACTION_PHRASES = [
  { text: "A silence confronted. The universe breathes.", audio: "/audio/recovery/silence.mp3" },
  { text: "You came back. That matters.", audio: "/audio/recovery/youcameback.mp3" },
  { text: "What was broken begins to mend.", audio: "/audio/recovery/whatwasbroken.mp3" },
  { text: "Accountability is its own kind of courage.", audio: "/audio/recovery/accountability.mp3" },
  { text: "The fracture closes.", audio: "/audio/recovery/fracture.mp3" },
  { text: "Late action is still action.", audio: "/audio/recovery/lateaction.mp3" },
  { text: "The universe remembers those who return.", audio: "/audio/recovery/universeremembers.mp3" },
  { text: "Healing is not instant. But it has begun.", audio: "/audio/recovery/healing.mp3" },
  { text: "You chose differently this time.", audio: "/audio/recovery/youchose.mp3" },
  { text: "The red recedes.", audio: "/audio/recovery/redrecedes.mp3" },
];

// End Screen Strings - Success
export const SUCCESS_TEXT =
  "The universe survives because someone chose to act.";

// End Screen Strings - Collapse
export const COLLAPSE_TITLE = "THE UNIVERSE HAS COLLAPSED";

// export const COLLAPSE_BODY =
//   "You were given moments to speak up, to act, to intervene.\nYou chose silence.\nAnd silence, given enough time, collapses everything.\nThe universe didn't end with a bang.\nIt faded — one quiet choice at a time.";

  export const COLLAPSE_BODY = `You had the chance to act.\nYou chose silence.\nAnd silence collapses everything.\nThe universe didn't end with a bang - it faded, quietly.`;
// Recovery Strings
export const RECOVERY_PROMPT = {
  text: "The universe is collapsing. But it is not too late.",
  audio: "/audio/system/universecollapsing.mp3"
};

export const RECOVERY_SUCCESS = {
  text: "The universe is restored. But remember - it was never guaranteed.",
  audio: "/audio/system/universerestored.mp3"
};

// Button Labels
export const BUTTON_LABELS = {
  play: "PLAY",
  about: "Before You Begin ",
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
  subtext: "A scenario-based interactive experience.",
};

// Random Phrase Selection Helper
export function getRandomPhrase(phraseArray, lastPhrase = null) {
  let available = phraseArray;
  if (lastPhrase && phraseArray.length > 1) {
    available = phraseArray.filter((p) => p.text !== lastPhrase.text);
  }
  return available[Math.floor(Math.random() * available.length)];
}