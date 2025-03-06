'use client';

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { Mesh } from 'three'

export default function Earth() {
  const earthRef = useRef<Mesh>(null)
  const textures = useTexture({
    map: '/textures/earth-texture.jpg',
    bumpMap: '/textures/earth-bump.jpg',
    specularMap: '/textures/earth-specular.jpg',
  })
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001
    }
  })

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhongMaterial
        map={textures.map}
        bumpMap={textures.bumpMap}
        bumpScale={0.1}
        specularMap={textures.specularMap}
        specular={0x222222}
        shininess={5}
      />
    </mesh>
  )
} 