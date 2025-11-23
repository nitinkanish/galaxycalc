'use client'

import { Suspense, useEffect, useState } from 'react'
import { OrbitControls, Environment, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

interface ModelViewer3DProps {
  modelUrl: string
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} scale={1} />
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" wireframe />
    </mesh>
  )
}

function Scene({ modelUrl }: { modelUrl: string }) {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      <Model url={modelUrl} />
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={10}
        autoRotate={false}
      />
      <Environment preset="sunset" />
    </Suspense>
  )
}

function ErrorFallback() {
  return (
    <div className="w-full h-[70vh] min-h-[500px] max-h-[800px] bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden flex items-center justify-center">
      <div className="text-white text-center">
        <p className="text-lg font-semibold mb-2">Failed to load 3D model</p>
        <p className="text-sm opacity-75">Please try again later</p>
      </div>
    </div>
  )
}

export function ModelViewer3D({ modelUrl }: ModelViewer3DProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return
    
    setMounted(true)
    
    // Preload models when component mounts
    const urls = [
      'https://res.cloudinary.com/dxovhtuki/image/upload/v1763905546/uranus-3d_izvghi.glb',
      'https://res.cloudinary.com/dxovhtuki/image/upload/v1763905632/mars-3d_yk0ej6.glb',
    ]
    urls.forEach(url => {
      try {
        useGLTF.preload(url)
      } catch (e) {
        // Ignore preload errors
      }
    })
  }, [])

  if (!mounted || typeof window === 'undefined') {
    return (
      <div className="w-full h-[70vh] min-h-[500px] max-h-[800px] bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-white">Loading 3D model...</div>
      </div>
    )
  }

  return (
    <div className="w-full h-[70vh] min-h-[500px] max-h-[800px] bg-gradient-to-b from-gray-900 to-black rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <Scene modelUrl={modelUrl} />
      </Canvas>
    </div>
  )
}

