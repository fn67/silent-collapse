// Config Values
export const MAX_INACTIONS = 5;
export const TOTAL_SCENARIOS = 10;

// Intro Sequence Phrases (shown in order, not random)
export const INTRO_PHRASES = [
  "Every universe begins with balance.",
  "Every collapse begins with silence.",
  "Try not to let it fade.",
];

// Scenarios (shown in order, no shuffling)
export const SCENARIOS = [
  {
    id: 1,
    text: "A team member expresses burnout, but deadlines are tight.",
  },
  {
    id: 2,
    text: "An innovative idea is dismissed without discussion.",
  },
  {
    id: 3,
    text: "A conflict between two members is quietly ignored.",
  },
  {
    id: 4,
    text: "A junior member asks for mentorship.",
  },
  {
    id: 5,
    text: "A skill gap in the team is visible but unaddressed.",
  },
  {
    id: 6,
    text: "A decision lacks transparency.",
  },
  {
    id: 7,
    text: "Credit for work is misattributed.",
  },
  {
    id: 8,
    text: "A process inefficiency keeps repeating.",
  },
  {
    id: 9,
    text: "A member wants to switch projects but fears speaking up.",
  },
  {
    id: 10,
    text: "Feedback from the club is left unheard.",
  },
    {
    id: 11,
    text: "A member's personal struggle is noticed but left unaddressed.",
  },
   {
    id: 12,
    text: "A new member feels invisible in group discussions.",
  },
    {
    id: 13,
    text: "Someone's repeated contributions go unacknowledged.",
  },
  

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

// End Screen Strings - Collapse
export const COLLAPSE_TITLE = "THE UNIVERSE HAS COLLAPSED";

export const COLLAPSE_BODY = `You had the chance to act.
You chose silence.
And silence collapses everything.
The universe didn’t end with a bang -
it faded, quietly.`;

// End Screen Strings - Success
export const SUCCESS_TEXT =
  "The universe survives because someone chose to act.";

// Button Labels
export const BUTTON_LABELS = {
  play: "PLAY",
  about: "ABOUT",
  takeAction: "Take Action",
  doNothing: "Do Nothing",
  retry: "RETRY",
  quit: "QUIT",
};

// Home Screen Strings
export const HOME_CONTENT = {
  title: "SILENT COLLAPSE",
  tagline: "Universes don't collapse loudly.\nThey fade quietly.",
  subtext:
    "A scenario-based interactive experience.\nNo big brains. Just choices.",
};

// Random Phrase Selection Helper
export function getRandomPhrase(phraseArray, lastPhrase = null) {
  let available = phraseArray;
  if (lastPhrase && phraseArray.length > 1) {
    available = phraseArray.filter((p) => p !== lastPhrase);
  }
  return available[Math.floor(Math.random() * available.length)];
}
