"use client";

import { useCallback, useEffect, useRef } from "react";
import styles from "./LightWavesBackground.module.css";

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 255, g: 255, b: 255 };
  return {
    r: Number.parseInt(result[1], 16),
    g: Number.parseInt(result[2], 16),
    b: Number.parseInt(result[3], 16),
  };
}

export default function LightWavesBackground({
  className = "",
  children,
  colors = ["#1e3a5f", "#a12a2f", "#2a5a8f", "#8b1f24", "#1a2d47"],
  speed = 1,
  intensity = 0.6,
  bgColors = ["#0c1e33", "#111e30", "#0c1e33"],
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const wavesRef = useRef([]);
  const animationRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  const initWaves = useCallback(
    (height) => {
      const waves = [];
      const waveCount = 5;

      for (let i = 0; i < waveCount; i++) {
        waves.push({
          y: height * (0.3 + (i / waveCount) * 0.5),
          amplitude: height * (0.15 + Math.random() * 0.15),
          frequency: 0.002 + Math.random() * 0.002,
          speed: (0.2 + Math.random() * 0.3) * (i % 2 === 0 ? 1 : -1),
          phase: Math.random() * Math.PI * 2,
          color: colors[i % colors.length],
          opacity: 0.15 + Math.random() * 0.1,
        });
      }
      wavesRef.current = waves;
    },
    [colors]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;
      initWaves(height);
    };
    updateSize();

    const ro = new ResizeObserver(updateSize);
    ro.observe(container);

    const draw = () => {
      const time = (Date.now() - startTimeRef.current) * 0.001 * speed;

      /* Dark gradient background using the brand navy */
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, bgColors[0]);
      bgGradient.addColorStop(0.5, bgColors[1]);
      bgGradient.addColorStop(1, bgColors[2]);
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      /* Ambient glow spots */
      ctx.globalCompositeOperation = "lighter";

      const glowSpots = [
        {
          x: width * 0.2,
          y: height * 0.3,
          radius: Math.min(width, height) * 0.4,
          color: colors[0],
        },
        {
          x: width * 0.8,
          y: height * 0.6,
          radius: Math.min(width, height) * 0.35,
          color: colors[1],
        },
        {
          x: width * 0.5,
          y: height * 0.8,
          radius: Math.min(width, height) * 0.3,
          color: colors[2],
        },
      ];

      for (const spot of glowSpots) {
        const rgb = hexToRgb(spot.color);
        const gradient = ctx.createRadialGradient(
          spot.x + Math.sin(time * 0.3) * 50,
          spot.y + Math.cos(time * 0.2) * 30,
          0,
          spot.x + Math.sin(time * 0.3) * 50,
          spot.y + Math.cos(time * 0.2) * 30,
          spot.radius
        );
        gradient.addColorStop(
          0,
          `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.08 * intensity})`
        );
        gradient.addColorStop(
          0.5,
          `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${0.03 * intensity})`
        );
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      /* Flowing waves */
      for (const wave of wavesRef.current) {
        const rgb = hexToRgb(wave.color);

        ctx.beginPath();

        for (let x = 0; x <= width; x += 5) {
          const y =
            wave.y +
            Math.sin(x * wave.frequency + time * wave.speed + wave.phase) *
              wave.amplitude +
            Math.sin(
              x * wave.frequency * 0.5 +
                time * wave.speed * 0.7 +
                wave.phase * 1.3
            ) *
              wave.amplitude *
              0.5;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();

        const waveGradient = ctx.createLinearGradient(
          0,
          wave.y - wave.amplitude,
          0,
          height
        );
        waveGradient.addColorStop(
          0,
          `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${wave.opacity * intensity})`
        );
        waveGradient.addColorStop(
          0.3,
          `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${
            wave.opacity * 0.5 * intensity
          })`
        );
        waveGradient.addColorStop(1, "transparent");

        ctx.fillStyle = waveGradient;
        ctx.fill();
      }

      /* Subtle top glow */
      ctx.globalCompositeOperation = "source-over";
      const topRgb = hexToRgb(colors[0]);
      const topGlow = ctx.createLinearGradient(0, 0, 0, height * 0.4);
      topGlow.addColorStop(
        0,
        `rgba(${topRgb.r}, ${topRgb.g}, ${topRgb.b}, ${0.05 * intensity})`
      );
      topGlow.addColorStop(1, "transparent");
      ctx.fillStyle = topGlow;
      ctx.fillRect(0, 0, width, height * 0.4);

      animationRef.current = requestAnimationFrame(draw);
    };

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      ro.disconnect();
    };
  }, [colors, bgColors, speed, intensity, initWaves]);

  return (
    <div
      ref={containerRef}
      className={`${styles.wrapper} ${className}`}
    >
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Subtle noise texture */}
      <div className={styles.noise} />

      {/* Vignette */}
      <div className={styles.vignette} />

      {/* Content layer */}
      {children && <div className={styles.content}>{children}</div>}
    </div>
  );
}
