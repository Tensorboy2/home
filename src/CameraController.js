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
  const direction = useRef(new THREE.Vector3());
  
  useFrame(({ camera }) => {
    if (cameraRef.current) {
      // Reset velocity
      velocity.current.set(0, 0, 0);

      // Update velocity based on movement controls (only horizontal movement)
      if (movement.forward) velocity.current.z += 0.05;
      if (movement.backward) velocity.current.z -= 0.05;
      if (movement.left) velocity.current.x -= 0.05;
      if (movement.right) velocity.current.x += 0.05;

      // Calculate horizontal direction vector
      camera.getWorldDirection(direction.current);
      direction.current.y = 0; // Ignore vertical direction
      direction.current.normalize(); // Normalize to get only the direction without scale

      // Apply the horizontal direction to the velocity
      const horizontalVelocity = direction.current.multiplyScalar(velocity.current.z);
      horizontalVelocity.x += velocity.current.x;

      // Update camera position only with horizontal movement
      camera.position.x += horizontalVelocity.x;
      camera.position.z += horizontalVelocity.z;
    }
  });

  return (
    <>
      <perspectiveCamera ref={cameraRef} fov={60} />
      <PointerLockControls />
    </>
  );
};

export default CameraController;
