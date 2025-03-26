import Image from "next/image";
import Link from "next/link";
import PrimaryButton from "./PrimaryBtn";

interface ProjectCardProps {
  imgSrc: string;
  name: string;
  description: string;
  id: number;
}
const ProjectCard = ({ imgSrc, name, description, id }: ProjectCardProps) => {
  return (
    // <div className="h-20 flex justify-center md:basis-1/2 lg:basis-1/3 2lg:basis-1/4">
    <div className="relative space-y-6 rounded-3xl bg-opacity-90 h-96 w-full bg-gray-100">
      {/* <Image
            className="w-full h-1/2 rounded-3xl object-cover"
            src={campaignImages[0]}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
          /> */}
      <Image
        className="w-full h-1/2 rounded-t-3xl object-cover bg-cover"
        src={imgSrc}
        alt={"project-image"}
        width={500}
        height={500}
      />

      <div className="p-4 w-[calc(100%-30px)] h-[calc(100%-8rem)] rounded-2xl absolute top-32 left-1/2 -translate-x-1/2 bg-white text-black ">
        <h5 className="text-lg pb-4 text-black">{name}</h5>
        <small className="text-gray-400 line-clamp-4">{description}</small>
        <div className="absolute bottom-10 flex justify-between">
          <Link href={`/project/${id}`}>
            <PrimaryButton text={"learn more"} btnClass={"w-24 px-2 py-2 "} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
