"use client";

import Image from "next/image";
import Link from "next/link";
import HamburgerIcon from "./HamburgerIcon";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`flex flex-col px-10 w-[90%] mx-auto rounded-b-3xl bg-white/30 bg-opacity-20 text-white z-50 ${
        isOpen ? "max-md:h-96" : "h-16"
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
        <HamburgerIcon isOpen={isOpen} setIsOpen={setIsOpen} classname={"md:hidden"} />
        <ul className="hidden md:flex gap-14">
          {["home", "about", "FAQ", "contact us"].map((item, index) => (
            <li
              className="capitalize font-medium hover:text-accentColor-light transition-all duration-500 ease-in-out"
              key={index}
            >
              <Link href={`/${item}`}>{item}</Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Mobile */}
      <div
        className={`flex flex-col items-center justify-between flex-auto py-10 ${
          isOpen ? "visible md:hidden" : "hidden"
        }`}
      >
        {["home", "about", "FAQ", "contact us"].map((item, index) => (
          <li
            className="inline-block capitalize font-medium hover:text-accentColor-light transition-all duration-500 ease-in-out"
            key={index}
          >
            <Link href={`/${item}`}>{item}</Link>
          </li>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;
