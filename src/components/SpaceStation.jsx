import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

export default function SpaceStation({ position, onSelect }) {
  const ref = useRef();
  const { scene } = useGLTF('/models/space_station.glb');

  // Clone the scene so each station is independent
  const clonedScene = clone(scene);

  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1;
  });

  return (
    <primitive
      ref={ref}
      object={clonedScene}
      position={position}
      scale={0.6}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(ref.current.position);
      }}
    />
  );
}