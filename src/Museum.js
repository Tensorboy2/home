import React from 'react';
import * as THREE from 'three';
import Page from './Page';

const Museum = () => {
  const walls = [];
  const wallGeometry = new THREE.BoxGeometry(10, 3, 0.1);
  const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });

  for (let i = 0; i < 4; i++) {
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    walls.push(wall);
  }

  walls[0].position.set(0, 1.5, -5); // back wall
  walls[1].position.set(0, 1.5, 5);  // front wall
  walls[2].position.set(-5, 1.5, 0); // left wall
  walls[2].rotation.y = Math.PI / 2;
  walls[3].position.set(5, 1.5, 0);  // right wall
  walls[3].rotation.y = Math.PI / 2;

  return (
    <group>
      {walls.map((wall, index) => (
        <primitive key={index} object={wall} />
      ))}
      <Page position={[0, 1.5, -4.9]} rotation={[0, 0, 0]} content="
      Controls:
      w-forward
      s-backward
      a-left
      d-right
      q-up
      e-down
      " />
      <Page position={[0, 1.5, 4.9]} rotation={[0, Math.PI, 0]} content="Page 2" />
      <Page position={[-4.9, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} content="Page 3" />
      <Page position={[4.9, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} content="Page 4" />
    </group>
  );
};

export default Museum;
