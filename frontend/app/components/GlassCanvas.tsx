"use client";

import { useGSAP } from "@gsap/react";
import {
  Box,
  MeshTransmissionMaterial,
  Text,
  Torus,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { useControls } from "leva";
import { useRef } from "react";
import { AnimationAction, Mesh, MeshBasicMaterial, MeshPhysicalMaterial } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { calculateResponsiveScale } from "@/lib/utils";
const glassBreakAudio = new Audio("/audio/breaking-glass.mp3");
glassBreakAudio.volume = 0.5;

const GlassCanvas = () => {
  // const materialProps = useControls({
  //   thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },

  //   roughness: { value: 0, min: 0, max: 1, step: 0.1 },

  //   transmission: { value: 1, min: 0, max: 1, step: 0.1 },

  //   ior: { value: 1.2, min: 0, max: 3, step: 0.1 },

  //   chromaticAberration: { value: 0.02, min: 0, max: 1 },

  //   backside: { value: true },
  // });

  const { scene, animations } = useGLTF("/models/glass.glb");
  const glassCover = scene.getObjectByName("Cube_A_Cover") as Mesh;

  const basicMatrial = new MeshBasicMaterial({ color: "red" });
  glassCover.material = basicMatrial;
  const { actions } = useAnimations(animations, scene);
  const torusRef = useRef<Mesh>(null);
  let time = { value: 0 };

  // const material = new MeshPhysicalMaterial({
  //   thickness: 0.2,
  //   roughness: 0,
  //   transmission: 1,
  //   ior: 1.2,
  //   clearcoat: 1,
  //   clearcoatRoughness: 0,
  //   reflectivity: 0.5,
  //   color: 0x000000,
  // });
  const material = new MeshPhysicalMaterial({
    thickness: 0.2,
    roughness: 0,
    transmission: 1, // Allows light to pass through the material
    ior: 1.2,
    clearcoat: 1,
    clearcoatRoughness: 0,
    reflectivity: 0.5,
    color: 0x000000, // Base color, which will be mostly invisible due to the transparency
    opacity: 0.25, // Lower opacity for transparency
    transparent: true, // This must be true for transparency to work
  });

  scene.traverse((child) => {
    if (child instanceof Mesh) {
      child.material = material;
    }
  });

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    new ScrollTrigger({});
    const section3 = document.querySelector(".section3");

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section3 as HTMLElement,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        // onLeave: () => {
        //   // gsap.set(glassCover.material, { opacity: 0 });
        //   glassCover.visible = false;
        // },
        // onEnterBack: () => {
        //   // gsap.set(glassCover.material, { opacity: 1 });
        //   glassCover.visible = true;
        // },
      },
    });

    timeline
      .to(glassCover.material, {
        opacity: 0,
        duration: 1,
        onStart: () => {
          glassCover.visible = false;
          glassBreakAudio.play();
        },
      })
      .to(time, {
        value: 1,
        scrollTrigger: {
          trigger: section3 as HTMLElement,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: () => {
            Object.keys(actions).forEach((key) => {
              const action = actions[key] as AnimationAction;
              action.play().paused = true;
              action.time = time.value;
            });
          },
        },
      });
  }, []);

  return (
    // <group scale={[5.2, 2.85, 1]}>
    <group scale={[calculateResponsiveScale("x"), calculateResponsiveScale("y"), 1]}>
      <primitive object={scene} ref={torusRef} />
    </group>
  );
};

export default GlassCanvas;

{
  /* <Text position={[0, 0, -2]} fontSize={1} color="white" anchorX="center" anchorY="middle">
        hello world!
      </Text>
      <Box args={[viewport.width, viewport.height, 0.3]} {...materialProps} ref={torusRef}>
        {/* <Torus args={[10, 3, 16, 100, 6]} scale={0.2} ref={torusRef}> */
}
//<MeshTransmissionMaterial {...materialProps} />
{
  /* </Torus> */
}
//</Box> */}
