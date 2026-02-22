# ARCHITECTURE.md — Component Tree, State Logic, Screen Flow

## Screen State Controller

The entire app is controlled by a single state variable in App.jsx:

```js
const [screen, setScreen] = useState("home");
// Possible values: "home" | "game" | "end"
```

No routing library. No URL changes. Just conditional rendering based on `screen`.

---

## Component Tree

```
App
├── BackgroundParticles        ← always rendered, never unmounts
├── RedOverlay                 ← always rendered, opacity driven by inactionCount
├── HomeScreen                 ← rendered when screen === "home"
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
const [endType, setEndType] = useState(null); // "collapse" | "success"
const audioRef = useRef(null); // persists across renders
```

Audio is initialized once in App.jsx using useRef.
Music starts when user clicks PLAY (not before — browser restriction).

---

## Audio Initialization (App.jsx)

```js
audioRef.current = new Audio("/music.mp3");
audioRef.current.loop = true;
audioRef.current.volume = 0.5;

// Call this on PLAY click:
audioRef.current.play();
```

Pass `audioRef` down only if a child component needs to control volume.
Generally, audio should need no child interaction.

---

## BackgroundParticles

- Always rendered
- White particles on black background
- Config imported from `/config/particleConfig.js`
- Uses `react-tsparticles` and `tsparticles`
- No props needed
- See DESIGN.md for particle specs

```jsx
// Basic structure
import Particles from "react-tsparticles";
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
    // full positioning and color in CSS
  }}
/>
```

The overlay is a fixed full-screen div, z-index above particles but below UI content.
Color is deep crimson radial gradient — see DESIGN.md.

---

## HomeScreen

Props: `onPlay` (callback to start game and audio)

Elements:
- Title: "SILENT COLLAPSE"
- Tagline: "Universes don't collapse loudly. They fade quietly."
- Subtext: "A scenario-based interactive experience. No big brains. Just choices."
- Button: PLAY → calls `onPlay()`
- Button: ABOUT → static modal or placeholder for now

`onPlay()` in App.jsx should:
1. Start audio
2. Set screen to "game"

---

## GameScreen

Props: `inactionCount`, `onInaction`, `onAction`, `onCollapse`, `onSuccess`

### Internal State

```js
const [gamePhase, setGamePhase] = useState("intro"); // "intro" | "scenario" | "transition"
const [scenarioIndex, setScenarioIndex] = useState(0);
const [currentPhrase, setCurrentPhrase] = useState(null);
const [phraseVisible, setPhraseVisible] = useState(false);
```

### Intro Sequence

Three phrases fade in/out sequentially before first scenario:

1. "Every universe begins with balance."
2. "Every collapse begins with silence."
3. "Try not to let it fade."

Timing per phrase:
- Fade in: 1.5s
- Hold: 1s  
- Fade out: 1.5s

After all three → set gamePhase to "scenario", show first scenario.

Use `setTimeout` chains or an async function with awaited delays.

### Scenario Loop

While `gamePhase === "scenario"`:
- Display scenario text from `scenarios[scenarioIndex]`
- Show two buttons: "Take Action to Resolve This" | "Do Nothing"
- Buttons disabled during transitions (`gamePhase === "transition"`)

### On "Do Nothing" Click

```
1. Set gamePhase = "transition"
2. Wait 1.5s (freeze UI)
3. Call onInaction() → increments inactionCount in App
4. Pick random phrase from INACTION_PHRASES
5. Show phrase (fade in)
6. Wait 2s
7. Hide phrase (fade out)
8. Wait 1.5s
9. Check: if new inactionCount >= MAX_INACTIONS → call onCollapse()
10. Else: advance scenarioIndex, set gamePhase = "scenario"
```

### On "Take Action" Click

```
1. Set gamePhase = "transition"
2. Wait 1s (freeze UI)
3. Pick random phrase from ACTION_PHRASES
4. Show phrase (fade in)
5. Wait 2s
6. Hide phrase (fade out)
7. Wait 1s
8. Check: if scenarioIndex + 1 >= total scenarios → call onSuccess()
9. Else: advance scenarioIndex, set gamePhase = "scenario"
```

**Red overlay does NOT reduce on action. Ever.**

---

## EndScreen

Props: `endType` ("collapse" | "success"), `onRetry`, `onQuit`

### Collapse End

Text:
```
"Universes don't collapse loudly.
They fade quietly."
```

Buttons: Retry | Quit

### Success End

Text:
```
"The universe survives because someone chose to act."
```

Buttons: Retry | Quit

### onRetry behavior (in App.jsx)

```js
setInactionCount(0);
setScreen("game");
setEndType(null);
```

Reset inactionCount to 0. Reset screen to game. Music keeps playing.

### onQuit behavior

```js
setScreen("home");
setInactionCount(0);
setEndType(null);
```

---

## MAX_INACTIONS

```js
const MAX_INACTIONS = 5;
```

Defined in `/config/scenarios.js` and imported wherever needed.
Do not hardcode this value in components.

---

## Z-Index Layering

```
1 — BackgroundParticles (z-index: 0)
2 — RedOverlay          (z-index: 1)
3 — UI Content          (z-index: 2)
```

All UI content must sit above the red overlay.
