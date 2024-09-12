"use client";

import CoreValuesCarousel from "../components/CoreValuesCarousel";
// import { SparklesCore } from "../ui/sparkles";
// import EcosystemCarousel from "./EcosystemCarousel";
import CoreValuesSvg from "../components/svg/CoreValuesSvg";
// import { CoreValuesSvg } from "../components";
import Image from "next/image";

export default function CoreValuesSection() {
  return (
    // <section className="relative p-4 xs:px-10 sm:p-10 flex flex-col gap-24 lg:gap-20 z-0 ">
    <section className="relative p-4 xs:px-10 sm:p-10 flex flex-col gap-24 lg:gap-20 z-0 rounded-3xl bg-white m-2">
      {/* <div className="w-full absolute inset-0 h-[75%] opacity-40">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div> */}

      <div className="relative flex flex-col gap-6 items-center lg:flex-row lg:min-h-screen lg:justify-center lg:gap-16">
        <CoreValuesSvg className="h-auto w-full max-md:max-w-md md:max-lg:max-w-lg lg:w-2/5 lg:h-auto object-contain overflow-visible" />
        <div className="max-w-sm md:max-lg:self-start">
          <h2 className="mb-4 lg:mb-5">
            The <br /> Winback 8 <br /> Core Functions
          </h2>
          <p className="text-gray-400">
            Winback is committed to empowering communities and transforming lives through targeted
            initiatives. We actively work to uplift those in need, focusing on key areas that drive
            lasting change and create a brighter future for all.
          </p>
        </div>
      </div>
      <CoreValuesCarousel className="h-auto w-full max-md:max-w-md md:max-lg:max-w-lg lg:w-2/5 lg:h-auto object-contain overflow-visible" />
    </section>
  );
}
