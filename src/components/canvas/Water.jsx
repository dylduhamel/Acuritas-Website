import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from '../Loader';

const Water = () => {
  const water = useGLTF('./fluid/fluid.gltf');

  return (
    <mesh>
      <spotLight
        position={[0, 15, 0]}
        angle={1}
        penumbra={1}
        intensity={1000}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={water.scene}
        scale={0.1}
        position-y={-2.3}
        rotation-y={0}
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