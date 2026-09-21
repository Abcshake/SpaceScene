import  Spaceship from '../components/Spaceship';
import  SpaceStation from '../components/SpaceStation';
import Planet from '../components/Planet';
import { Html } from '@react-three/drei';
import { useState } from 'react';
import { ArrivalText } from '../components/ArrivalText';
import { ShootingComets } from '../components/ShootingComets';

export default function SpaceScene({
  spaceshipRef,
  stations,
  activeStation,
  onEnter
}) {
  const [, setSelectedPos] = useState(null);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 10]} intensity={1} />

      {stations.map(station => (
        <group key={station.id}>
          <SpaceStation position={station.position} onSelect={setSelectedPos} />

          {activeStation !== station.id && (
            <Html
              pointerEvents="auto"
              occlude={false}
              position={[
                station.position[0],
                station.position[1],
                station.position[2]
              ]}
            >
              <button onClick={() => onEnter(station)}>
                Enter {station.name}
              </button>
            </Html>
          )}
           <ArrivalText
              spaceshipRef={spaceshipRef}
              station={station}
              threshold={0.75}
            >
              <div style={{ background: "white", padding: "8px", borderRadius: "6px" }}>
                You have arrived at {station.name}
            </div>
      </ArrivalText>

        </group>
      ))}
      <Spaceship ref={spaceshipRef} onSelect={setSelectedPos} />

      <ShootingComets />
      <Planet />
    </>
  );
}
