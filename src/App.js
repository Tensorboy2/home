import React from 'react';
import { Canvas } from '@react-three/fiber';
import Museum from './Museum';
import CameraController from './CameraController';
import Floor from './Floor';
import Roof from './Roof';
import MobileControls from './MobileControls'; // Import MobileControls

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <Canvas>
        <CameraController />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Museum />
        <Floor />
        <Roof />
      </Canvas>
      <div className="mobile-controls-container">
        <MobileControls /> {/* Render MobileControls */}
      </div>
    </div>
  );
}

export default App;
