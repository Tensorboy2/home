import { useState, useCallback, useEffect } from 'react';

const useKeyboardControls = () => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
  });

  const handleKeyDown = useCallback((event) => {
    switch (event.code) {
      case 'KeyW':
        setMovement((prev) => ({ ...prev, forward: true }));
        break;
      case 'KeyS':
        setMovement((prev) => ({ ...prev, backward: true }));
        break;
      case 'KeyA':
        setMovement((prev) => ({ ...prev, left: true }));
        break;
      case 'KeyD':
        setMovement((prev) => ({ ...prev, right: true }));
        break;
      default:
        break;
    }
  }, []);

  const handleKeyUp = useCallback((event) => {
    switch (event.code) {
      case 'KeyW':
        setMovement((prev) => ({ ...prev, forward: false }));
        break;
      case 'KeyS':
        setMovement((prev) => ({ ...prev, backward: false }));
        break;
      case 'KeyA':
        setMovement((prev) => ({ ...prev, left: false }));
        break;
      case 'KeyD':
        setMovement((prev) => ({ ...prev, right: false }));
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return { movement, setMovement };
};

export default useKeyboardControls;
