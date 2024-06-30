import Image from "next/image";
import VerticalTimelineSvg from "./svg/VerticalTimelineSvg";

export default function Section2() {
  interface AboutLayout {
    imagePath: string;
    header: string;
    desc: string;
  }

  const aboutItems: AboutLayout[] = [
    {
      imagePath: "/images/winback-logo.png",
      header: "strengthens us",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      imagePath: "/images/winback-logo.png",
      header: "strengthens us",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      imagePath: "/images/winback-logo.png",
      header: "strengthens us",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  const aboutItems2 = [
    {
      offset: "",
      iconPath: "/images/winback-logo.png",
      header: "community development project",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      offset: "",
      iconPath: "/images/winback-logo.png",
      header: "accesible healthcare initiative",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      offset: "",
      iconPath: "/images/winback-logo.png",
      header: "community dev project",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      offset: "",
      iconPath: "/images/winback-logo.png",
      header: "community dev project",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <section className="aboutSection p-10 px-16 w-full flex flex-col items-center justify-center gap-5">
      <div className="w-full flex bg-emerald-100">
        {/* <h2>Some services we provide</h2> */}
        <div className="relative flex h-96 w-1/2 bg-yellow-200">
          <VerticalTimelineSvg />
          {/* <div className="timeline-items">
          <div className="item">Item 1</div>
          <div className="item">Item 2</div>
          <div className="item">Item 3</div>
        </div> */}

          {/* <div className="item absolute top-[90px] left-20">
            Item 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum atque vel
            provident error sit unde quia tenetur earum amet incidunt numquam assumenda cumque
            facilis, nam doloribus hic soluta distinctio voluptatibus.
          </div>
          <div className="item absolute top-1/2 left-20">
            Item 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum atque vel
            provident error sit unde quia tenetur earum amet incidunt numquam assumenda cumque
            facilis, nam doloribus hic soluta distinctio voluptatibus.
          </div> */}
          <div className="flex flex-col gap-4 justify-between">
            {aboutItems2.map(({ offset, iconPath, header, desc }, index) => (
              <div className="item flex gap-2" key={index}>
                <Image src={iconPath} alt="" width={100} height={100} className="w-8 h-8" />
                <div className="">
                  <p className="capitalize font-bold text-base mb-2">{header}</p>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Image
          src={"/images/happy-Child-headshot.png"}
          alt=""
          width={100}
          height={100}
          className="w-1/2 h-full bg-cover"
        />
      </div>

      {/* <div className="relative w-full flex flex-col items-center">
        <span className="font-medium capitalize text-accentColor-light">what we do</span>
        <h3 className="font-bold capitalize text-4xl">change the world</h3>
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 font-bold text-7xl opacity-5">
          our mission
        </span>
      </div>
      <p className="max-w-xl text-center">
        In 2021 winback positive passtime community resource center was established as a501c non
        profit organization founded to serve the economically distressed community gwinnet county
        ,goergia.
      </p>
      <div className="flex gap-4">
        {aboutItems.map(({ imagePath, header, desc }, index) => (
          <div className="p-4 flex flex-col items-center gap-2 shadow-lg" key={index}>
            <Image src={imagePath} alt="" width={100} height={100} className="w-10 h-10" />
            <span className="font-bold text-lg">{header}</span>
            <p className="mt-4">{desc}</p>
          </div>
        ))}
      </div> */}
    </section>
  );
}
