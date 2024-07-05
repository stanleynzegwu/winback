"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const data = [
  { iconPath: "/images/users-icon.png", name: "home", navigationPath: "/" },
  { iconPath: "/images/users-icon.png", name: "users", navigationPath: "users" },
  { iconPath: "/images/users-icon.png", name: "campaign", navigationPath: "users" },
  { iconPath: "/images/users-icon.png", name: "content", navigationPath: "users" },
  { iconPath: "/images/users-icon.png", name: "account", navigationPath: "users" },
];

const LeftSidebar = () => {
  const [isExpanded, setExpanded] = useState(true);
  return (
    <div
      className={`relative hidden items-center md:block transition-all delay-150 duration-500 hover:cursor-pointer bg-orange-300 ${
        isExpanded ? "w-80" : "w-20"
      }`}
    >
      <div className={`w-full h-full flex flex-col p-4 bg-gray-300 `}>
        {/* Logo */}
        <Link href="/">
          <div className={`flex justify-center items-center `}>
            <Image
              src="/images/winback-logo.png"
              alt="blur"
              width={500}
              height={500}
              className={`w-12 h-12 `}
            />
            <span
              className={`uppercase font-bold text-xl bg-gradient-to-r from-red-500  to-purple-600 inline-block text-transparent bg-clip-text transition-all duration-500 ${
                isExpanded ? "opacity-1 delay-200" : "opacity-0 delay-100"
              }`}
            >
              winback
            </span>
          </div>
        </Link>

        <span
          className={`block absolute top-[20%] right-0 text-white capitalize p-1 pl-4 bg-purple-600  text-lg w-60 rounded-l-lg`}
        >
          dashboard
        </span>
        <div className="relative  h-full flex flex-col items-center justify-center">
          <span className={`mr-20 text-lg font-medium ${isExpanded ? "visible" : "hidden"}`}>
            Quick Menu
          </span>
          <div
            className={` flex flex-col gap-3 p-2 py-4 ${
              isExpanded ? "" : "rounded-full bg-teal-300"
            }`}
          >
            {data.map(({ iconPath, name, navigationPath }, index) => (
              <Link href={`/dashboard/${navigationPath}`}>
                <div className={`flex gap-2 ${isExpanded ? "" : "w-6"}`} key={index}>
                  <Image
                    src={iconPath}
                    alt="blur"
                    width={500}
                    height={500}
                    className="font-medium w-6 h-6"
                  />
                  <span
                    className={`font-medium capitalize transition-opacity ease-in-out ${
                      isExpanded
                        ? "opacity-1 delay-150 duration-500 "
                        : "opacity-0 delay-200 duration-300"
                    } `}
                  >
                    {name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* Toggler */}
      <div
        className="absolute top-14 -right-8 w-12 h-8 rounded-lg z-50 bg-black"
        onClick={() => setExpanded((state) => !state)}
      />
    </div>
  );
};

export default LeftSidebar;
