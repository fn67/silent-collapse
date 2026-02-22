const particleConfig = {
  particles: {
    number: { value: 40 },
    color: { value: "#ffffff" },
    opacity: {
      value: 0.3,
      random: true,
    },
    size: {
      value: 1.5,
      random: true,
    },
    move: {
      enable: true,
      speed: 0.3,
      direction: "none",
      random: true,
      straight: false,
    },
    links: {
      enable: false,
    },
  },
  interactivity: {
    events: {
      onHover: { enable: false },
      onClick: { enable: false },
    },
  },
  detectRetina: true,
};

export default particleConfig;
