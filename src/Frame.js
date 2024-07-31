import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Frame = ({ position, rotation }) => {
  const ref = useRef();

  useFrame(() => {
    // Animation or interaction logic
  });

  return (
    <mesh position={position} rotation={rotation} ref={ref}>
      <boxGeometry args={[1, 1.5, 0.1]} />
      <meshStandardMaterial color={'#ff6347'} />
    </mesh>
  );
};

export default Frame;
