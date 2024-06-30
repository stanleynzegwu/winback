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
      const line = document.querySelector("#progress-line");
      if (!line) {
        console.error("Line element not found");
        return;
      }

      gsap.fromTo(
        line,
        { attr: { y2: 20 } }, // Start with a short line
        {
          attr: { y2: 400 }, // Animate to the full height
          scrollTrigger: {
            trigger: line,
            start: "top 80%", // Adjust based on where you want the animation to start
            end: "top top", // Adjust based on where you want the animation to end
            scrub: true,
            markers: true, // Optional: Add markers to visualize the scroll trigger
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
    // width="60" height="400"
    <svg width="60" id="progress-svg" className="bg-purple-300">
      <line id="progress-line" x1="20" y1="0" x2="20" y2="20" stroke="black" strokeWidth="2"></line>
      {/* Horizontal lines and dots */}
      {/* <line
        className="horizontal-line"
        x1="20"
        y1="100"
        x2="50"
        y2="100"
        stroke="red"
        strokeWidth="2"
      ></line>
      <circle className="dot" cx="20" cy="100" r="6" fill="blue"></circle>
      <line
        className="horizontal-line"
        x1="20"
        y1="200"
        x2="50"
        y2="200"
        stroke="red"
        strokeWidth="2"
      ></line>
      <circle className="dot" cx="20" cy="200" r="6" fill="red"></circle>
      <line
        className="horizontal-line"
        x1="20"
        y1="300"
        x2="50"
        y2="300"
        stroke="red"
        strokeWidth="2"
      ></line>
      <circle className="dot" cx="20" cy="300" r="6" fill="red"></circle> */}
    </svg>
  );
};

export default VerticalTimelineSvg;
