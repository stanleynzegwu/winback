// "use client";

// import Image from "next/image";
// import { useRef, useState } from "react";
// import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
// import DynamicText from "./DynamicText";
// import { Canvas } from "@react-three/fiber";
// import { FadingImageDisplacement } from "./FadingImageDisplacement";

// export default function Header() {
//   const [imageIndex, setCurrentImageIndex] = useState(1);
//   gsap.registerPlugin(useGSAP);

//   const imageRef = useRef(null);

//   useGSAP(() => {
//     const timeline = gsap.timeline();
//     const opacify = document.getElementsByClassName("opacify");

//     timeline
//       .to(
//         imageRef.current,
//         {
//           scale: 1.2,
//           duration: 5,
//           repeat: -1,
//           //   yoyo: true,
//           ease: "power1.inOut",
//         },
//         "same"
//       )
//       .to(
//         opacify,
//         {
//           opacity: 0.6,
//           duration: 5,
//           repeat: -1,
//           ease: "linear",
//         },
//         "same"
//       );
//   });
//   return (
//     <div className="relative w-full min-h-screen bg-black overflow-clip">
//       <div className="absolute w-full h-full flex flex-col items-center justify-center gap-6 text-white z-50">
//         <div className="flex flex-col justify-center items-center gap-2">
//           <span className="text-base font-semibold md:text-xl md:font-semibold">
//             Right Now Over
//           </span>
//           <p className="text-5xl font-black md:text-8xl md:font-black lg:text-9xl lg:font-black">
//             10,900,000
//           </p>
//           <span className="text-base font-semibold md:text-xl md:font-semibold">
//             Nigerians are out of School
//             {/* <DynamicText words={["school", "water", "food"]} className="text-white" /> */}
//           </span>
//         </div>
//         <span className="text-xs md:text-sm ">we need YOU to win back our people.</span>
//       </div>
//       <div
//         className="opacify absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 opacity-40 z-10"
//         ref={imageRef}
//       >
//         <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
//           <color attach="background" args={["#ececec"]} />
//           <FadingImageDisplacement position-x={1.5} position-z={-2} />
//         </Canvas>
//         {/* <Image
//           src={`/images/african-headshot${imageIndex}.png`}
//           alt="blur"
//           width={500}
//           height={500}
//           className="object-cover transition-all duration-500 ease-in-out"
//         /> */}
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DynamicText from "./DynamicText";
import { Canvas, useThree } from "@react-three/fiber";
import { FadingImageDisplacement } from "./FadingImageDisplacement";
import Navbar from "./Navbar";
import AnimatedNumber from "./AnimatedNumber";
import Headroom from "react-headroom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";

export default function Header() {
  const hasIntroCompleted = useSelector((state: RootState) => state.glsl.hasIntroCompleted);
  const [hovered, setHover] = useState(false);
  gsap.registerPlugin(useGSAP);

  useGSAP(() => {
    const timeline = gsap.timeline();
    const subText = document.getElementsByClassName("subText");
    const subText2 = document.getElementsByClassName("subText2");
    const subText3 = document.getElementsByClassName("subText3");
    timeline
      .to(subText, {
        opacity: 1,
        duration: 0.3,
        delay: 1.5,
        //   repeat: -1,
        ease: "linear",
      })
      .to(subText2, {
        opacity: 1,
        duration: 0.3,
        delay: 2.4,
        //   repeat: -1,
        ease: "linear",
      })
      .to(subText3, {
        opacity: 1,
        duration: 0.1,
        delay: 2.5,
        //   repeat: -1,
        ease: "linear",
      });
  });
  return (
    <div className="relative w-full min-h-screen bg-black overflow-clip">
      <Headroom className="relative z-50 ">
        <Navbar />
      </Headroom>
      <div className="absolute w-full h-full flex flex-col items-center justify-center gap-6 text-white z-50">
        <div className="absolute hidden lg:block right-0 top-0  w-1/2 h-full bg-violet-900 blur-base -z-30" />
        <div
          className="flex flex-col justify-center items-center gap-2"
          onPointerOver={() => {
            hasIntroCompleted && setHover(true);
          }}
          onPointerOut={() => setHover(false)}
        >
          <span className="subText opacity-0 text-base font-semibold md:text-xl md:font-semibold">
            Right Now Over
          </span>
          <AnimatedNumber />
          <span className="subText2 opacity-0  text-base font-semibold md:text-xl md:font-semibold">
            Nigerian Children are out of{" "}
            {/* <DynamicText words={["school", "water", "food"]} className="text-white" /> */}
          </span>
        </div>
        <span className="subText3 opacity-0 text-xs md:text-sm ">
          we need YOU to <span className="font-medium uppercase">win-back</span> our people.
        </span>
      </div>
      <div className="opacify absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 opacity-50 z-10 h-full w-full">
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
          {/* <color attach="background" args={["#ececec"]} /> */}
          <FadingImageDisplacement hovered={hovered} position-x={1.5} position-z={-2} />
        </Canvas>
      </div>
    </div>
  );
}
