# ARCHITECTURE.md — Component Tree, State Logic, Screen Flow

## Screen State Controller

The entire app is controlled by a single state variable in App.jsx:

```js
const [screen, setScreen] = useState("home");
// Possible values: "home" | "about" | "game" | "end"
```

No routing library. No URL changes. Just conditional rendering based on `screen`.

---

## Component Tree

```
App
├── BackgroundParticles        ← always rendered, never unmounts
├── RedOverlay                 ← always rendered, opacity driven by inactionCount
├── HomeScreen                 ← rendered when screen === "home"
├── AboutScreen                ← rendered when screen === "about"
├── GameScreen                 ← rendered when screen === "game"
└── EndScreen                  ← rendered when screen === "end"
```

BackgroundParticles and RedOverlay are **always mounted** regardless of screen.
They must never unmount or remount on screen transitions.

---

## App.jsx — State Variables

App.jsx owns all shared state and passes down via props:

```js
const [screen, setScreen] = useState("home");
const [inactionCount, setInactionCount] = useState(0);
const [endType, setEndType] = useState(null); // "success" only — collapse now triggers recovery
const audioRef = useRef(null);
```

Audio is initialized once in App.jsx using useRef.
Music attempts to play on mount. If browser blocks autoplay, a one-time document
click listener starts it on first interaction. Music never stops after starting.

---

## Audio Initialization (App.jsx)

```js
useEffect(() => {
  audioRef.current = new Audio("/music.mp3");
  audioRef.current.loop = true;
  audioRef.current.volume = 0.5;

  const tryPlay = () => {
    audioRef.current.play().catch(() => {
      const startOnClick = () => {
        audioRef.current.play();
        document.removeEventListener("click", startOnClick);
      };
      document.addEventListener("click", startOnClick);
    });
  };
  tryPlay();
}, []);
```

---

## BackgroundParticles

- Always rendered, never unmounts
- White particles on black background
- Config imported from `/config/particleConfig.js`
- Uses `@tsparticles/react` and `tsparticles`
- No props needed

```jsx
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import particleConfig from "../config/particleConfig";

export default function BackgroundParticles() {
  const particlesInit = async (main) => { await loadFull(main); };
  return <Particles init={particlesInit} options={particleConfig} />;
}
```

---

## RedOverlay

Props: `inactionCount`, `maxInactions`

```jsx
const opacity = inactionCount / maxInactions;

<div
  style={{
    opacity,
    transition: "opacity 1.5s ease",
  }}
  className="red-overlay"
/>
```

The overlay is a fixed full-screen div, z-index above particles but below UI content.
Color is deep crimson radial gradient — see DESIGN.md.

During recovery phase, as inactionCount decreases, opacity reduces automatically
because it is always calculated as inactionCount / maxInactions.

---

## HomeScreen

Props: `onPlay`, `onAbout`

Elements:
- Title: "SILENT COLLAPSE"
- Subtitle: "by Club 18"
- Tagline
- Subtext
- Button: PLAY → calls `onPlay()`
- Button: ABOUT → calls `onAbout()`

---

## AboutScreen

Props: `onBack`

Three sections:
1. HOW TO PLAY
2. WHY WE BUILT THIS
3. ABOUT CLUB 18 (includes group photo)

- Full screen layout, scrollable, scrollbar hidden
- BACK button top left calls `onBack()` → sets screen to "home"
- Fade in on mount using Framer Motion

---

## GameScreen

Props: `inactionCount`, `onInaction`, `onAction`, `onCollapse`, `onSuccess`

### Internal State

```js
const [gamePhase, setGamePhase] = useState("intro");
// "intro" | "scenario" | "transition" | "recovery"

const [scenarioIndex, setScenarioIndex] = useState(0);
const [missedScenarios, setMissedScenarios] = useState([]); // scenarios user clicked "Do Nothing" on
const [recoveryIndex, setRecoveryIndex] = useState(0); // index within missedScenarios during recovery
const [currentPhrase, setCurrentPhrase] = useState(null);
const [phraseVisible, setPhraseVisible] = useState(false);
const [currentPillar, setCurrentPillar] = useState(null); // pillar of current scenario
```

---

## Intro Sequence

Three phrases fade in/out sequentially before first scenario:

1. "Every universe begins with balance."
2. "Every collapse begins with silence."
3. "Try not to let it fade."

Timing per phrase:
- Fade in: 1.5s
- Hold: 1s
- Fade out: 1.5s

After all three → set gamePhase to "scenario", show first scenario.

---

## Pillar Logo Display

Every scenario has a `pillar` field: "leadership" | "innovation" | "credibility" | "togetherness"

When a scenario loads:
- Set `currentPillar` to the scenario's pillar
- Display the corresponding SVG from /public:
  - leadership → `/leadership.svg`
  - innovation → `/innovation.svg`
  - credibility → `/credibility.svg`
  - togetherness → `/togetherness.svg`

Animation: gentle pulse using Framer Motion

```jsx
<motion.img
  src={`/${currentPillar}.svg`}
  alt={currentPillar}
  className="pillar-logo"
  animate={{ opacity: [0.4, 1, 0.4] }}
  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
/>
```

Logo appears above the scenario text, centered.
Size: approximately 48x48px — subtle, not dominant.

---

## Normal Play — Scenario Loop

While `gamePhase === "scenario"`:
- Display scenario text from `SCENARIOS[scenarioIndex]`
- Display pillar logo with pulse animation
- Show two buttons: "Take Action" | "Do Nothing"
- Buttons disabled during transitions (`gamePhase === "transition"`)

### On "Do Nothing" Click (Normal Play)

```
1. Set gamePhase = "transition"
2. Wait 1.5s
3. Call onInaction() → increments inactionCount in App
4. Add current scenario to missedScenarios array
5. Pick random phrase from INACTION_PHRASES
6. Show phrase (fade in)
7. Wait 2s
8. Hide phrase (fade out)
9. Wait 1.5s
10. Check: if new inactionCount >= MAX_INACTIONS → call onCollapse()
    which triggers recovery phase (NOT end screen)
11. Else: advance scenarioIndex, set gamePhase = "scenario"
```

### On "Take Action" Click (Normal Play)

```
1. Set gamePhase = "transition"
2. Wait 1s
3. Pick random phrase from ACTION_PHRASES
4. Show phrase (fade in)
5. Wait 2s
6. Hide phrase (fade out)
7. Wait 1s
8. Check: if scenarioIndex + 1 >= total scenarios → call onSuccess()
9. Else: advance scenarioIndex, set gamePhase = "scenario"
```

**Red overlay does NOT reduce on action during normal play. Ever.**

---

## Collapse → Recovery Phase

When `onCollapse()` is called from App.jsx:
- Do NOT navigate to EndScreen
- Set gamePhase = "recovery" inside GameScreen
- Set recoveryIndex = 0
- Show collapse message briefly (2s fade):
  "The universe is collapsing. But it is not too late."
- Then show RECOVER button

When user clicks RECOVER:
- Start recovery loop using missedScenarios array

---

## Recovery Phase — Scenario Loop

During recovery phase:
- Display missed scenarios one by one from missedScenarios array
- Display pillar logo for each missed scenario (same as normal play)
- Show label: "RECOVERY MODE" or subtle indicator at top
- Same two buttons: "Take Action | "Do Nothing"

### On "Take Action" Click (Recovery Phase)

```
1. Set gamePhase = "transition"
2. Wait 1s
3. Call onAction() → decrements inactionCount by 1 in App
4. Pick random phrase from RECOVERY_ACTION_PHRASES
5. Show phrase (fade in)
6. Wait 2s
7. Hide phrase (fade out)
8. Wait 1s
9. Remove this scenario from missedScenarios
10. Advance recoveryIndex
11. Check: if all missed scenarios resolved (missedScenarios empty):
    → inactionCount resets to 0
    → show "Universe restored" message
    → resume normal play from where it left off (current scenarioIndex)
    → set gamePhase = "scenario"
12. Else: show next missed scenario
```

### On "Do Nothing" Click (Recovery Phase)

```
1. Set gamePhase = "transition"
2. Wait 1.5s
3. Call onInaction() → increments inactionCount by 1
4. Keep this scenario in missedScenarios (not resolved)
5. Pick random phrase from INACTION_PHRASES
6. Show phrase (fade in)
7. Wait 2s
8. Hide phrase (fade out)
9. Wait 1.5s
10. Check: if inactionCount >= MAX_INACTIONS → collapse again
    → repeat recovery phase with updated missedScenarios
11. Else: advance recoveryIndex, show next missed scenario
```

---

## Recovery Phrases

Add a new phrase pool to scenarios.js: `RECOVERY_ACTION_PHRASES`

These are slightly different from normal action phrases — they carry the weight of confronting past silence:

- "A silence confronted. The universe breathes."
- "You came back. That matters."
- "What was broken begins to mend."
- "Accountability is its own kind of courage."
- "The fracture closes."
- "Late action is still action."
- "The universe remembers those who return."
- "Healing is not instant. But it has begun."
- "You chose differently this time."
- "The red recedes."

---

## Success Condition

If all scenarios complete without collapse (or after recovery):
- Call onSuccess() → navigate to EndScreen with endType = "success"

---

## EndScreen

Props: `endType` ("success" only now), `onRetry`, `onQuit`

Collapse no longer leads to EndScreen — it leads to recovery phase.
EndScreen only shows success ending now.

onRetry:
```js
setInactionCount(0);
setScreen("game");
setEndType(null);
```

onQuit:
```js
setScreen("home");
setInactionCount(0);
setEndType(null);
```

---

## Z-Index Layering

```
1 — BackgroundParticles (z-index: 0)
2 — RedOverlay          (z-index: 1)
3 — UI Content          (z-index: 2)
```

---

## MAX_INACTIONS

```js
const MAX_INACTIONS = 5;
```

Defined in `/config/scenarios.js` and imported wherever needed.
Do not hardcode this value in components.