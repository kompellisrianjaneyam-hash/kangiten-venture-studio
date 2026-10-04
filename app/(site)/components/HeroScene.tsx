"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";

const nodes = [
  { x: 14, y: 22, size: 3 },
  { x: 27, y: 14, size: 2 },
  { x: 42, y: 25, size: 4 },
  { x: 58, y: 15, size: 2 },
  { x: 74, y: 24, size: 3 },
  { x: 88, y: 17, size: 2 },

  { x: 20, y: 43, size: 2 },
  { x: 35, y: 51, size: 3 },
  { x: 51, y: 43, size: 2 },
  { x: 68, y: 52, size: 4 },
  { x: 84, y: 43, size: 2 },

  { x: 13, y: 68, size: 2 },
  { x: 29, y: 78, size: 3 },
  { x: 46, y: 68, size: 2 },
  { x: 63, y: 80, size: 3 },
  { x: 79, y: 68, size: 2 },
  { x: 91, y: 77, size: 3 },
];

const connections = [
  [14, 22, 27, 14],
  [27, 14, 42, 25],
  [42, 25, 58, 15],
  [58, 15, 74, 24],
  [74, 24, 88, 17],

  [20, 43, 35, 51],
  [35, 51, 51, 43],
  [51, 43, 68, 52],
  [68, 52, 84, 43],

  [13, 68, 29, 78],
  [29, 78, 46, 68],
  [46, 68, 63, 80],
  [63, 80, 79, 68],
  [79, 68, 91, 77],

  [14, 22, 20, 43],
  [42, 25, 35, 51],
  [58, 15, 51, 43],
  [74, 24, 68, 52],
  [88, 17, 84, 43],

  [20, 43, 13, 68],
  [35, 51, 29, 78],
  [51, 43, 46, 68],
  [68, 52, 63, 80],
  [84, 43, 79, 68],
];

export default function HeroScene() {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 28,
    damping: 26,
    mass: 0.7,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 28,
    damping: 26,
    mass: 0.7,
  });

  useEffect(() => {
    setMounted(true);

    if (reducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set(event.clientX / window.innerWidth - 0.5);
      pointerY.set(event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [pointerX, pointerY, reducedMotion]);

  if (!mounted) {
    return <div className="venture-field" aria-hidden="true" />;
  }

  const parallaxStyle = reducedMotion
    ? undefined
    : {
        x: smoothX,
        y: smoothY,
      };

  return (
    <div className="venture-field" aria-hidden="true">
      {/* Technical coordinate field */}
      <div className="venture-grid" />

      {/* Large-scale system geometry */}
      <motion.div
        className="venture-orbit venture-orbit-a"
        style={parallaxStyle}
      />

      <motion.div
        className="venture-orbit venture-orbit-b"
        style={parallaxStyle}
      />

      <motion.div
        className="venture-orbit venture-orbit-c"
        style={parallaxStyle}
      />

      {/* Central system */}
      <motion.div className="venture-core" style={parallaxStyle}>
        <div className="venture-core-ring venture-core-ring-one" />
        <div className="venture-core-ring venture-core-ring-two" />
        <div className="venture-core-ring venture-core-ring-three" />

        <div className="venture-core-cross horizontal" />
        <div className="venture-core-cross vertical" />

        <span className="venture-core-point" />
      </motion.div>

      {/* Distributed system connections */}
      <svg
        className="venture-network"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {connections.map((line, index) => (
          <motion.line
            key={index}
            x1={line[0]}
            y1={line[1]}
            x2={line[2]}
            y2={line[3]}
            initial={{
              pathLength: 0,
              opacity: 0,
            }}
            animate={{
              pathLength: 1,
              opacity: reducedMotion
                ? 0.16
                : [0.06, 0.22, 0.06],
            }}
            transition={{
              pathLength: {
                duration: 1.4,
                delay: index * 0.045,
              },
              opacity: {
                duration: 5,
                delay: index * 0.12,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </svg>

      {/* Distributed nodes */}
      <div className="venture-nodes">
        {nodes.map((node, index) => (
          <motion.span
            key={index}
            className="venture-node"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: node.size,
              height: node.size,
            }}
            animate={
              reducedMotion
                ? undefined
                : {
                    opacity: [0.18, 0.7, 0.18],
                    scale: [0.9, 1.15, 0.9],
                  }
            }
            transition={{
              duration: 4 + (index % 5) * 0.5,
              delay: index * 0.13,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Single slow system sweep */}
      <motion.div
        className="venture-signal"
        animate={
          reducedMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* System coordinates */}
      <div className="venture-coordinate venture-coordinate-one">
        X 042.18
        <br />
        Y 081.04
      </div>

      <div className="venture-coordinate venture-coordinate-two">
        NODE / 07
      </div>

      <div className="venture-coordinate venture-coordinate-three">
        SYS_01
      </div>

      {/* Registration marks */}
      <div className="venture-crosshair venture-crosshair-one">
        <span />
        <span />
      </div>

      <div className="venture-crosshair venture-crosshair-two">
        <span />
        <span />
      </div>

      {/* System labels */}
      <div className="venture-edge-label venture-edge-label-one">
        BUILD
      </div>

      <div className="venture-edge-label venture-edge-label-two">
        RESEARCH
      </div>

      <div className="venture-edge-label venture-edge-label-three">
        SCALE
      </div>
    </div>
  );
}