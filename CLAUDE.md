# CLAUDE.md — Silent Collapse: Master Briefing (Updated)

## What This Project Is

Silent Collapse is a minimal, scenario-based interactive web experience built in React.
It is NOT a game. It is a psychological interaction model about the consequences of inaction.
The central metaphor: universes don't collapse loudly — they fade quietly.
But a universe that collapses can be rebuilt — if you choose to confront every silence.

Read all files in /docs before writing any code.

---

## Required Reading Order

1. `/docs/ARCHITECTURE.md` — component tree, state logic, screen flow, recovery phase. Read before writing any components.
2. `/docs/DESIGN.md` — visual rules, colors, animation specs. Read before writing any CSS or styles.
3. `/docs/SCENARIOS.md` — all content: scenario text, pillar mappings, phrase pools, config values. Read before hardcoding any strings.
4. `/docs/PHILOSOPHY.md` — the "why" behind design decisions. Read before making any judgment calls.

---

## Tech Stack

- React (Vite)
- @tsparticles/react@2.12.0 + tsparticles@2.12.0 (use these exact versions — other versions have compatibility issues)
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
    AboutScreen.jsx
    GameScreen.jsx
    EndScreen.jsx
  /config
    scenarios.js        ← all scenario text, pillar mappings, and phrase pools live here
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
  music.mp3
  leadership.svg
  innovation.svg
  credibility.svg
  togetherness.svg
```

---

## Absolute Rules — Never Break These

1. **No UI frameworks.** No Tailwind, no MUI, no Chakra. Plain CSS only.
2. **No routing libraries.** Screen state is managed with a single `screen` variable in App.jsx.
3. **inactionCount never decreases during normal play.** Only decreases during recovery phase when user clicks "Take Action" on a missed scenario.
4. **Red overlay only reduces during recovery phase.** Taking action during normal play never reduces the overlay. Ever.
5. **Full recovery resets inactionCount to 0.** Only when all missed scenarios are resolved with "Take Action" in recovery phase.
6. **Music never stops.** Audio persists across all screen transitions including recovery phase.
7. **No colors other than black, white, and deep crimson.** See DESIGN.md for exact values.
8. **All scenario text, pillar mappings, and phrases live in /config/scenarios.js only.** Never hardcode strings in components.
9. **No heavy animations.** No bouncing, no scaling effects, no particle counts above 60.
10. **Phrase selection must be random** from the pool each time — no sequential order.
11. **Each scenario has a pillar.** Every scenario must display its pillar SVG logo when it appears.
12. **Pillar SVGs live in /public.** Reference them as `/leadership.svg`, `/innovation.svg`, `/credibility.svg`, `/togetherness.svg`.
13. **Do not add features not listed in these docs** without being explicitly asked.

---

## Game Phases Overview

```
normal play → collapse → recovery phase → normal play (resumed)
                ↑                              |
                └──────────────────────────────┘
                     (can repeat indefinitely)
```

Full details in ARCHITECTURE.md.

---

## How to Start Building

Build in this order:
1. App shell + screen state controller (App.jsx)
2. BackgroundParticles component
3. RedOverlay component
4. HomeScreen
5. AboutScreen
6. GameScreen (intro → normal play → collapse → recovery phase)
7. EndScreen (success state only — collapse now triggers recovery, not end screen)

Test each component before moving to the next.