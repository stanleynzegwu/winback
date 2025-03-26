"use client";

import { description } from "@/app/dashboard/components/LineChartMultiple";
import { publicRequest } from "@/lib/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface PropsInterface {
  params: { id: number };
  //   searchParams: {};
}
interface StateInterface {
  campaignImages: string[];
  name: string;
  description: string;
  date: string;
}
const Project = ({ params }: PropsInterface) => {
  const [campaignData, setCampaignData] = useState<StateInterface>({
    campaignImages: [],
    name: "",
    description: "",
    date: "",
  });
  console.log(campaignData);
  useEffect(() => {
    const fetchCampignById = async () => {
      try {
        const campaignRes = await publicRequest.get(`/campaign/${params.id}`);
        setCampaignData(campaignRes.data);
      } catch (error) {
        console.error("Failed to fetch general data:", error);
      }
    };

    fetchCampignById();
  }, []);
  return (
    <div className="relative min-h-screen bg-white md:rounded-xl">
      <Image
        src={campaignData.campaignImages[0]}
        alt="blur"
        width={500}
        height={500}
        className="bg-cover object-cover w-full cursor-pointer static"
      />
      <p>{campaignData.description}</p>
      <div className="prose">
        <ReactMarkdown>{campaignData.description}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Project;
