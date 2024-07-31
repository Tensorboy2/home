import React from 'react';
import { Canvas } from '@react-three/fiber';
import Museum from './Museum';
import CameraController from './CameraController';
import Floor from './Floor';
import Roof from './Roof';

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas>
        <CameraController />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Museum />
        <Floor />
        <Roof />
      </Canvas>
    </div>
  );
}

export default App;
