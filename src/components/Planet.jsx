import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from 'three';

export default function Planet() {
  const texture = useTexture("/textures/planet.jpg");

  const planetRef = useRef();


  useFrame((state, delta) => {
  planetRef.current.rotation.y += delta * 0.05;
});

  return (
    <group position={[0, 0, 50]} ref={planetRef}>
      {/* Planet */}
      <mesh scale={10}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Atmosphere */}
      <mesh scale={10.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#4eaaff"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}