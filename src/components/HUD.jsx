// src/components/HUD.jsx
import { Html } from '@react-three/drei';

export default function HUD({ selectedPos }) {
  if (!selectedPos) return null;

  const { x, y, z } = selectedPos;

  return (
    <Html style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(0,0,0,0.6)',
          padding: '8px 12px',
          color: 'white',
          borderRadius: '8px',
          fontFamily: 'monospace',
          fontSize: '14px',
        }}
      >
        <b>Selected Object</b>
        <div>X: {x.toFixed(2)}</div>
        <div>Y: {y.toFixed(2)}</div>
        <div>Z: {z.toFixed(2)}</div>
      </div>
    </Html>
  );
}
