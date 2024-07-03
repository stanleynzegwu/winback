import { donationBreakdownData } from "@/lib/types";
import React from "react";

interface CircleChartProps {
  data: donationBreakdownData[];
  radius?: number;
  strokeWidth?: number;
}

export const CircleChart: React.FC<CircleChartProps> = ({
  data,
  radius = 100,
  strokeWidth = 50,
}) => {
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let accumulatedValue = 0;

  return (
    <svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth} className="">
      <circle
        cx={radius + strokeWidth / 2}
        cy={radius + strokeWidth / 2}
        r={radius}
        fill="none"
        stroke="#ddd"
        strokeWidth={strokeWidth}
      />
      {data.map((item, index) => {
        const value = (item.value / total) * circumference;
        const dashArray = `${value} ${circumference - value}`;
        const dashOffset = accumulatedValue;
        accumulatedValue += value;

        return (
          <circle
            key={index}
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            fill="none"
            stroke={item.color}
            strokeWidth={strokeWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={-dashOffset}
          />
        );
      })}
    </svg>
  );
};
