import React from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";

const StarryBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      init={particlesInit}
      options={{
        background: {
          color: "#000", // Чёрный фон
        },
        particles: {
          number: {
            value: 150, // Количество звезд
            density: { enable: true, area: 800 },
          },
          color: { value: "#ffffff" }, // Цвет звезд
          shape: { type: "circle" },
          opacity: {
            value: 0.8,
            random: true,
          },
          size: {
            value: 3,
            random: true,
          },
          move: {
            enable: true,
            speed: 0.2, // Скорость движения звезд
            direction: "none",
            random: true,
            outModes: { default: "out" },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse", // Звезды разлетаются при наведении мыши
            },
          },
          modes: {
            repulse: {
              distance: 80,
              duration: 0.4,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default StarryBackground;