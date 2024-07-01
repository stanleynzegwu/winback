"use client";

import { Box, MeshTransmissionMaterial, Text, Torus } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { Mesh } from "three";

const GlassCanvas = () => {
  const { viewport } = useThree();
  const torusRef = useRef<Mesh>(null);
  useFrame(({ clock }) => {
    if (torusRef.current) {
      torusRef.current.rotation.y = clock.elapsedTime;
      torusRef.current.rotation.x = clock.elapsedTime * 0.5;
    }
  });

  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },

    roughness: { value: 0, min: 0, max: 1, step: 0.1 },

    transmission: { value: 1, min: 0, max: 1, step: 0.1 },

    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },

    chromaticAberration: { value: 0.02, min: 0, max: 1 },

    backside: { value: true },
  });

  return (
    <group>
      <Text position={[0, 0, -2]} fontSize={1} color="white" anchorX="center" anchorY="middle">
        hello world!
      </Text>
      <Box args={[4, 4, 4]} {...materialProps} ref={torusRef}>
        {/* <Torus args={[10, 3, 16, 100, 6]} scale={0.2} ref={torusRef}> */}
        <MeshTransmissionMaterial {...materialProps} />
        {/* </Torus> */}
      </Box>
    </group>
  );
};

export default GlassCanvas;
