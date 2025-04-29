"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Headroom from "react-headroom";
import HamburgerIcon from "@/app/components/svg/HamburgerIcon";

function Topbar() {
  const [isopen, setisopen] = useState(false);

  return (
    <Headroom className="relative md:hidden z-50">
      <nav
        className={`fixed top-0 left-0 flex flex-col px-10 w-full border-b-[1px] bg-white border-gray-500 z-50 ${
          isopen ? "max-md:h-96" : "h-16"
        }`}
      >
        {/* <nav
        className={`glassmorphism fixed left-1/2 flex items-center justify-between w-11/12 max-w-screen-xl px-6 py-3 lg:py-2 bg-black/50 bg-opacity-40 shadow-md z-30 backdrop-blur-md rounded-b-3xl ${
          isopen ? "max-md:h-96" : "h-16"
        }`}
        style={{
          transform: "translateX(-50%) translateY(0px) translateZ(0px)",
          transformOrigin: "50% 50% 0px",
          opacity: 1,
        }}
      > */}
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
          <HamburgerIcon isopen={isopen} setisopen={setisopen} classname={"md:hidden bg-black"} />
        </div>
        {/* Mobile */}
        <div
          className={`flex flex-col items-center justify-between flex-auto py-10 ${
            isopen ? "visible md:hidden" : "hidden"
          }`}
        >
          {["home", "users", "campaign", "media-hub"].map((item, index) => (
            <li
              className={`inline-block capitalize font-medium hover:text-accentColor-light transition-all duration-500 ease-in-out `}
              onClick={() => setisopen(false)}
              key={index}
            >
              <Link href={`/dashboard/${item === "home" ? "" : item}`} className="play-sound">
                {item}
              </Link>
            </li>
          ))}
        </div>
      </nav>
    </Headroom>
  );
}

export default Topbar;
