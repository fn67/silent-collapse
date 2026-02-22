export default function RedOverlay({ inactionCount, maxInactions }) {
  const opacity = inactionCount / maxInactions

  return (
    <div
      className="red-overlay"
      style={{ opacity }}
    />
  )
}
