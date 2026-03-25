// This file is lazy-loaded — Three.js only initialises after the main page renders
import { useRef, useMemo } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'
import * as THREE from 'three'

extend({ UnrealBloomPass })

function Swarm({ posData, colData }) {
  const meshRef = useRef()
  const count = 30000
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const target = useMemo(() => new THREE.Vector3(), [])
  const pColor = useMemo(() => new THREE.Color(), [])

  const positions = useMemo(() => {
    const pos = []
    for (let i = 0; i < count; i++)
      pos.push(new THREE.Vector3(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
      ))
    return pos
  }, [])

  const material = useMemo(() => new THREE.MeshBasicMaterial({ color: 0xffffff, vertexColors: true }), [])
  const geometry = useMemo(() => new THREE.TetrahedronGeometry(0.25), [])

  useFrame(() => {
    if (!meshRef.current) return
    for (let i = 0; i < count; i++) {
      const idx = i * 3
      target.set(posData[idx], posData[idx + 1], posData[idx + 2])
      pColor.setRGB(colData[idx] / 255, colData[idx + 1] / 255, colData[idx + 2] / 255)
      positions[i].lerp(target, 0.1)
      dummy.position.copy(positions[i])
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
      meshRef.current.setColorAt(i, pColor)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true
  })

  return <instancedMesh ref={meshRef} args={[geometry, material, count]} />
}

export default function ParticleCanvas({ posData, colData }) {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0 }}
      camera={{ position: [0, 0, 100], fov: 60 }}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
    >
      <fog attach="fog" args={['#0A0805', 0.01]} />
      <Swarm posData={posData} colData={colData} />
      <OrbitControls autoRotate autoRotateSpeed={0.4} enableZoom={false} enablePan={false} />
    </Canvas>
  )
}
