"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRef } from "react";

const VerticalTimelineSvg = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tl = gsap.timeline();
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      new ScrollTrigger({});
      // const d = document.querySelector(".verticalContentContainer");
      // console.log(d?.scrollHeight);
      const line = document.querySelector("#progress-line");
      if (!line) {
        console.error("Line element not found");
        return;
      }

      gsap.fromTo(
        line,
        { attr: { y2: 80 } }, // Start with a short line
        {
          attr: { y2: 400 }, // Animate to the full height
          scrollTrigger: {
            trigger: line,
            start: "top 80%",
            end: "bottom 10%",
            scrub: true,
            // markers: true,
          },
          duration: 1,
          ease: "power1.out",
        }
      );

      gsap.utils.toArray(".item").forEach((item) => {
        gsap.to(item as HTMLElement, {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: item as HTMLElement,
            start: "top bottom",
            end: "top 80%",
            scrub: true,
          },
        });
      });
    },
    { dependencies: [] }
  );

  return (
    <svg width="60" id="progress-svg" className="">
      <line
        id="progress-line"
        x1="20"
        y1="0"
        x2="20"
        y2="20"
        stroke="black"
        strokeWidth="1.5"
      ></line>
    </svg>
  );
};

export default VerticalTimelineSvg;
