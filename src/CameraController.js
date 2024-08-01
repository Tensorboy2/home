import React, { useRef, useEffect } from 'react';
import { useFrame, useThree} from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import useKeyboardControls from './hooks/useKeyboardControls';
import * as THREE from 'three';

const CameraController = () => {
  const movement = useKeyboardControls();
  const cameraRef = useRef();
  const { camera } = useThree();
  const initialPosition = useRef(new THREE.Vector3(0, 1.5, -1.5));
  useEffect(() => {
    camera.position.copy(initialPosition.current);
  }, [camera]);
  
  const velocity = useRef(new THREE.Vector3());
  useFrame(({ camera }) => {
    if (cameraRef.current) {
      cameraRef.current.getWorldDirection(cameraRef.current.position);
      velocity.current.set(0, 0, 0);

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
      if (movement.up) {
        velocity.current.y += 0.05;
      }
      if (movement.down) {
        velocity.current.y -= 0.05;
      }

      velocity.current.applyQuaternion(camera.quaternion);
      camera.position.add(velocity.current);
    }
  });

  return (
    <>
      <perspectiveCamera ref={cameraRef} fov={60} ma />
      <PointerLockControls />
    </>
  );
};

export default CameraController;
