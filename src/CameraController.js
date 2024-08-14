import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import useKeyboardControls from './hooks/useKeyboardControls';

const CameraController = () => {
  const { movement } = useKeyboardControls();
  const cameraRef = useRef();
  const { camera } = useThree();
  const initialPosition = useRef(new THREE.Vector3(0, 1.5, -1.5));

  useEffect(() => {
    camera.position.copy(initialPosition.current);
  }, [camera]);

  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());

  const startSwipe = useRef(null);
  const currentRotation = useRef({
    y: 0, // Horizontal rotation
  });

  const handleTouchStart = (event) => {
    startSwipe.current = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
    event.preventDefault(); // Prevent scrolling when touching the screen
  };

  const handleTouchMove = (event) => {
    if (startSwipe.current) {
      const dx = event.touches[0].clientX - startSwipe.current.x;

      // Update the horizontal rotation based on horizontal swipe
      currentRotation.current.y -= dx * 0.002; // Adjust sensitivity as needed

      // Apply the horizontal rotation to the camera
      camera.rotation.y = currentRotation.current.y;

      // Update startSwipe reference for continuous swipe handling
      startSwipe.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    }
    event.preventDefault(); // Prevent scrolling when moving the camera
  };

  const handleTouchEnd = () => {
    startSwipe.current = null;
  };

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useFrame(({ camera }) => {
    if (cameraRef.current && movement) {
      velocity.current.set(0, 0, 0);

      if (movement.forward) velocity.current.z += 0.05;
      if (movement.backward) velocity.current.z -= 0.05;
      if (movement.left) velocity.current.x -= 0.05;
      if (movement.right) velocity.current.x += 0.05;

      camera.getWorldDirection(direction.current);
      direction.current.y = 0;
      direction.current.normalize();

      const horizontalVelocity = direction.current.multiplyScalar(velocity.current.z);
      horizontalVelocity.x += velocity.current.x;

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
