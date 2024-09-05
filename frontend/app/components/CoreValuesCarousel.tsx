import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { WINBACK_CORE_VALUES } from "@/lib/Constants";

const CoreValuesCarousel = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      className="z-0 flex flex-col justify-center"
    >
      <div className="flex flex-col gap-6">
        <CarouselContent className="">
          {WINBACK_CORE_VALUES.map(({ iconPath, name, about }, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center md:basis-1/2 lg:basis-1/3 2lg:basis-1/4"
            >
              <div className="relative space-y-6 rounded-3xl bg-darkGrayishBlue bg-opacity-90 p-6 h-96 w-96 bg-[#000000]">
                <Image
                  className="absolute top-0 left-0 w-16 h-16 2xl:w-20 2xl:h-20 -translate-y-1/2 translate-x-1/2 z-50"
                  src={`/images/icons/${iconPath}.png`}
                  alt={iconPath}
                  width={50}
                  height={50}
                />
                <h5 className="text-lg pb-6 text-white">{name}</h5>
                <small className="text-gray-400">{about}</small>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Buttons */}
        <div className="max-w-sm mx-auto space-x-4">
          <CarouselPrevious className="w-12 h-12 hover:bg-darkGrayishBlue" />
          <CarouselNext className="w-12 h-12 hover:bg-darkGrayishBlue" />
        </div>
      </div>
      {/* Background Blur */}
      <div className="absolute hidden md:block right-0 bottom-0 transform -translate-y-1/4 w-72 h-36  rounded-full bg-blue-900 blur-7xl overflow-hidden z-20" />
    </Carousel>
  );
};

export default CoreValuesCarousel;
