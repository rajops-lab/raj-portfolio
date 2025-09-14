import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial, Stars, Text, Float, Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Animated particle system
function ParticleField({ count = 1000 }) {
  const mesh = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    return positions;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <Points ref={mesh} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ff41"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Floating geometric shapes
function FloatingGeometry() {
  return (
    <>
      <Float speed={1} rotationIntensity={1} floatIntensity={2}>
        <Box args={[0.5, 0.5, 0.5]} position={[2, 1, -2]}>
          <meshStandardMaterial 
            color="#00ff41" 
            transparent 
            opacity={0.3}
            wireframe
          />
        </Box>
      </Float>

      <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
        <Torus args={[0.3, 0.1, 16, 32]} position={[-2, -1, 1]}>
          <meshStandardMaterial 
            color="#39ff14" 
            transparent 
            opacity={0.4}
            wireframe
          />
        </Torus>
      </Float>

      <Float speed={0.8} rotationIntensity={0.5} floatIntensity={3}>
        <Sphere args={[0.3]} position={[0, 2, -3]}>
          <meshStandardMaterial 
            color="#00ffff" 
            transparent 
            opacity={0.2}
            wireframe
          />
        </Sphere>
      </Float>
    </>
  );
}

// Interactive wireframe grid
function WireframeGrid() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, -5]}>
      <planeGeometry args={[20, 20, 50, 50]} />
      <meshBasicMaterial 
        color="#00ff41" 
        wireframe 
        transparent 
        opacity={0.1}
      />
    </mesh>
  );
}

// Matrix-style digital rain
function MatrixRain({ count = 100 }) {
  const mesh = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    return positions;
  }, [count]);

  useFrame(() => {
    if (mesh.current) {
      const positions = mesh.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] -= 0.02;
        
        if (positions[i * 3 + 1] < -5) {
          positions[i * 3 + 1] = 5;
          positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
      }
      
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={mesh} positions={particlesPosition} stride={3}>
      <PointMaterial
        transparent
        color="#00ff41"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Camera controller for mouse interaction
function CameraController() {
  const { camera, gl } = useThree();
  
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      camera.position.x += (x * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (y * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
    };

    gl.domElement.addEventListener('mousemove', handleMouseMove);
    return () => gl.domElement.removeEventListener('mousemove', handleMouseMove);
  }, [camera, gl]);

  return null;
}

// Neon text floating in 3D space
function NeonText() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Text
        position={[0, 0, 2]}
        fontSize={0.5}
        color="#00ff41"
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Bold.woff"
      >
        RAJESH AVHAD
        <meshStandardMaterial
          color="#00ff41"
          transparent
          opacity={0.8}
          emissive="#00ff41"
          emissiveIntensity={0.2}
        />
      </Text>
    </Float>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00ff41" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#39ff14" />
      
      <CameraController />
      <ParticleField count={2000} />
      <MatrixRain count={150} />
      <FloatingGeometry />
      <WireframeGrid />
      <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade />
    </>
  );
}

// Main component
const Interactive3DBackground: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    // Fallback to simple animated background if 3D fails
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-cyber-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-20 animate-pulse" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ 
          position: [0, 0, 5], 
          fov: 60,
          near: 0.1,
          far: 100 
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        style={{ 
          background: 'radial-gradient(ellipse at bottom, #0d1b2a 0%, #000000 100%)'
        }}
        onCreated={(state) => {
          // Canvas created successfully
          console.log('3D Canvas initialized');
        }}
        onError={(error) => {
          console.error('3D Canvas error:', error);
          setHasError(true);
        }}
      >
        <Scene />
      </Canvas>
      
      {/* Overlay gradients for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-black/20 to-cyber-black/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-black/30 via-transparent to-cyber-black/30 pointer-events-none" />
    </div>
  );
};

export default Interactive3DBackground;