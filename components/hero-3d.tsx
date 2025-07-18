"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Html, Environment, Float, Text3D, MeshDistortMaterial, Sphere } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import type * as THREE from "three"

function FloatingGeometry({
  position,
  color,
  scale = 1,
}: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.4) * 0.2
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.8}
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const points = useRef<THREE.Points>(null)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05
      points.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#6366f1" transparent opacity={0.6} />
    </points>
  )
}

function AnimatedSphere({ position }: { position: [number, number, number] }) {
  const sphereRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.2
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
      <Sphere ref={sphereRef} position={position} args={[0.8, 64, 64]}>
        <MeshDistortMaterial
          color="#8b5cf6"
          transparent
          opacity={0.6}
          distort={0.4}
          speed={3}
          roughness={0}
          metalness={0.5}
        />
      </Sphere>
    </Float>
  )
}

export function Hero3D() {
  return (
    <>
      {/* Environment and Lighting */}
      <Environment preset="dawn" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#6366f1" />

      {/* Particle Field Background */}
      <ParticleField />

      {/* Floating Geometric Shapes */}
      <FloatingGeometry position={[-4, 2, -2]} color="#3b82f6" scale={0.8} />
      <FloatingGeometry position={[4, -1, -3]} color="#8b5cf6" scale={1.2} />
      <FloatingGeometry position={[-2, -3, -1]} color="#06b6d4" scale={0.6} />
      <FloatingGeometry position={[3, 3, -4]} color="#f59e0b" scale={0.9} />

      {/* Animated Spheres */}
      <AnimatedSphere position={[-6, 0, -5]} />
      <AnimatedSphere position={[6, 2, -6]} />

      {/* 3D Text */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.1}>
        <Text3D
          font="/fonts/Inter_Bold.json"
          position={[-3, 1, 0]}
          size={0.5}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          3D
          <MeshDistortMaterial color="#6366f1" distort={0.2} speed={2} roughness={0} metalness={0.8} />
        </Text3D>
      </Float>

      {/* HTML Overlay Content */}
      <Html
        center
        position={[0, 0, 0]}
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div className="text-center max-w-5xl px-4 pointer-events-auto">
          {/* Animated Badge */}
          <div className="mb-8 inline-flex items-center rounded-full bg-white/60 px-4 py-2 text-sm font-medium text-slate-600 shadow-lg backdrop-blur-sm border border-slate-200/60 hover:bg-white/80 transition-all duration-300 hover:scale-105 animate-fade-in-up">
            <span className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
            <span className="mr-2 h-2 w-2 rounded-full bg-green-500 absolute"></span>
            Now in Beta • Experience the Future in 3D
          </div>

          {/* Enhanced Main Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl animate-fade-in-up delay-200">
            Build Amazing
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient-x">
              Web Applications
            </span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-600 mt-4">
              In a Whole New Dimension
            </span>
          </h1>

          {/* Enhanced Description */}
          <p className="mb-10 mx-auto max-w-3xl text-lg text-slate-600 sm:text-xl leading-relaxed animate-fade-in-up delay-300">
            Create powerful, scalable web applications with our modern 3D-enhanced development platform. Ship faster,
            scale effortlessly, and delight your users with immersive experiences that stand out.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up delay-400">
            <Link href="/signup">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg px-8 py-6 border-0 relative overflow-hidden"
              >
                <span className="relative z-10">Start Building in 3D</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="group text-slate-700 border-slate-300 hover:bg-white hover:border-slate-400 hover:shadow-lg transition-all duration-300 hover:scale-105 text-lg px-8 py-6 bg-white/50 backdrop-blur-sm"
            >
              <Star className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
              Explore 3D Demo
            </Button>
          </div>
        </div>
      </Html>

      {/* Background Gradient Plane */}
      <mesh position={[0, 0, -10]} scale={[20, 20, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#1e1b4b" transparent opacity={0.8} />
      </mesh>
    </>
  )
}
