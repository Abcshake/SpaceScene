import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { getStationApproachTarget } from "../utils/stationApproach";

export function ArrivalText({
  spaceshipRef,
  station,
  threshold = 0.75,
  offset = [0, 2, 0],
  approachOffset = [0, 0, 0],
  children
}) {
  const [arrived, setArrived] = useState(false);

  useFrame(() => {
    if (!spaceshipRef.current) return;

    const ship = spaceshipRef.current.position;
    const target = getStationApproachTarget(station, approachOffset);

    const dx = ship.x - target[0];
    const dy = ship.y - target[1];
    const dz = ship.z - target[2];
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

    if (dist < threshold && !arrived) setArrived(true);
    if (dist >= threshold && arrived) setArrived(false);
  });

  if (!arrived) return null;

  return (
    <Html
      transform
      sprite
      pointerEvents="auto"
      occlude={false}
      position={[
        station.position[0] + offset[0],
        station.position[1] + offset[1],
        station.position[2] + offset[2]
      ]}
    >
      <div className="arrival-screen">
        <div className="arrival-screen__scanline" />
        <div className="arrival-screen__surface">
          <div className="arrival-screen__bar" />
          <div className="arrival-screen__content">
            <div className="arrival-screen__label">Arrived at Space Station</div>
            <div className="arrival-screen__message">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Html>
  );
}
