"use client";

import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import { Plane, shaderMaterial, useGLTF, useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { easing } from "maath";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { updateIntroCompleted } from "../state/glsl/glslSlice";

// @ts-ignore
export default function FadingImageDisplacement({ hovered = false }) {
  // const scene = useGLTF("/models/glass.glb");
  // console.log(scene);
  const hasIntroCompleted = useSelector((state: RootState) => state.glsl.hasIntroCompleted);
  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef<THREE.ShaderMaterial>(null!);
  const [texture1, texture2, dispTexture] = useTexture([
    "/images/african-headshot1.png",
    "/images/happy-Child-headshot.png",
    "/images/african-headshot1.png",
  ]);
  const { viewport, size, camera } = useThree();
  useFrame((_state, delta) => {
    // @ts-ignore
    hasIntroCompleted && easing.damp(ref.current, "dispFactor", hovered ? 1 : 0, 0.4, delta);
  });

  useGSAP(() => {
    const opacify = document.getElementsByClassName("opacify");
    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.to(camera.position, {
          z: "+=2",
          duration: 0.5,
          ease: "linear",
        });
        gsap.to(ref.current.uniforms.dispFactor, {
          value: 0,
          duration: 1,
          ease: "linear",
        });
        dispatch(updateIntroCompleted());
      },
      yoyo: true,
    });
    timeline
      .to(
        camera.position,
        {
          z: "-=2",
          duration: 8,
          ease: "linear",
        },
        "same"
      )
      .to(
        ref.current.uniforms.dispFactor,
        {
          value: 1,
          duration: 1,
          ease: "linear",
        },
        "-=4" // Start this animation 2.5 seconds into the previous animation
      )
      .to(
        opacify,
        {
          opacity: 0.6,
          duration: 5,
          ease: "linear",
        },
        "same"
      );
    return () => {
      timeline.kill(); // Clean up to prevent memory leaks if component unmounts
    };
  });

  const ImageFadeMaterialDisplacement = shaderMaterial(
    {
      effectFactor: 1.2,
      dispFactor: 0,
      tex: texture1,
      tex2: texture2,
      disp: dispTexture,
      toneMapped: false,
    },
    /*glsl*/ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
    /*glsl*/ ` 
      varying vec2 vUv;
      uniform sampler2D tex;
      uniform sampler2D tex2;
      uniform sampler2D disp;
      uniform float _rot;
      uniform float dispFactor;
      uniform float effectFactor;
      void main() {
        vec2 uv = vUv;
        vec4 disp = texture2D(disp, uv);
        vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
        vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
        vec4 _texture = texture2D(tex, distortedPosition);
        vec4 _texture2 = texture2D(tex2, distortedPosition2);
        vec4 finalTexture = mix(_texture, _texture2, dispFactor);
        gl_FragColor = finalTexture;
        #include <tonemapping_fragment>
      }`
  );

  extend({ ImageFadeMaterialDisplacement });
  // Calculate the width and height for the 9:16 aspect ratio
  const isLargeScreen = size.width > 1024; // Adjust breakpoint as needed
  const aspectRatio = isLargeScreen ? 13 / 16 : 10 / 16;
  const height = viewport.height;
  const width = height * aspectRatio;
  return (
    <Plane args={[width, height]}>
      {/* @ts-ignore */}
      <imageFadeMaterialDisplacement ref={ref} />
    </Plane>
  );
}

// #include <encodings_fragment>
