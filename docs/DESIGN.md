# DESIGN.md — Visual Rules, Colors, Animation Specs

## Core Design Philosophy

Minimal. Monochrome. Slow. Intentional.

No flashy effects. No celebrations. No loud feedback.
Every visual decision must reinforce the feeling of weight and consequence.
The interface should feel like it's breathing, not performing.

---

## Color Palette — Strict

Only three colors exist in this project. No exceptions.

| Role             | Value                              |
|------------------|------------------------------------|
| Background       | `#000000` pure black               |
| Text / Particles | `#ffffff` pure white               |
| Overlay          | `#6b0000` deep crimson (base)      |

The red overlay uses a radial gradient:

```css
background: radial-gradient(ellipse at center, #7a0000 0%, #3a0000 100%);
```

Do not use any other color anywhere in the project.
No grays. No off-whites. No lighter reds.

---

## Typography

- Font: Use a system monospace font stack — `'Courier New', Courier, monospace`
- No Google Fonts, no font imports
- All text is white (`#ffffff`)
- Letter spacing: `0.05em` to `0.1em` for a sparse, deliberate feel
- No bold text anywhere except the main title

### Type Scale

| Element            | Size         | Weight  |
|--------------------|--------------|---------|
| Main title         | `3rem`       | Bold    |
| Tagline            | `1.1rem`     | Normal  |
| Subtext            | `0.85rem`    | Normal  |
| Scenario text      | `1.2rem`     | Normal  |
| Phrase text        | `1rem`       | Normal  |
| Buttons            | `0.9rem`     | Normal  |
| End screen text    | `1.4rem`     | Normal  |

---

## Layout

- All screens: centered content, both horizontally and vertically
- Max content width: `600px`
- Use flexbox column layout for all screens
- Content should feel like it's floating in space — generous vertical spacing between elements

```css
.screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}
```

---

## Buttons

Buttons must feel minimal and deliberate. No borders. No backgrounds. No hover fills.

```css
button {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.6rem 2rem;
  cursor: pointer;
  transition: border-color 0.3s ease, opacity 0.3s ease;
}

button:hover {
  border-color: rgba(255, 255, 255, 0.9);
}

button:disabled {
  opacity: 0.2;
  cursor: not-allowed;
}
```

Action buttons (Take Action vs Do Nothing) should have a slightly different visual weight:
- "Take Action" — border opacity slightly higher (0.6)
- "Do Nothing" — border opacity lower (0.25), feels more passive

---

## Particles (BackgroundParticles)

```js
// /config/particleConfig.js
{
  particles: {
    number: { value: 40 },
    color: { value: "#ffffff" },
    opacity: {
      value: 0.3,
      random: true
    },
    size: {
      value: 1.5,
      random: true
    },
    move: {
      enable: true,
      speed: 0.3,
      direction: "none",
      random: true,
      straight: false
    },
    links: {
      enable: false
    }
  },
  interactivity: {
    events: {
      onHover: { enable: false },
      onClick: { enable: false }
    }
  },
  detectRetina: true
}
```

Particles must never exceed 60 in count.
No connecting lines between particles.
No interactivity on hover or click.
Speed must stay between 0.2–0.4.

---

## Red Overlay

```css
.red-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, #7a0000 0%, #3a0000 100%);
  z-index: 1;
  pointer-events: none;
  transition: opacity 1.5s ease;
}
```

Opacity is driven by `inactionCount / MAX_INACTIONS`.
At 0 inactions: fully invisible.
At MAX_INACTIONS: fully opaque (opacity: 1).

---

## Animations — Framer Motion

Use Framer Motion for all fade transitions. Keep them slow and deliberate.

### Standard fade (for phrases, scenario text):

```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 1.5, ease: "easeInOut" }}
>
```

### Screen transitions:

```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 2, ease: "easeInOut" }}
>
```

No scale transforms. No slide transitions. No spring physics.
Only opacity fades. Always.

---

## Global CSS Reset

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #000000;
  color: #ffffff;
  font-family: 'Courier New', Courier, monospace;
  overflow: hidden;
}

#root {
  width: 100vw;
  height: 100vh;
  position: relative;
}
```

`overflow: hidden` on body — no scrollbars anywhere.

---

## Spacing Guidelines

Use multiples of `0.5rem` for all spacing.
Preferred gaps between major elements: `2rem` to `3rem`.
Between button groups: `1rem` to `1.5rem`.
Between title and tagline: `1.5rem`.

---

## What This Should Feel Like

If you're unsure about a visual decision, ask: does this feel heavy, slow, and consequential?
If it feels fun, light, or gamey — it's wrong.
If it feels like reading something serious in a dark room — it's right.
