import { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useTexture } from "@react-three/drei";
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { PMREMGenerator } from 'three';
import CanvasLoader from '../Loader';
import * as THREE from 'three';

const Water = () => {
  const water = useGLTF('./fluid/modelDraco.glb');
  const { gl, scene } = useThree();
  const [envMap, setEnvMap] = useState(null);
  const hdrPath = '/3dBKG.hdr';

  useEffect(() => {
    // Load the HDR file
    new RGBELoader().load(hdrPath, (texture) => {
      const pmremGenerator = new PMREMGenerator(gl);
      pmremGenerator.compileEquirectangularShader();
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      setEnvMap(envMap);
      scene.environment = envMap; // Optional: Set it as the scene's environment
      texture.dispose();
      pmremGenerator.dispose();
    });
  }, [gl, scene]);

  // Create a reflective material
  const reflectiveMaterial = new THREE.MeshStandardMaterial({
    color: 0xaaaaaa,
    metalness: 1, // Makes it reflective
    roughness: 0, // Makes it glossy
    envMap: envMap, // Assign the environment map
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
        material={reflectiveMaterial} // Assign the reflective material
        scale={0.09}
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