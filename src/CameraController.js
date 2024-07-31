import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import useKeyboardControls from './hooks/useKeyboardControls';
import * as THREE from 'three';

const CameraController = () => {
  const movement = useKeyboardControls();
  const cameraRef = useRef();
  const velocity = useRef(new THREE.Vector3());

  useFrame(({ camera }) => {
    if (cameraRef.current) {
      cameraRef.current.getWorldDirection(cameraRef.current.position);
      velocity.current.set(0, 1.5, 0);

      if (movement.forward) {
        velocity.current.z -= 0.1;
      }
      if (movement.backward) {
        velocity.current.z += 0.1;
      }
      if (movement.left) {
        velocity.current.x -= 0.1;
      }
      if (movement.right) {
        velocity.current.x += 0.1;
      }

      velocity.current.applyQuaternion(camera.quaternion);
      camera.position.add(velocity.current);
    }
  });

  return (
    <>
      <perspectiveCamera ref={cameraRef} fov={60} makeDefault position={[0, 1.6, 5]} />
      <PointerLockControls />
    </>
  );
};

export default CameraController;
