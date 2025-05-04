"use client";

import { useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import PrimaryButton from "../components/PrimaryBtn";

gsap.registerPlugin(ScrollTrigger);

function GallarySection() {
  const hasFetched = useSelector((state: RootState) => state.main.hasFetchedGeneralData);
  const mediaHubData = useSelector(
    (state: RootState) => state.main.fetchedGeneralDataObj.mediaHubData
  );
  const flattenedImages = mediaHubData.flatMap((item) => item.mediaImages);

  useEffect(() => {
    let breakpoint = gsap.matchMedia();
    breakpoint.add("(min-width: 1024px)", () => {
      // desktop setup code here...
      gsap.fromTo(
        "#scroll-up",
        { y: "-200%" }, // Start off-screen at the bottom
        {
          y: "200%", // Scroll upwards past the screen
          ease: "none",
          scrollTrigger: {
            trigger: "#trigger",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            // markers: true,
          },
        }
      );

      //Scroll down effect
      gsap.to("#scroll-down", {
        y: "-200%",
        ease: "none",
        scrollTrigger: {
          trigger: "#trigger",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    breakpoint.add("(max-width: 1024px)", () => {
      // mobile setup code here...
      gsap.fromTo(
        "#scroll-up",
        { x: "-200%" }, // Start off-screen at the bottom
        {
          x: "0%", // Scroll upwards past the screen
          // x: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: "#trigger",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // Scroll down effect
      gsap.to("#scroll-down", {
        // x: "-100%",
        x: "-200%",
        ease: "none",
        scrollTrigger: {
          trigger: "#trigger",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, []);

  return (
    // <div id="test-main" className="lg:h-[200vh] w-full bg-green-300">
    //   <div className="lg:h-screen lg:sticky top-0 p-2 rounded bg-yellow-200">
    <div id="test-main" className="lg:h-[200vh] w-full">
      <div className="lg:h-screen lg:sticky top-0 p-2 rounded">
        <div
          id="parallax-container"
          className="rounded-3xl flex flex-col lg:flex-row h-full p-4 sm:p-8 overflow-hidden bg-white"
        >
          <div className="flex flex-col gap-4 justify-between lg:p-8 w-full lg:min-w-[500px] lg:w-[42%]">
            <h2 className="text-center">Gallery</h2>
            <p>
              we believe in the power of community-driven change. Through our various projects,
              we’ve reached countless lives, offering support and resources where it’s needed most.
              From providing essential medical care to fostering educational opportunities, each
              image in our gallery tells a story of hope and transformation.
              <br />
              <br />
              Explore the moments we’ve captured—each one a testament to the lives touched and the
              communities empowered by our ongoing initiatives. Let these images speak to the heart
              of our mission and inspire you to join us in making a lasting impact.
            </p>

            {/* BTN for Lg screen */}
            <div className="max-lg:hidden relative w-full">
              {/* line */}
              <div className="mb-6 w-2/3 h-1 bg-gray-100 rounded-full mx-auto" />
              <Link href={"/gallery"}>
                <button className="relative group w-36 flex gap-2 rounded-full px-5 py-4 bg-purple-500 text-white mx-auto">
                  <span className="capitalize">photos</span>
                  <Image
                    src="/images/forward-icon.png"
                    alt="forward-icon"
                    width={500}
                    height={500}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white p-1 group-hover:right-3 transition-all"
                  />
                </button>
              </Link>
            </div>
          </div>
          {/* Animated scrolling Images */}
          <div
            id="images-container"
            className="relative h-full flex max-md:gap-2 flex-col lg:flex-row w-full lg:w-1/2"
          >
            {/* Container that scrolls upwards */}
            <div id="scroll-up" className="lg:absolute -top-full left-0 lg:h-full w-full lg:w-1/2">
              {/* <div id="scroll-up" className="h-full w-1/2"> */}
              <div className="flex flex-row lg:flex-col gap-2">
                {hasFetched &&
                  flattenedImages.map((imgSrc, index) => (
                    <Image
                      src={imgSrc}
                      alt=""
                      width={500}
                      height={500}
                      className="img rounded-xl w-60 h-72"
                      key={index}
                    />
                  ))}
              </div>
            </div>
            {/* Container that scrolls downwards */}
            <div id="scroll-down" className="lg:absolute top-0 right-0 lg:h-full w-full lg:w-1/2">
              {/* <div id="scroll-down" className="h-full w-1/2"> */}
              <div className="flex flex-row lg:flex-col gap-2">
                {hasFetched &&
                  flattenedImages
                    .reverse()
                    .map((imgSrc, index) => (
                      <Image
                        src={imgSrc}
                        alt=""
                        width={500}
                        height={500}
                        className="rounded-xl w-60 h-72"
                        key={index}
                      />
                    ))}
              </div>
            </div>
          </div>
          {/* BTN for Md and Smaller screens */}
          <div className="lg:hidden relative w-full">
            {/* line */}
            <div className="mb-6 w-2/3 h-1 bg-gray-100 rounded-full mx-auto" />
            <Link href={"/gallery"}>
              <button className="relative group w-36 flex gap-2 rounded-full px-5 py-4 bg-purple-500 text-white mx-auto">
                <span className="capitalize">photos</span>
                <Image
                  src="/images/forward-icon.png"
                  alt="forward-icon"
                  width={500}
                  height={500}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white p-1 group-hover:right-3 transition-all"
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GallarySection;
