import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleSphere() {
  const pointsRef = useRef();

  // Create particles
  const particles = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const radius = 2.5;

    for (let i = 0; i < count; i++) {
      // Uniform distribution on sphere surface
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      // Add some noise/volume
      const noise = (Math.random() - 0.5) * 0.2;
      positions[i * 3] = x + noise;
      positions[i * 3 + 1] = y + noise;
      positions[i * 3 + 2] = z + noise;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Slow rotation
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.x += 0.0005;

      // Mouse interaction (parallax)
      const { mouse } = state;
      // Interpolate rotation based on mouse position
      pointsRef.current.rotation.x += (mouse.y * 0.1 - pointsRef.current.rotation.x) * 0.05;
      pointsRef.current.rotation.y += (mouse.x * 0.1 - pointsRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
