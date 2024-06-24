// import { shaderMaterial, useTexture } from "@react-three/drei";
// import { extend, useFrame } from "@react-three/fiber";
// import { useRef, useState } from "react";

// // Define vertex shader as a TypeScript string
// const vertexShader: string = `
//   varying vec2 vUv;
//   void main() {
//     vUv = uv;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//   }
// `;

// // Define fragment shader as a TypeScript string
// const fragmentShader: string = `
//   varying vec2 vUv;
//   uniform sampler2D tex;
//   uniform sampler2D tex2;
//   uniform sampler2D disp;
//   uniform float _rot;
//   uniform float dispFactor;
//   uniform float effectFactor;
//   void main() {
//     vec2 uv = vUv;
//     vec4 disp = texture2D(disp, uv);
//     vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
//     vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
//     vec4 _texture = texture2D(tex, distortedPosition);
//     vec4 _texture2 = texture2D(tex2, distortedPosition2);
//     vec4 finalTexture = mix(_texture, _texture2, dispFactor);
//     gl_FragColor = finalTexture;

//     #include <tonemapping_fragment>
//     #include <encodings_fragment>
//   }
// `;

// // @ts-ignore
// export const ImageFadeMaterialDisplacement = shaderMaterial(
//   {
//     effectFactor: 1.2,
//     dispFactor: 0,
//     tex: undefined as any,
//     tex2: undefined as any,
//     disp: undefined as any,
//   },
//   vertexShader,
//   fragmentShader
// );

// // @ts-ignore
// extend({
//   ImageFadeMaterialDisplacement,
// });

// // Define the React component with TypeScript types
// export const FadingImageDisplacement: React.FC<any> = (props) => {
//   const ref = useRef<any>(null); // Use useRef with initial value of null
//   const [texture1, texture2, dispTexture] = useTexture([
//     "/images/african-headshot1.png",
//     "/images/happy-Child-headshot.png",
//     "/images/african-headshot1.png",
//   ]);
//   const [hovered, setHover] = useState(false);

//   // @ts-ignore
//   useFrame((_state, delta) => {
//     // easing.damp(ref.current, "dispFactor", hovered ? 1 : 0, 0.4, delta);
//   });

//   return (
//     // @ts-ignore
//     <mesh {...props} onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)}>
//       <planeGeometry args={[2.25, 4]} />
//       {/* @ts-ignore */}
//       <ImageFadeMaterialDisplacement
//         ref={ref}
//         tex={texture1}
//         tex2={texture2}
//         disp={dispTexture}
//         toneMapped={false}
//       />
//     </mesh>
//   );
// };

//////////
// import { shaderMaterial, useTexture } from "@react-three/drei";
// import { extend, useFrame } from "@react-three/fiber";
// import { easing, geometry } from "maath";
// import { useRef, useState } from "react";

// // @ts-ignore
// export const ImageFadeMaterialDisplacement = shaderMaterial(
//   {
//     effectFactor: 1.2,
//     dispFactor: 0,
//     // @ts-ignore
//     tex: undefined,
//     // @ts-ignore
//     tex2: undefined,
//     // @ts-ignore
//     disp: undefined,
//   },
//   /*glsl*/ `
//     varying vec2 vUv;
//     void main() {
//       vUv = uv;
//       gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//     }`,
//   /*glsl*/ `
//     varying vec2 vUv;
//     uniform sampler2D tex;
//     uniform sampler2D tex2;
//     uniform sampler2D disp;
//     uniform float _rot;
//     uniform float dispFactor;
//     uniform float effectFactor;
//     void main() {
//       vec2 uv = vUv;
//       vec4 disp = texture2D(disp, uv);
//       vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
//       vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
//       vec4 _texture = texture2D(tex, distortedPosition);
//       vec4 _texture2 = texture2D(tex2, distortedPosition2);
//       vec4 finalTexture = mix(_texture, _texture2, dispFactor);
//       gl_FragColor = finalTexture;
//       #include <tonemapping_fragment>
//       #include <encodings_fragment>
//     }`
// );

// extend({
//   ImageFadeMaterialDisplacement,
//   RoundedPlaneGeometry: geometry.RoundedPlaneGeometry,
// });
// // @ts-ignore
// export const FadingImageDisplacement = (props) => {
//   const ref = useRef(); // @ts-ignore
//   const [texture1, texture2, dispTexture] = useTexture([
//     "/images/african-headshot1.png",
//     "/images/happy-Child-headshot.png",
//     "/images/african-headshot1.png",
//   ]);
//   const [hovered, setHover] = useState(false);

//   useFrame((_state, delta) => {
//     // @ts-ignore
//     easing.damp(ref.current, "dispFactor", hovered ? 1 : 0, 0.4, delta);
//   });

//   return (
//     <mesh {...props} onPointerOver={(e) => setHover(true)} onPointerOut={(e) => setHover(false)}>
//       {/* @ts-ignore */}
//       <roundedPlaneGeometry
//         args={[2.25, 4]} // 9:16 aspect ratio
//       >
//         {/* @ts-ignore */}
//         <imageFadeMaterialDisplacement
//           ref={ref}
//           tex={texture1}
//           tex2={texture2}
//           disp={dispTexture}
//           toneMapped={false}
//         />
//         {/* @ts-ignore */}
//       </roundedPlaneGeometry>
//     </mesh>
//   );
// };

//////////////

import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import { Plane, shaderMaterial, useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { easing } from "maath";
import { useRef, useState } from "react";

// @ts-ignore
export const FadingImageDisplacement = ({ hovered }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const ref = useRef<THREE.ShaderMaterial>(null!); // @ts-ignore
  const [texture1, texture2, dispTexture] = useTexture([
    "/images/african-headshot1.png",
    "/images/happy-Child-headshot.png",
    "/images/african-headshot1.png",
  ]);
  const { viewport, size, camera } = useThree();
  //   useFrame((_state, delta) => {
  //     // @ts-ignore
  //     easing.damp(ref.current, "dispFactor", hovered ? 1 : 0, 0.4, delta);
  //   });

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
          duration: 0.8,
          ease: "linear",
        });
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
};

// #include <encodings_fragment>
