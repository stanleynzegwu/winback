"use client";

import Image from "next/image";
import Link from "next/link";
import HamburgerIcon from "./HamburgerIcon";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="px-10 flex justify-between items-center mx-auto w-[90%] rounded-b-3xl h-16 bg-white/30 bg-opacity-20 text-white z-100">
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
          <li className="capitalize font-medium" key={index}>
            <Link href={`/${item}`}>{item}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
