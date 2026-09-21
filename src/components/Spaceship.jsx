import { useRef, forwardRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import gsap from 'gsap';
import { SimpleTrail } from './SimpleTrail';

const Spaceship = forwardRef(({ onSelect }, ref) =>{
  const cameraTargetRef = useRef();
  const cameraPositionRef = useRef();

  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());
  const introLookAt = useRef(new Vector3());

  const cameraMode = useRef("intro"); // "intro" or "follow"
  const { camera } = useThree();
  const { scene } = useGLTF('/models/Spaceship.glb');

  //GSAP intro animation
  useEffect(() => {
    const startPos = { x: 0, y: 10, z: -25 };
    const endPos = { x: 0, y: 2, z: -5 };

    //set intial camera position
    camera.position.set(startPos.x, startPos.y, startPos.z);
    camera.lookAt(0, 0.5, 2);

    //GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        if (cameraTargetRef.current) {
          cameraTargetRef.current.getWorldPosition(cameraLookAt.current);
          camera.lookAt(cameraLookAt.current);
        }

        cameraMode.current = "follow"; //enable follow mode after intro
      }
    });

    tl.to(camera.position, {
      x: endPos.x,
      y: endPos.y,
      z: endPos.z,
      duration: 3,
      ease: "power2.inOut",
      onUpdate: () => {
        if (cameraTargetRef.current) {
          cameraTargetRef.current.getWorldPosition(introLookAt.current);
          camera.lookAt(introLookAt.current);
        }
      }
    });

    return () => { tl.kill(); }
  }, [camera]);

  //Camera follow logic
  useFrame(({ camera }) => {
    if (cameraMode.current !== "follow") return;
    if (cameraPositionRef.current) {
      cameraPositionRef.current.getWorldPosition(cameraWorldPosition.current);
      camera.position.lerp(cameraWorldPosition.current, 0.1);
    }

    if (cameraTargetRef.current) {
      cameraTargetRef.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);
      camera.lookAt(cameraLookAt.current);
    }
  });

  return (
    <>
    <group ref={ref}>
      {/* Camera target: where the camera should look */}
      <group ref={cameraTargetRef} position={[0, 0.5, 2]} />

      {/* Camera position: where the camera should move */}
      <group ref={cameraPositionRef} position={[0, 2, -5]} />

      {/* Spaceship model */}
      <primitive
        object={scene}
        scale={0.004}
        position={[0, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(ref.current.position);
        }}
      />
       {/* <group ref={engineRef} position={[0, 0, -1.5]} /> */}
    </group>
       <SimpleTrail
        target={ref}
        color={"#ff3d1f"}
        offset={[0, 0, -0.8]}
        height={0.7}
        opacity={0.75}
        intensity={8}
        numPoints={36}
        minDistance={0.04}
       />
    </>
  );
});
export default Spaceship;
