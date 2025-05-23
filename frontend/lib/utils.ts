import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const calculateResponsiveScale = (axis: string) => {
  const currentAxis =
    axis === "x" ? [window.innerWidth, 1282, 5.2] : [window.innerHeight, 585, 2.85];
  return (currentAxis[0] / currentAxis[1]) * currentAxis[2];
};

export const getTimeOfDayGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "Good morning";
  } else if (currentHour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
};

export const playClickSound = () => {
  const audio = new Audio("/audio/buttonClick.mp3");
  audio.play();
};