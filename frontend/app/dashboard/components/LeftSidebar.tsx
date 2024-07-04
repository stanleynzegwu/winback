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
      className={`relative hidden items-center md:block transition-all duration-500 hover:cursor-pointer ${
        isExpanded ? "w-80" : "w-20"
      }`}
    >
      <div className="w-full h-full p-4 bg-slate-500">
        {/* Logo */}
        <Link href="/">
          <div className="flex justify-center items-center">
            <Image
              src="/images/winback-logo.png"
              alt="blur"
              width={500}
              height={500}
              className="w-12 h-12"
            />
            <span
              className={`uppercase font-bold text-xl bg-gradient-to-r from-red-500  to-purple-600 inline-block text-transparent bg-clip-text ${
                isExpanded ? "visible" : "hidden"
              }`}
            >
              winback
            </span>
          </div>
        </Link>

        <span className="block absolute right-0 text-white capitalize p-1 pl-4 bg-purple-600  text-lg w-60 rounded-l-lg">
          dashboard
        </span>
        <div className="bg-yellow-400">
          {data.map(({ iconPath, name, navigationPath }, index) => (
            <Link href={`/dashboard/${navigationPath}`}>
              <div className="flex gap-2" key={index}>
                <Image src={iconPath} alt="blur" width={500} height={500} className="w-6 h-6" />
                <span className={`${isExpanded ? "visible" : "hidden"}`}>{name}</span>
              </div>
            </Link>
          ))}
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
