"use client";

import Image from "next/image";
import Link from "next/link";
// import HamburgerIcon from "./HamburgerIcon";
import { MouseEvent, useEffect, useState } from "react";
import HamburgerIcon from "./svg/HamburgerIcon";
import { playClickSound } from "@/lib/utils";
import Headroom from "react-headroom";
import SignInButton from "./SignInButton";
import { useSession } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();
  const isAdmin = session?.user.role === "admin";

  const [isopen, setisopen] = useState(false);

  const dashboardVisible = (item: string) => {
    if (item !== "dashboard") return true;

    // Show dashboard only in development mode OR the use isAdmin
    return process.env.NODE_ENV === "development" || isAdmin;
  };

  return (
    <Headroom className="relative z-50">
      {/* <nav
        className={`glassmorphism flex flex-col px-6 md:px-10 w-[90%] mx-auto rounded-b-3xl bg-white/30 bg-opacity-20 text-white z-50 ${
          isopen ? "max-md:h-96 absolute top-0 translate-x-1/2 right-1/2" : "h-16"
        } `}
      > */}
      <nav
        className={` flex flex-col px-6 md:px-10 w-[90%] mx-auto rounded-b-3xl bg-purple-950  text-white z-50 ${
          isopen ? "max-md:h-96 absolute top-0 translate-x-1/2 right-1/2" : "h-16"
        } `}
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
          <HamburgerIcon isopen={isopen} setisopen={setisopen} classname={"md:hidden"} />
          <ul className="hidden md:flex gap-14">
            {["about", "FAQ", "contact", "projects", "dashboard"].map((item, index) => (
              <li
                className={`capitalize font-medium text-white hover:text-purple-600 transition-all duration-500 ease-in-out ${
                  dashboardVisible(item) ? "visible" : "hidden"
                }`}
                key={index}
              >
                <Link href={`/${item}`} className="">
                  {item}
                </Link>
              </li>
            ))}
            <SignInButton />
          </ul>
        </div>
        {/* Mobile */}
        <div
          className={`flex flex-col items-start justify-between flex-auto py-10 ${
            isopen ? "visible md:hidden" : "hidden"
          }`}
        >
          {["about", "FAQ", "contact", "projects", "dashboard"].map((item, index) => (
            <li
              className={`inline-block capitalize font-medium hover:text-buttonColor-light transition-all duration-500 ease-in-out ${
                dashboardVisible(item) ? "visible" : "hidden"
              }`}
              key={index}
            >
              <Link href={`/${item}`} className="">
                {item}
              </Link>
            </li>
          ))}
          <SignInButton />
        </div>
      </nav>
    </Headroom>
  );
}

export default Navbar;
