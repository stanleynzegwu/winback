"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CountUp from "react-countup";

function AnimatedNumber() {
  const numberRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const numberElement = numberRef.current!;
    const parts = Array.from(numberElement.children);

    // Return the parent(numberElement) opacity to 1
    gsap.set(numberRef.current, { opacity: 1 });
    // Ensure the number parts start hidden or off-screen
    gsap.set(parts, { y: "100%", opacity: 0 });

    // Create GSAP timeline for the animation
    const timeline = gsap.timeline();

    // Custom delays for each child
    const delays = [2.0, 2.2, 2.4, 2.6, 3.0, 3.5]; // Customize these delays as needed

    parts.forEach((part, index) => {
      timeline.to(
        part,
        {
          y: "0%",
          opacity: 1,
          duration: 1, // Adjust duration as needed
          ease: "power3.out",
        },
        delays[index]
      );
    });

    return () => {
      timeline.kill(); // Clean up timeline if component unmounts
    };
  }, []);

  return (
    <div
      ref={numberRef}
      className="text-5xl font-black md:text-8xl md:font-black lg:text-9xl lg:font-black opacity-0"
    >
      <span>
        <CountUp
          start={0}
          end={20}
          duration={1.2}
          delay={2.2}
          // enableScrollSpy={true}
          // scrollSpyDelay={500}
        />
      </span>
      <span>,</span>
      <span>
        <CountUp start={0} end={179} duration={1.5} delay={2.6} />
      </span>
      <span>,</span>
      <span>00</span>
      <span>
        <CountUp start={0} end={1} duration={1} delay={1} />
      </span>
    </div>
  );
}

export default AnimatedNumber;
