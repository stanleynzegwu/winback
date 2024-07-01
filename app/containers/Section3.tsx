"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
// import GlassCanvas from "../components/GlassCanvas";

const GlassCanvas = dynamic(() => import("../components/GlassCanvas"), {
  ssr: false,
});

export default function Section3() {
  interface AboutLayout {
    imagePath: string;
    header: string;
    desc: string;
  }

  const aboutItems: AboutLayout[] = [
    {
      imagePath: "/images/winback-logo.png",
      header: "strengthens us",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      imagePath: "/images/winback-logo.png",
      header: "strengthens us",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      imagePath: "/images/winback-logo.png",
      header: "strengthens us",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <section className="min-h-screen p-2 lg:p-10 lg:px-16 w-full flex flex-col items-center justify-center gap-5">
      <div className="relative w-full flex flex-col items-center">
        <span className="font-medium capitalize text-accentColor-light">what we do</span>
        <h3 className="font-bold capitalize text-4xl">change the world</h3>
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 font-bold text-7xl opacity-5">
          our mission
        </span>
      </div>
      <p className="max-w-xl text-center">
        In 2021 winback positive passtime community resource center was established as a501c non
        profit organization founded to serve the economically distressed community gwinnet county
        ,goergia.
      </p>
      <div className="flex gap-4">
        {aboutItems.map(({ imagePath, header, desc }, index) => (
          <div className="p-4 flex flex-col items-center gap-2 shadow-lg" key={index}>
            <Image src={imagePath} alt="" width={100} height={100} className="w-10 h-10" />
            <span className="font-bold text-lg">{header}</span>
            <p className="mt-4">{desc}</p>
          </div>
        ))}
      </div>
      {/* <div className="w-full h-screen bg-black">
      <Canvas>
        <GlassCanvas />
        <directionalLight intensity={2} position={[0, 2, 3]} />
        <Environment preset="city" />
      </Canvas>
    </div> */}
    </section>
  );
}
