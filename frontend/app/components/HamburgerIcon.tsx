import * as React from "react";
import { SVGProps } from "react";

interface HamburgerIconProps extends SVGProps<SVGSVGElement> {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  classname: string;
}

const HamburgerIcon = (props: HamburgerIconProps) => (
  <svg
    viewBox="0 0 12 12"
    enableBackground="new 0 0 12 12"
    id="\u0421\u043B\u043E\u0439_1"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="#0000"
    stroke="#0000"
    strokeWidth={0.00012000000000000002}
    className={`w-8 h-8 cursor-pointer ${props.classname}`}
    {...props}
    onClick={() => props.setIsOpen((prevState) => !prevState)}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
    <g id="SVGRepo_iconCarrier">
      <g>
        <rect
          className={`${props.isOpen && "open"} top`}
          fill="#FFFFFF"
          height={1}
          width={11}
          x={0.5}
          y={2.5}
        />
        <rect
          className={`${props.isOpen && "open"} middle`}
          fill="#FFFFFF"
          height={1}
          width={11}
          x={0.5}
          y={5.5}
        />
        <rect
          className={`${props.isOpen && "open"} bottom`}
          fill="#FFFFFF"
          height={1}
          width={11}
          x={0.5}
          y={8.5}
        />
      </g>
    </g>
  </svg>
);
export default HamburgerIcon;
