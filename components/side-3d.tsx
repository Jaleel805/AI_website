"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Environment, Float, MeshDistortMaterial, Sphere, Torus } from "@react-three/drei"
import type * as THREE from "three"

function FloatingShape({
  position,
  color,
  scale = 1,
  shape = "sphere",
}: { position: [number, number, number]; color: string; scale?: number; shape?: "sphere" | "box" | "torus" }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.4
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4 + position[0]) * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {shape === "sphere" && <sphereGeometry args={[1, 32, 32]} />}
        {shape === "box" && <boxGeometry args={[1.5, 1.5, 1.5]} />}
        {shape === "torus" && <torusGeometry args={[1, 0.4, 16, 100]} />}
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.8}
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  )
}

function ParticleRing() {
  const ringRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })

  const particleCount = 100
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2
    const radius = 3 + Math.random() * 0.5
    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = Math.sin(angle) * radius
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5
  }

  return (
    <points ref={ringRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#60a5fa" transparent opacity={0.8} />
    </points>
  )
}

export function Side3D() {
  return (
    <>
      {/* Environment and Lighting */}
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-5, 5, 5]} intensity={0.6} color="#3b82f6" />
      <pointLight position={[5, -5, 5]} intensity={0.6} color="#8b5cf6" />

      {/* Particle Ring */}
      <ParticleRing />

      {/* Floating Shapes */}
      <FloatingShape position={[-2, 1, 0]} color="#3b82f6" scale={0.8} shape="sphere" />
      <FloatingShape position={[2, -1, -1]} color="#8b5cf6" scale={1.0} shape="box" />
      <FloatingShape position={[0, 2, -2]} color="#06b6d4" scale={0.6} shape="torus" />
      <FloatingShape position={[-1.5, -2, 1]} color="#f59e0b" scale={0.7} shape="sphere" />
      <FloatingShape position={[1.5, 0.5, -1.5]} color="#ec4899" scale={0.9} shape="box" />

      {/* Central Rotating Element */}
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.2}>
        <group>
          <Torus args={[1.5, 0.2, 16, 100]} position={[0, 0, 0]}>
            <MeshDistortMaterial color="#6366f1" transparent opacity={0.7} distort={0.3} speed={1} wireframe />
          </Torus>
          <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]}>
            <MeshDistortMaterial color="#ffffff" transparent opacity={0.9} distort={0.2} speed={3} />
          </Sphere>
        </group>
      </Float>
    </>
  )
}
