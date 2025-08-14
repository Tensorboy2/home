import React, { useRef } from 'react';
import useKeyboardControls from './hooks/useKeyboardControls';

// Simple mobile device detection
const isMobile = () => /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

const MobileControls = () => {
  const { setMovement } = useKeyboardControls();
  const joystickRef = useRef(null);
  const dragAreaRef = useRef(null);
  const dragStart = useRef(null);

  // Joystick logic
  const handleJoystickStart = (e) => {
    dragStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    setMovement({ forward: false, backward: false, left: false, right: false });
  };

  const handleJoystickMove = (e) => {
    if (!dragStart.current) return;
    const dx = e.touches[0].clientX - dragStart.current.x;
    const dy = e.touches[0].clientY - dragStart.current.y;
    const threshold = 20;
    let movement = { forward: false, backward: false, left: false, right: false };
    if (dy < -threshold) movement.forward = true;
    if (dy > threshold) movement.backward = true;
    if (dx < -threshold) movement.left = true;
    if (dx > threshold) movement.right = true;
    setMovement(movement);
  };

  const handleJoystickEnd = () => {
    dragStart.current = null;
    setMovement({ forward: false, backward: false, left: false, right: false });
  };

  // Drag-to-look logic
  const lookStart = useRef(null);
  const handleLookStart = (e) => {
    lookStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };
  const handleLookMove = (e) => {
    if (!lookStart.current) return;
    const dx = e.touches[0].clientX - lookStart.current.x;
    window.dispatchEvent(new CustomEvent('mobile-look', { detail: { dx } }));
    lookStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };
  const handleLookEnd = () => {
    lookStart.current = null;
  };

  if (!isMobile()) return null;
  return (
    <>
      {/* Joystick for movement */}
      <div
        ref={joystickRef}
        style={{
          position: 'absolute',
          left: '30px',
          bottom: '30px',
          width: '100px',
          height: '100px',
          background: 'rgba(50,50,50,0.3)',
          borderRadius: '50%',
          touchAction: 'none',
          zIndex: 10,
        }}
        onTouchStart={handleJoystickStart}
        onTouchMove={handleJoystickMove}
        onTouchEnd={handleJoystickEnd}
      >
        <div style={{
          position: 'absolute',
          left: '35px',
          top: '35px',
          width: '30px',
          height: '30px',
          background: '#333',
          borderRadius: '50%',
        }} />
      </div>
      {/* Drag area for look */}
      <div
        ref={dragAreaRef}
        style={{
          position: 'absolute',
          right: '0',
          bottom: '0',
          width: '50vw',
          height: '100vh',
          zIndex: 10,
        }}
        onTouchStart={handleLookStart}
        onTouchMove={handleLookMove}
        onTouchEnd={handleLookEnd}
      />
    </>
  );
};

export default MobileControls;
