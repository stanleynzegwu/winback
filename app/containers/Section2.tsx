import Image from "next/image";
import VerticalTimelineSvg from "../components/svg/VerticalTimelineSvg";

export default function Section2() {
  const aboutItems2 = [
    {
      iconPath: "/images/winback-logo.png",
      header: "community development project",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      iconPath: "/images/winback-logo.png",
      header: "accesible healthcare initiative",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      iconPath: "/images/winback-logo.png",
      header: "community dev project",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      iconPath: "/images/winback-logo.png",
      header: "community dev project",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <section className="aboutSection min-h-screen p-2 lg:p-10 lg:px-16 w-full flex flex-col items-center justify-center gap-5">
      <div className="w-full flex flex-col lg:flex-row ">
        <div className="w-full lg:w-1/2">
          <div className="pl-5 pr-2 pb-5">
            <h3 className="pb-2">Some services we provide</h3>
            <p>
              Winback is dedicated to helping underpriviledged kids gwin back thier future. with
              you, we can do better
            </p>
          </div>
          <div className="flex w-full ">
            <VerticalTimelineSvg />
            <div className="verticalContentContainer flex flex-col gap-2 justify-between">
              {aboutItems2.map(({ iconPath, header, desc }, index) => (
                <div className="item flex gap-4" key={index}>
                  <Image
                    src={iconPath}
                    alt=""
                    width={100}
                    height={100}
                    className="p-1 w-8 h-6 bg-black rounded-md"
                  />
                  {/* </div> */}
                  <div className="">
                    <p className="capitalize font-bold text-base mb-2">{header}</p>
                    <p>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-auto">
          <Image
            src={"/images/rose.jpg"}
            alt=""
            width={100}
            height={100}
            className="mx-auto w-auto h-full bg-cover rounded-lg aspect-[3/4]"
          />
        </div>
      </div>
    </section>
  );
}
