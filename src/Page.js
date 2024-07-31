import React from 'react';
import { Text } from '@react-three/drei';

const Page = ({ position, rotation, content }) => {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial color="#ffffff" />
      <Text position={[0, 0, 0.1]} fontSize={0.2} color="#000000">
        {content}
      </Text>
    </mesh>
  );
};

export default Page;
