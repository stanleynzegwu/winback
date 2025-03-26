import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import PrimaryButton from "./PrimaryBtn";
import Link from "next/link";

const ReusableCarousel = () => {
  const hasFetched = useSelector((state: RootState) => state.main.hasFetchedGeneralData);
  const campaignData = useSelector(
    (state: RootState) => state.main.fetchedGeneralDataObj.campaignData
  );
  const ongoingCampaignData = campaignData.filter((campaign) => campaign.status === "ongoing");

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
          {hasFetched &&
            ongoingCampaignData.map(
              ({ campaignImages, name, description, status, date, _id }, index) => (
                <CarouselItem
                  key={index}
                  className="flex justify-center md:basis-1/2 lg:basis-1/3 2lg:basis-1/4"
                >
                  <div className="relative space-y-6 rounded-3xl bg-darkGrayishBlue bg-opacity-90 h-96 w-96 bg-gray-100">
                    {/* <Image
                      className="w-full h-1/2 rounded-3xl object-cover"
                      src={campaignImages[0]}
                      alt={name}
                      fill
                      style={{ objectFit: "cover" }}
                    /> */}
                    <Image
                      className="w-full h-1/2 rounded-t-3xl object-cover bg-cover"
                      src={campaignImages[0]}
                      alt={name}
                      width={500}
                      height={500}
                    />

                    <div className="p-4 w-[calc(100%-30px)] h-[calc(100%-8rem)] rounded-2xl absolute top-32 left-1/2 -translate-x-1/2 bg-white text-black ">
                      <h5 className="text-lg pb-4 text-black">{name}</h5>
                      <small className="text-gray-400 line-clamp-4">{description}</small>
                      <div className="absolute bottom-10 flex justify-between">
                        <Link href={`/project/${_id}`} key={index}>
                          <PrimaryButton text={"learn more"} btnClass={"w-24 px-2 py-2 "} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              )
            )}
        </CarouselContent>
        {/* Buttons */}
        {/* <div className="max-w-sm mx-auto space-x-4">
          <CarouselPrevious className="w-12 h-12 hover:bg-darkGrayishBlue" />
          <CarouselNext className="w-12 h-12 hover:bg-darkGrayishBlue" />
        </div> */}
      </div>
    </Carousel>
  );
};

export default ReusableCarousel;
