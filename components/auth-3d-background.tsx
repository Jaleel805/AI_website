"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Environment, Float, MeshDistortMaterial, Sphere } from "@react-three/drei"
import type * as THREE from "three"

function FloatingOrb({
  position,
  color,
  scale = 1,
}: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
      <Sphere ref={meshRef} position={position} args={[scale, 32, 32]}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.4}
          distort={0.5}
          speed={2}
          roughness={0}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function WaveGeometry({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.2) * 0.5
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.2}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[2, 0.3, 16, 100]} />
        <MeshDistortMaterial color="#6366f1" transparent opacity={0.3} distort={0.4} speed={3} wireframe />
      </mesh>
    </Float>
  )
}

export function Auth3DBackground() {
  return (
    <>
      {/* Environment and Lighting */}
      <Environment preset="night" />
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, -10, -5]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[10, -10, -5]} intensity={0.8} color="#3b82f6" />

      {/* Floating Orbs */}
      <FloatingOrb position={[-4, 2, -3]} color="#3b82f6" scale={1.2} />
      <FloatingOrb position={[4, -1, -4]} color="#8b5cf6" scale={0.8} />
      <FloatingOrb position={[-2, -3, -2]} color="#06b6d4" scale={1.0} />
      <FloatingOrb position={[3, 3, -5]} color="#f59e0b" scale={0.6} />
      <FloatingOrb position={[-5, -2, -6]} color="#ec4899" scale={1.4} />
      <FloatingOrb position={[5, 1, -3]} color="#10b981" scale={0.9} />

      {/* Wave Geometries */}
      <WaveGeometry position={[0, 0, -8]} />
      <WaveGeometry position={[-3, 2, -6]} />
      <WaveGeometry position={[3, -2, -7]} />

      {/* Background Gradient Plane */}
      <mesh position={[0, 0, -10]} scale={[20, 20, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#1e1b4b" transparent opacity={0.9} />
      </mesh>
    </>
  )
}
