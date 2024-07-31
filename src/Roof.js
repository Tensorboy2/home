import React from 'react';

const Roof = () => {
  return (
    <mesh position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#ffff" />
    </mesh>
  );
};

export default Roof;
