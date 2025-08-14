import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import useKeyboardControls from './hooks/useKeyboardControls';

const CameraController = () => {
  const { movement } = useKeyboardControls();
  const roomBounds = {
    minX: -4.5,
    maxX: 4.5,
    minZ: -4.5,
    maxZ: 4.5,
    floorY: 1.5,
    ceilingY: 2.9,
  };
  const isJumping = useRef(false);
  const velocityY = useRef(0);
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

  useEffect(() => {
    const handleJump = (e) => {
      if (e.code === 'Space' && !isJumping.current) {
        isJumping.current = true;
        velocityY.current = 0.13; // jump strength
      }
    };
    const handleMobileJump = () => {
      if (!isJumping.current) {
        isJumping.current = true;
        velocityY.current = 0.13;
      }
    };
    window.addEventListener('keydown', handleJump);
    window.addEventListener('mobile-jump', handleMobileJump);
    return () => {
      window.removeEventListener('keydown', handleJump);
      window.removeEventListener('mobile-jump', handleMobileJump);
    };
  }, []);

  // Listen for mobile-look event for drag-to-look
  React.useEffect(() => {
    const handleMobileLook = (e) => {
      const dx = e.detail.dx;
      currentRotation.current.y -= dx * 0.002;
      camera.rotation.y = currentRotation.current.y;
    };
    window.addEventListener('mobile-look', handleMobileLook);
    return () => window.removeEventListener('mobile-look', handleMobileLook);
  }, [camera]);

  useFrame(({ camera }) => {
    if (cameraRef.current && movement) {
      velocity.current.set(0, 0, 0);

      // Get forward direction
      camera.getWorldDirection(direction.current);
      direction.current.y = 0;
      direction.current.normalize();

      // Get right direction
      const up = new THREE.Vector3(0, 1, 0);
      const right = new THREE.Vector3().crossVectors(direction.current, up).normalize();

      let moveVector = new THREE.Vector3();
      if (movement.forward) moveVector.add(direction.current);
      if (movement.backward) moveVector.sub(direction.current);
      if (movement.left) moveVector.sub(right);
      if (movement.right) moveVector.add(right);
      moveVector.normalize();
      moveVector.multiplyScalar(0.05);

      // Calculate new position
      let newX = camera.position.x + moveVector.x;
      let newZ = camera.position.z + moveVector.z;

      // Collision detection with room bounds
      if (newX < roomBounds.minX) newX = roomBounds.minX;
      if (newX > roomBounds.maxX) newX = roomBounds.maxX;
      if (newZ < roomBounds.minZ) newZ = roomBounds.minZ;
      if (newZ > roomBounds.maxZ) newZ = roomBounds.maxZ;

      camera.position.x = newX;
      camera.position.z = newZ;

      // Gravity and jumping
      if (isJumping.current) {
        camera.position.y += velocityY.current;
        velocityY.current -= 0.008; // gravity
        if (camera.position.y <= roomBounds.floorY) {
          camera.position.y = roomBounds.floorY;
          isJumping.current = false;
          velocityY.current = 0;
        }
        if (camera.position.y > roomBounds.ceilingY) {
          camera.position.y = roomBounds.ceilingY;
          velocityY.current = 0;
        }
      } else {
        camera.position.y = roomBounds.floorY;
      }
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
