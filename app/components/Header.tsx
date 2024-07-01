"use client";

import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import DynamicText from "./DynamicText";
import { Canvas } from "@react-three/fiber";
import Navbar from "./Navbar";
import FadingImageDisplacement from "./FadingImageDisplacement";
import AnimatedNumber from "./AnimatedNumber";
import Headroom from "react-headroom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

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
  }, []);
  return (
    <div className="relative w-full min-h-screen bg-black overflow-clip">
      <Headroom className="relative z-50 ">
        <Navbar />
      </Headroom>
      <div className="absolute w-full h-full flex flex-col items-center justify-center gap-6 text-white z-20">
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
            <DynamicText
              words={["school", "water", "food"]}
              interval={5000}
              classname="text-white"
            />
          </span>
        </div>
        <span className="subText3 opacity-0 text-xs md:text-sm ">
          Help<span className="font-medium uppercase"> WinBack</span> Their Future.
        </span>
        <button className="w-28 rounded-xl bg-accentColor-light text-black p-2">Donate</button>
      </div>
      <div className="opacify absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 opacity-50 z-10 h-full w-full">
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
          <FadingImageDisplacement hovered={hovered} position-x={1.5} position-z={-2} />
        </Canvas>
      </div>
    </div>
  );
}
