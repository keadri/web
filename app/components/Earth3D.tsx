'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Earth3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Earth geometry
    const earthGeometry = new THREE.SphereGeometry(2.5, 64, 64);

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load(
      process.env.NODE_ENV === 'production' ? '/Web/textures/earth-texture.jpg' : '/textures/earth-texture.jpg',
      () => {
        console.log('Texture loaded successfully');
        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading earth texture:', error);
        setError('Failed to load earth texture');
        setIsLoading(false);
      }
    );

    // Earth material
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 25
    });

    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Add atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(2.53, 64, 64);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x0077ff,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    camera.position.z = 7;

    // Animation
    function animate() {
      earth.rotation.y += 0.002;
      atmosphere.rotation.y += 0.002;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current?.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      earthGeometry.dispose();
      earthMaterial.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-white text-xl">
          加载地球中...
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500 text-xl">
          {error}
        </div>
      )}
    </div>
  );
};

export default Earth3D; 