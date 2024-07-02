// import React from "react";

// interface DataItem {
//   value: number;
//   color: string;
// }

// interface CircleChartProps {
//   //   data: DataItem[];
//   radius?: number;
//   strokeWidth?: number;
// }
// const data: DataItem[] = [
//   { value: 20, color: "#ff0000" }, // Example data
//   { value: 15, color: "#00ff00" },
//   { value: 25, color: "#0000ff" },
//   { value: 30, color: "#ffff00" },
//   { value: 10, color: "#ff00ff" },
// ];

// export const CircleChart: React.FC<CircleChartProps> = ({ radius = 100, strokeWidth = 20 }) => {
//   const circumference = 2 * Math.PI * radius;
//   const total = data.reduce((acc, item) => acc + item.value, 0);
//   let offset = 0;

//   return (
//     <svg width={radius * 2 + strokeWidth} height={radius * 2 + strokeWidth}>
//       <circle
//         cx={radius + strokeWidth / 2}
//         cy={radius + strokeWidth / 2}
//         r={radius}
//         fill="none"
//         stroke="#ddd"
//         strokeWidth={strokeWidth}
//       />
//       {data.map((item, index) => {
//         const value = (item.value / total) * circumference;
//         const dashArray = `${value} ${circumference - value}`;
//         const dashOffset = offset;
//         offset -= value;

//         return (
//           <circle
//             key={index}
//             cx={radius + strokeWidth / 2}
//             cy={radius + strokeWidth / 2}
//             r={radius}
//             fill="none"
//             stroke={item.color}
//             strokeWidth={strokeWidth}
//             strokeDasharray={dashArray}
//             strokeDashoffset={dashOffset}
//           />
//         );
//       })}
//     </svg>
//   );
// };

import React from "react";

interface DataItem {
  value: number;
  color: string;
}

interface CircleChartProps {
  radius?: number;
  strokeWidth?: number;
}

const data: DataItem[] = [
  { value: 20, color: "#ff0000" }, // Example data
  { value: 15, color: "#00ff00" },
  { value: 25, color: "#0000ff" },
  { value: 30, color: "#ffff00" },
  { value: 10, color: "#cccccf" },
];

export const CircleChart: React.FC<CircleChartProps> = ({ radius = 100, strokeWidth = 50 }) => {
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
