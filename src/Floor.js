import React from 'react';

const Floor = () => {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#rgba(175,175,175,0.5)" />
    </mesh>
  );
};

export default Floor;
