// src/App.jsx
import { GizmoHelper, GizmoViewport, Html } from '@react-three/drei'
import {  Canvas } from '@react-three/fiber';
import SpaceScene from './scenes/SpaceScene';
import { Stars } from "@react-three/drei";
import { Suspense, useRef, useState } from "react";

import { animateFlyPath } from "./animations/flyPath";
import Sidepanel from './components/Sidepanel';
import { getStationApproachTarget } from './utils/stationApproach';



function App() {
  const spaceshipRef = useRef();

  const stations = [
    { id: "alpha", name: "Alpha Station", position: [4, 0, 10] },
    { id: "beta", name: "Beta Station", position: [-6, 0, 15] },
    { id: "gamma", name: "Gamma Station", position: [8, 0, 20] },
  ];

  const offset = [0, 0, 0];

  const [activeStation, setActiveStation] = useState(null);

 const handleEnterClick = (station) => {
  console.log("handleEnterClick fired:", station)
  if (spaceshipRef.current) {
    console.log("spaceshipRef exists:", spaceshipRef.current)
    const approachTarget = getStationApproachTarget(station, offset);
    animateFlyPath(spaceshipRef.current, approachTarget)
    setActiveStation(station.id)
  } else {
    console.log("spaceshipRef is NULL")
  }
}

  return (
    <>
    <Canvas
     shadows  gl={{ antialias: true }}
     style={{ width: '100vw', height: '100vh', background: "#020207" }}>
        <Stars
        radius={200}        // how far the stars spread
        depth={50}          // star field depth
        count={5000}        // number of stars
        factor={10}          // star size factor
        saturation={0}      // no color tint
        fade                // makes stars fade in/out as you move
        />
   <Suspense fallback={null}>
    <SpaceScene
      stations={stations}
      activeStation={activeStation}
      onEnter={handleEnterClick}
      spaceshipRef={spaceshipRef}
    />
  </Suspense>
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="white" />
        </GizmoHelper>
  </Canvas>

    {/* HUD directly outside canvas */}
      <div className="hud-root">
        <Sidepanel
          stations={stations}
          activeStation={activeStation}
          onEnter={handleEnterClick}
        />
      </div>
       {/* <Grid args={[50, 50]} /> */}
        </>
  );
}

export default App;
