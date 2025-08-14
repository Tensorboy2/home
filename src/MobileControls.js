import React, { useRef, useState } from 'react';
import useKeyboardControls from './hooks/useKeyboardControls';

// Simple mobile device detection
const isMobile = () => /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

const MobileControls = () => {
  const { setMovement } = useKeyboardControls();
  const joystickRef = useRef(null);
  const dragAreaRef = useRef(null);
  const dragStart = useRef(null);
  const [knobPos, setKnobPos] = useState({ x: 70, y: 70 }); // center by default

  // Joystick logic
  const handleJoystickStart = (e) => {
    const rect = joystickRef.current.getBoundingClientRect();
    dragStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      rect,
    };
    setMovement({ forward: false, backward: false, left: false, right: false });
    setKnobPos({ x: 70, y: 70 });
  };

  const handleJoystickMove = (e) => {
    if (!dragStart.current) return;
    const rect = dragStart.current.rect;
    const touch = e.touches[0];
    const localX = touch.clientX - rect.left;
    const localY = touch.clientY - rect.top;
    // Clamp knob position to joystick area
    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
    const knobX = clamp(localX, 0, rect.width);
    const knobY = clamp(localY, 0, rect.height);
    setKnobPos({ x: knobX, y: knobY });

    // Calculate movement direction
    const dx = knobX - rect.width / 2;
    const dy = knobY - rect.height / 2;
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
    setKnobPos({ x: 70, y: 70 }); // Reset knob to center
  };

  // Drag-to-look logic
  const lookStart = useRef(null);
  // For tap-to-jump
  const tapTimeout = useRef(null);
  const tapStart = useRef(null);
  const handleLookStart = (e) => {
    lookStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    tapStart.current = Date.now();
    tapTimeout.current = setTimeout(() => {
      tapTimeout.current = null;
    }, 300); // 300ms threshold for tap
  };
  const handleLookMove = (e) => {
    if (!lookStart.current) return;
    const dx = e.touches[0].clientX - lookStart.current.x;
    window.dispatchEvent(new CustomEvent('mobile-look', { detail: { dx } }));
    lookStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    // If moved, cancel tap
    if (tapTimeout.current) {
      clearTimeout(tapTimeout.current);
      tapTimeout.current = null;
    }
  };
  const handleLookEnd = () => {
    // If tapTimeout is still active, treat as tap (jump)
    if (tapTimeout.current && tapStart.current) {
      window.dispatchEvent(new CustomEvent('mobile-jump'));
      clearTimeout(tapTimeout.current);
      tapTimeout.current = null;
    }
    lookStart.current = null;
    tapStart.current = null;
  };

  if (!isMobile()) return null;
  return (
    <>
      {/* Joystick for movement */}
      <div
        ref={joystickRef}
        style={{
          position: 'absolute',
          left: '20px',
          bottom: '20px',
          width: '140px',
          height: '140px',
          background: 'rgba(50,50,50,0.3)',
          borderRadius: '50%',
          touchAction: 'none',
          zIndex: 10,
          userSelect: 'none',
        }}
        onTouchStart={handleJoystickStart}
        onTouchMove={handleJoystickMove}
        onTouchEnd={handleJoystickEnd}
      >
        <div style={{
          position: 'absolute',
          left: `${knobPos.x - 25}px`,
          top: `${knobPos.y - 25}px`,
          width: '50px',
          height: '50px',
          background: '#333',
          borderRadius: '50%',
          boxShadow: '0 0 10px #222',
          transition: dragStart.current ? 'none' : 'left 0.2s, top 0.2s',
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
