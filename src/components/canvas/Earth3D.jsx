import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import * as THREE from 'three';
import CanvasLoader from '../Loader';

// Global light position
const LIGHT_POSITION = new THREE.Vector3(50, 50, 0);

const gradientShader = {
  uniforms: {
    lightPosition: { value: LIGHT_POSITION.clone() },
    earthTexture: { value: null }
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      vUv = uv;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 lightPosition;
    uniform sampler2D earthTexture;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec2 vUv;
    void main() {
      vec3 lightDir = normalize(lightPosition - vViewPosition);
      float diffuseLightIntensity = max(dot(vNormal, lightDir), 0.0);
      
      // Calculate falloff based on distance between light and fragment
      float distanceToLight = length(lightPosition - vViewPosition);
      float falloff = 1.0 / (distanceToLight * distanceToLight);
      
      vec3 ambientLight = vec3(0.3, 0.3, 0.3); 
      vec3 texColor = texture2D(earthTexture, vUv).rgb;
      
      // Combine ambient, diffuse and falloff
      vec3 finalColor = texColor * (ambientLight + diffuseLightIntensity * falloff); 

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};


const Earth = ({ isMobile }) => {
  const earth = useGLTF("./earth/modelDraco.glb");
  
  earth.scene.traverse((child) => {
    if (child.isMesh && child.name === "planet") {
      const earthTexture = child.material.map;
      gradientShader.uniforms.earthTexture.value = earthTexture;
      child.material = new THREE.ShaderMaterial(gradientShader);
    }
  });

  return (
    <primitive
      object={earth.scene}
      scale={isMobile ? 4 : 5}
      position={isMobile ? [0, -2.0, 0] : [0, -2.0, 0]}
      rotation={[0.5, 1.8, -0.30]}
    />
  );
}


const FixedSpotlight = () => {
  const { camera, scene } = useThree();

  useEffect(() => {
    const spotLight = new THREE.SpotLight(0xffffff, 20000, 0, Math.PI / 2, 1, 2); 
    spotLight.position.copy(LIGHT_POSITION)

    const lightTarget = new THREE.Object3D();
    lightTarget.position.set(0, -2.5, 0);
    scene.add(lightTarget);
    spotLight.target = lightTarget;

    camera.add(spotLight);
    scene.add(camera);
  
    return () => {
      camera.remove(spotLight);
    };
  }, [camera, scene]);

  return null;
}

function BasicLighting() {
  return (
    <>
      <ambientLight intensity={0.03} />
    </>
  );
}


const EarthCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas 
      frameloop="demand"
      shadows
      camera={{ position: [25, 20, 20], fov: 24}}
      gl={{ preserveDrawingBuffer: true }}
    >
      <FixedSpotlight />
      <BasicLighting />
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.6}
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default EarthCanvas;
