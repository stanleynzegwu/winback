import Image from "next/image";
import { LineChartMultiple } from "./components/LineChartMultiple";

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-white rounded-xl p-4 flex gap-4">
      <div className="w-[70%]  flex flex-col gap-4">
        <span className="inline-block text-2xl font-bold p-4">Good morning, James.</span>
        <div className="w-full flex flex-col md:flex-row gap-2">
          {[
            { icon: "/images/users-icon.png", amount: "$50,0000", about: "your bank balance" },
            { icon: "/images/users-icon.png", amount: "$50,0000", about: "your bank balance" },
            { icon: "/images/users-icon.png", amount: "$50,0000", about: "your bank balance" },
          ].map((item, index) => (
            <div
              className="p-4 flex-1 flex flex-col justify-between rounded-xl h-36 shadow-[rgba(117,_115,_199,_0.2)_0px_0px_16px]"
              key={index}
            >
              {/*Box Icons */}
              <div className="flex justify-between">
                <Image src={item.icon} alt="blur" width={500} height={500} className={`w-6 h-6`} />
                <Image
                  src="/images/icons/kebab-menu.png"
                  alt="blur"
                  width={500}
                  height={500}
                  className={`w-4 h-4`}
                />
              </div>
              <span className="text-xl font-medium">{item.amount}</span>
              <span>{item.about}</span>
            </div>
          ))}
        </div>
        {/* Chart */}
        <LineChartMultiple />
        <div className="flex flex-col">
          <span className="text-xl font-semibold">Recent Emails</span>
          <div className="w-full flex flex-col gap-4">
            {[
              {
                avatar: "/images/african-headshot1.png",
                name: "Hannah Morgan",
                about: "meeting scheduled",
                time: "1:24pm",
              },
              {
                avatar: "/images/african-headshot1.png",
                name: "Hannah Morgan",
                about: "meeting scheduled",
                time: "1:24pm",
              },
              {
                avatar: "/images/african-headshot1.png",
                name: "Hannah Morgan",
                about: "meeting scheduled",
                time: "1:24pm",
              },
              {
                avatar: "/images/african-headshot1.png",
                name: "Hannah Morgan",
                about: "meeting scheduled",
                time: "1:24pm",
              },
            ].map((item, index) => (
              <div
                className="w-full p-2 flex justify-between items-center rounded-2xl hover:shadow-[rgba(117,_115,_199,_0.30)_0px_0px_16px] transition-shadow duration-500"
                key={index}
              >
                <Image
                  src={item.avatar}
                  alt="blur"
                  width={500}
                  height={500}
                  className={`w-8 h-8 rounded-full`}
                />
                <span className="text-gray-500 text-sm">{item.name}</span>
                <span className="text-gray-500 text-sm">{item.about}</span>
                <span className="text-gray-500 text-sm">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[30%] p-4 bg-[#F2F2FC] rounded-xl min-h-full">kkkkkkkk</div>
    </div>
  );
}
