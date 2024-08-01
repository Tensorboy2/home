import { useEffect, useState } from 'react';

const useKeyboardControls = () => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
  });

  const handleKeyDown = (event) => {
    switch (event.code) {
      case 'KeyW':
        setMovement((m) => ({ ...m, forward: true }));
        break;
      case 'KeyS':
        setMovement((m) => ({ ...m, backward: true }));
        break;
      case 'KeyA':
        setMovement((m) => ({ ...m, left: true }));
        break;
      case 'KeyD':
        setMovement((m) => ({ ...m, right: true }));
        break;
      case 'KeyQ':
        setMovement((m) => ({ ...m, up: true }));
        break; 
      case 'KeyE':
        setMovement((m) => ({ ...m, down: true }));
        break; 
      default:
        break;
    }
  };

  const handleKeyUp = (event) => {
    switch (event.code) {
      case 'KeyW':
        setMovement((m) => ({ ...m, forward: false }));
        break;
      case 'KeyS':
        setMovement((m) => ({ ...m, backward: false }));
        break;
      case 'KeyA':
        setMovement((m) => ({ ...m, left: false }));
        break;
      case 'KeyD':
        setMovement((m) => ({ ...m, right: false }));
        break;
      case 'KeyQ':
        setMovement((m) => ({ ...m, up: false }));
        break; 
      case 'KeyE':
        setMovement((m) => ({ ...m, down: false }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return movement;
};

export default useKeyboardControls;
