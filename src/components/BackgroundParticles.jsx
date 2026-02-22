import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import particleConfig from "../config/particleConfig"

export default function BackgroundParticles() {
  const particlesInit = async (main) => {
    await loadFull(main)
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={particleConfig}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  )
}
