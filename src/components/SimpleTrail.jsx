import { useFrame } from "@react-three/fiber";
import { Trail } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import { Quaternion, Vector3 } from "three";

export function SimpleTrail({
  target = null,
  color = "#ffffff",
  numPoints = 36,
  height = 0.7,
  minDistance = 0.04,
  offset = [0, 0, -0.8],
  minSpeed = 0.01,
  alignmentThreshold = 0.35,
}) {
  const [active, setActive] = useState(false);
  const anchorRef = useRef();
  const activeRef = useRef(false);
  const localOffset = useMemo(() => new Vector3(), []);
  const shipWorldPosition = useMemo(() => new Vector3(), []);
  const previousShipWorldPosition = useMemo(() => new Vector3(), []);
  const worldPosition = useMemo(() => new Vector3(), []);
  const velocity = useMemo(() => new Vector3(), []);
  const forward = useMemo(() => new Vector3(), []);
  const worldQuaternion = useMemo(() => new Quaternion(), []);
  const trailLength = Math.max(1, Math.ceil(numPoints / 10));

  useFrame((_, delta) => {
    if (!anchorRef.current || !target?.current) return;

    localOffset.set(offset[0], offset[1], offset[2]);
    target.current.localToWorld(localOffset);
    worldPosition.copy(localOffset);

    anchorRef.current.position.copy(worldPosition);

    target.current.getWorldPosition(shipWorldPosition);
    velocity.copy(shipWorldPosition).sub(previousShipWorldPosition);
    const speed = delta > 0 ? velocity.length() / delta : 0;

    target.current.getWorldQuaternion(worldQuaternion);
    forward.set(0, 0, 1).applyQuaternion(worldQuaternion).normalize();

    const movingForward =
      speed > minSpeed && velocity.normalize().dot(forward) > alignmentThreshold;

    if (movingForward !== activeRef.current) {
      activeRef.current = movingForward;
      setActive(movingForward);
    }

    previousShipWorldPosition.copy(shipWorldPosition);
  });

  return (
    <>
      <group ref={anchorRef} />
      {active && (
        <Trail
          target={anchorRef}
          color={color}
          width={height * 4}
          length={trailLength}
          decay={1}
          stride={minDistance}
          interval={1}
          attenuation={(width) => width * width}
        />
      )}
    </>
  );
}
