// src/components/ShootingComets.jsx
import { Trail } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Vector3 } from "three";

function ShootingComet({ start, end, speed = 0.08, delay = 0, color = "#bfe9ff" }) {
  const cometRef = useRef();
  const from = useMemo(() => new Vector3(...start), [start]);
  const to = useMemo(() => new Vector3(...end), [end]);
  const pos = useMemo(() => new Vector3(), []);

  useFrame(({ clock }) => {
    if (!cometRef.current) return;

    const t = (clock.elapsedTime * speed + delay) % 1;
    pos.lerpVectors(from, to, t);
    cometRef.current.position.copy(pos);
  });

  return (
    <>
      <group ref={cometRef}>
        <mesh>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="white" />
        </mesh>
      </group>

      <Trail
        target={cometRef}
        width={1.2}
        length={7}
        color={color}
        attenuation={(t) => t * t}
      />
    </>
  );
}

const comets = [
  { start: [-35, 12, 55], end: [35, 3, 20], delay: 0.1 },
  { start: [25, 16, 75], end: [-30, 5, 30], delay: 0.45, speed: 0.06, color: "#ffd6a5" },
  { start: [-20, 8, 90], end: [40, 18, 45], delay: 0.75, speed: 0.05, color: "#d6c4ff" },
  { start: [-45, 20, 80], end: [20, 8, 35], delay: 0.25, speed: 0.07 },
  { start: [40, 10, 70], end: [-35, 18, 25], delay: 0.6, speed: 0.04, color: "#a7f3ff" },
  { start: [-10, 22, 95], end: [45, 6, 50], delay: 0.9, speed: 0.055, color: "#ffffff" },
  { start: [15, 28, 105], end: [-42, 12, 52], delay: 0.35, speed: 0.045, color: "#bfe9ff" },
  { start: [-50, 6, 65], end: [18, 20, 28], delay: 0.8, speed: 0.065, color: "#ffe7c7" },
];

export function ShootingComets() {
  return (
    <group>
      {comets.map((comet, index) => (
        <ShootingComet key={index} {...comet} />
      ))}
    </group>
  );
}
