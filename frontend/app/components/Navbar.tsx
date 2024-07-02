"use client";

import Image from "next/image";
import Link from "next/link";
// import HamburgerIcon from "./HamburgerIcon";
import { MouseEvent, useEffect, useState } from "react";
import HamburgerIcon from "./svg/HamburgerIcon";
import { playClickSound } from "@/lib/utils";

function Navbar() {
  const [isopen, setisopen] = useState(false);
  const dashboardVisible = (item: string, isAdmin: boolean) => {
    if (item !== "dashboard") return true;

    return isAdmin;
  };
  type ClickableElement = HTMLElement | SVGElement | SVGPathElement;

  useEffect(() => {
    // const handleClick = () => {
    //   playClickSound();
    // };
    const handleClick = (event: MouseEvent<ClickableElement>) => {
      const clickedElement = event.target as ClickableElement;
      // console.log(clickedElement.classList);
      if (clickedElement.classList.contains("play-sound")) {
        playClickSound();
      }
    };
    //@ts-ignore
    document.addEventListener("click", handleClick);

    return () => {
      //@ts-ignore
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <nav
      className={`glassmorphism flex flex-col px-10 w-[90%] mx-auto rounded-b-3xl bg-white/30 bg-opacity-20 text-white z-50 ${
        isopen ? "max-md:h-96" : "h-16"
      }`}
    >
      <div className={`w-full flex justify-between items-center`}>
        <Link href="/">
          <Image
            src={`/images/winback-logo.png`}
            alt="blur"
            width={500}
            height={500}
            className="bg-cover object-cover transition-all duration-500 ease-in-out w-14 h-14 cursor-pointer"
          />
        </Link>
        {/* <div className="play-sound"> */}
        <HamburgerIcon isopen={isopen} setisopen={setisopen} classname={"play-sound md:hidden"} />
        {/* </div> */}
        <ul className="hidden md:flex gap-14">
          {["home", "about", "FAQ", "contact", "dashboard"].map((item, index) => (
            <li
              className={`capitalize font-medium hover:text-accentColor-light transition-all duration-500 ease-in-out ${
                dashboardVisible(item, true) ? "visible" : "hidden"
              }`}
              key={index}
            >
              <Link href={`/${item}`} className="play-sound">
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile */}
      <div
        className={`flex flex-col items-center justify-between flex-auto py-10 ${
          isopen ? "visible md:hidden" : "hidden"
        }`}
      >
        {["home", "about", "FAQ", "contact"].map((item, index) => (
          <li
            className="inline-block capitalize font-medium hover:text-accentColor-light transition-all duration-500 ease-in-out"
            key={index}
          >
            <Link href={`/${item}`} className="play-sound">
              {item}
            </Link>
          </li>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
