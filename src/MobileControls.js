import React from 'react';
import useKeyboardControls from './hooks/useKeyboardControls';

const MobileControls = () => {
  const { movement, setMovement } = useKeyboardControls();

  // Set styles for buttons
  const buttonStyle = {
    position: 'absolute',
    bottom: '20px',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    outline: 'none',
    pointerEvents: 'auto', // Ensure buttons are clickable
  };

  const handleButtonClick = (direction) => {
    switch (direction) {
      case 'forward':
        setMovement((prev) => ({ ...prev, forward: true }));
        break;
      case 'backward':
        setMovement((prev) => ({ ...prev, backward: true }));
        break;
      case 'left':
        setMovement((prev) => ({ ...prev, left: true }));
        break;
      case 'right':
        setMovement((prev) => ({ ...prev, right: true }));
        break;
      default:
        break;
    }
  };

  const handleButtonRelease = (direction) => {
    switch (direction) {
      case 'forward':
        setMovement((prev) => ({ ...prev, forward: false }));
        break;
      case 'backward':
        setMovement((prev) => ({ ...prev, backward: false }));
        break;
      case 'left':
        setMovement((prev) => ({ ...prev, left: false }));
        break;
      case 'right':
        setMovement((prev) => ({ ...prev, right: false }));
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <button
        style={{ ...buttonStyle, left: '20px' }}
        onTouchStart={() => handleButtonClick('left')}
        onTouchEnd={() => handleButtonRelease('left')}
      >
        L
      </button>
      <button
        style={{ ...buttonStyle, right: '20px' }}
        onTouchStart={() => handleButtonClick('right')}
        onTouchEnd={() => handleButtonRelease('right')}
      >
        R
      </button>
      <button
        style={{ ...buttonStyle, bottom: '80px', left: '50%' }}
        onTouchStart={() => handleButtonClick('forward')}
        onTouchEnd={() => handleButtonRelease('forward')}
      >
        F
      </button>
      <button
        style={{ ...buttonStyle, bottom: '20px', left: '50%' }}
        onTouchStart={() => handleButtonClick('backward')}
        onTouchEnd={() => handleButtonRelease('backward')}
      >
        B
      </button>
    </div>
  );
};

export default MobileControls;
