# CLAUDE.md — Silent Collapse: Master Briefing

## What This Project Is

Silent Collapse is a minimal, scenario-based interactive web experience built in React.
It is NOT a game. It is a psychological interaction model about the consequences of inaction.
The central metaphor: universes don't collapse loudly — they fade quietly.

Read all files in /docs before writing any code.

---

## Required Reading Order

1. `/docs/ARCHITECTURE.md` — component tree, state logic, screen flow. Read before writing any components.
2. `/docs/DESIGN.md` — visual rules, colors, animation specs. Read before writing any CSS or styles.
3. `/docs/SCENARIOS.md` — all content: scenario text, phrase pools, config values. Read before hardcoding any strings.
4. `/docs/PHILOSOPHY.md` — the "why" behind design decisions. Read before making any judgment calls.

---

## Tech Stack

- React (Vite)
- react-tsparticles — particle background only
- Framer Motion — fades and transitions only
- HTML5 Audio API — background music
- Plain CSS — no UI framework, no Tailwind, no styled-components

---

## Project Folder Structure

```
/src
  /components
    BackgroundParticles.jsx
    RedOverlay.jsx
    HomeScreen.jsx
    GameScreen.jsx
    EndScreen.jsx
  /config
    scenarios.js        ← all scenario text and phrase pools live here
    particleConfig.js   ← tsparticles config object
  App.jsx
  App.css
  main.jsx
/docs
  CLAUDE.md
  ARCHITECTURE.md
  DESIGN.md
  SCENARIOS.md
  PHILOSOPHY.md
/public
  music.mp3            ← background audio file (user will provide)
```

---

## Absolute Rules — Never Break These

1. **No UI frameworks.** No Tailwind, no MUI, no Chakra. Plain CSS only.
2. **No routing libraries.** Screen state is managed with a single `screen` variable in App.jsx.
3. **inactionCount never decreases.** Ever. Not on retry, not on action. Only reset to 0 on full restart.
4. **No recovery mechanic.** Taking action does not reduce the red overlay.
5. **Music never stops.** Audio persists across all screen transitions.
6. **No colors other than black, white, and deep crimson.** See DESIGN.md for exact values.
7. **All scenario text and phrases live in /config/scenarios.js only.** Never hardcode strings in components.
8. **No heavy animations.** No bouncing, no scaling effects, no particle counts above 60.
9. **Phrase selection must be random** from the pool each time — no sequential order.
10. **Do not add features not listed in these docs** without being explicitly asked.

---

## How to Start Building

Build in this order:
1. App shell + screen state controller (App.jsx)
2. BackgroundParticles component
3. RedOverlay component
4. HomeScreen
5. GameScreen (intro sequence first, then scenario loop)
6. EndScreen (collapse state + success state)

Test each component before moving to the next.