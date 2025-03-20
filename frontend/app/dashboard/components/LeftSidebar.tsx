"use client";

import { LayoutDashboard, Megaphone, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type IconType = React.FC<React.SVGProps<SVGSVGElement>>;
const data = [
  { icon: LayoutDashboard, name: "home", navigationPath: "/" },
  { icon: Users, name: "users", navigationPath: "users" },
  { icon: Megaphone, name: "campaign", navigationPath: "campaign" },
  { icon: LayoutDashboard, name: "media-hub", navigationPath: "media-hub" },
  { icon: LayoutDashboard, name: "account", navigationPath: "account" },
];

const navIcon = (
  Icon: IconType,
  path: string,
  fnc: (param: string) => boolean,
  isExpanded: boolean
) => <Icon className={`w-6 h-6 ${fnc(path) && !isExpanded && "scale-125"}`} />;

const LeftSidebar = () => {
  const [isExpanded, setExpanded] = useState(true);
  const pathname = usePathname();

  const isCurrentPath = (path: string) => {
    // Remove the "/dashboard" part from the pathname
    const currentPath = pathname.replace("/dashboard", "").split("/")[1] || "/";
    return currentPath === path;
  };

  return (
    <aside
      className={`relative hidden items-center md:block transition-all delay-150 duration-500 bg-orange-300  ${
        isExpanded ? "w-80" : "w-20"
      }`}
    >
      <div className={`w-full h-full flex flex-col items-center p-4 bg-gray-300 `}>
        {/* Logo */}
        <Link href="/" className="w-fit flex justify-center">
          <div className={`flex justify-center items-center `}>
            <Image
              src={isExpanded ? "/images/winback-group.png" : "/images/winback-single.png"}
              alt="blur"
              width={500}
              height={500}
              className={`${isExpanded ? "w-40 h-auto" : "w-12 h-auto"} object cover `}
            />
          </div>
        </Link>

        <span
          className={`absolute top-[20%] right-0 text-white capitalize p-1 pl-4 group bg-purple-600 text-lg rounded-l-lg flex items-center z-50 ${
            isExpanded ? "w-52 h-10" : "w-14 h-12"
          }`}
        >
          {isExpanded && "dashboard"}
          <Image
            src={"/images/users-icon.png"}
            alt="blur"
            width={500}
            height={500}
            className={`font-medium w-6 h-6 transition-transform duration-500 group-hover:scale-125 ${
              isExpanded ? "hidden" : "visible"
            }`}
          />
        </span>
        <div className="relative  h-full flex flex-col items-center justify-center">
          <span className={`mr-20 text-lg font-medium ${isExpanded ? "visible" : "hidden"}`}>
            Quick Menu
          </span>
          <div
            className={`flex flex-col gap-3 p-2 py-4 ${
              isExpanded ? "" : "rounded-full bg-[#ACAAFE]"
            }`}
          >
            {data.map(({ icon, name, navigationPath }, index) => (
              <Link href={`/dashboard/${navigationPath}`} className="play-sound" key={index}>
                <div
                  className={`relative group flex gap-2 transition-all duration-500 ${
                    isExpanded ? "hover:scale-105 p-2 " : "w-6 hover:scale-110"
                  } ${isCurrentPath(navigationPath) && "bg-[#ACAAFE] rounded-xl"}`}
                >
                  {/* LeftSidebar Icon */}
                  {navIcon(icon, navigationPath, isCurrentPath, isExpanded)}
                  <span
                    className={`font-medium capitalize transition-opacity ease-in-out ${
                      isExpanded
                        ? "opacity-1 delay-150 duration-500"
                        : "hidden opacity-0 delay-150 duration-500"
                    } `}
                  >
                    {name}
                  </span>
                  {/* Tooltip */}
                  <div
                    className={`w-28 text-white opacity-0 absolute top-1/2 -translate-y-1/2 left-[175%] bg-gray-500 rounded-sm group-hover:opacity-100 transition-opacity group-hover:delay-700 duration-300 z-20 ${
                      isExpanded ? "hidden" : "visible"
                    }`}
                  >
                    <div className="tooltip w-full h-full rounded-md p-2">{name}</div>
                  </div>
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
    </aside>
  );
};

export default LeftSidebar;
