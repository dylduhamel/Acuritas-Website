import { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from 'three';

import CanvasLoader from '../Loader';

const Water = () => {
  const water = useGLTF('./fluid/fluid.gltf');
  const envMap = useTexture('./3dHDRI.jpg');


  const { gl } = useThree();

  useEffect(() => {
    gl.capabilities.precision = 'highp';
  }, [gl]);


  // Ensure all materials in the model are transparent
  water.scene.traverse((child) => {
    if (child.isMesh && child.material) {
      child.material.envMap = envMap;
    }
  });

  return (
    <mesh>
      <spotLight
        position={[10, 15, 0]}
        angle={1}
        penumbra={1}
        intensity={5000}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={water.scene}
        scale={0.1}
        position-y={-2.3}
        rotation-y={0}
        transparent={true}
      />
    </mesh>
  )
}

const WaterCanvas = () => (
  <Canvas
    shadows
    frameloop="demand"
    gl={{ preserveDrawingBuffer: true }}
    camera={{ 
      fov: 45,
      near: 0.1,
      far: 200,
      position: [-4, 3, 6]
     }}
  >
    <Suspense fallback={<CanvasLoader />}>
      <OrbitControls
        autoRotate
        autoRotateSpeed={1}
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <Water />
    </Suspense>
  </Canvas>
)

export default WaterCanvas;