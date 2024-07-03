import { donationBreakdownData } from "@/lib/types";
import { CircleChart } from "../components/svg/CircleChart";

const data: donationBreakdownData[] = [
  { value: 20, color: "#ff0000", content: "cleanliness programme" }, // Example data
  { value: 15, color: "#00ff00", content: "helping people" },
  { value: 25, color: "#0000ff", content: "feeding the poor" },
  { value: 30, color: "#ffff00", content: "Child care home" },
  { value: 10, color: "#cccccf", content: "excursions" },
];

const Section4 = () => {
  return (
    <section className="p-5 lg:p-10 lg:px-16 bg-black w-full flex flex-col lg:flex-row gap-10 text-white">
      <div className="flex-1 flex flex-col justify-center gap-4">
        <h3 className="">How we spend your donations and where it goes</h3>
        <p>
          we understand that when you make a donation you want to know exactly where your money is
          going and we pledge to be transparent
        </p>

        <div className="flex gap-4 flex-wrap">
          {data.map(({ value, color, content }, index) => (
            <div className="flex gap-2" key={index}>
              <span className={` w-5 h-5 rounded-md`} style={{ backgroundColor: color }} />
              <span className="text-sm">{`${value}%`}</span>
              <span className="text-sm">{content}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <CircleChart data={data} />
      </div>
    </section>
  );
};

export default Section4;
