"use client";

import { Navbar } from "@/app/components";
import { publicRequest } from "@/lib/api";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface PropsInterface {
  params: { id: number };
}

interface StateInterface {
  campaignImages: string[];
  name: string;
  description: string;
  date: string;
}

const Project = ({ params }: PropsInterface) => {
  const [campaignData, setCampaignData] = useState<StateInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCampaignById = async () => {
      try {
        const campaignRes = await publicRequest.get(`/campaign/${params.id}`);
        setCampaignData(campaignRes.data);
      } catch (error) {
        console.error("Failed to fetch campaign data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaignById();
  }, []);

  return (
    <div className="min-h-screen bg-white md:rounded-xl">
      <Navbar />

      {/* Hero Section */}
      <div className="relative">
        {isLoading ? (
          <div className="bg-gray-300 w-full h-[570px] animate-pulse" />
        ) : (
          <Image
            src={campaignData?.campaignImages[0] || "/placeholder.jpg"}
            alt="Campaign Image"
            width={500}
            height={500}
            className="bg-cover object-cover w-full h-[570px] cursor-pointer z-10"
          />
        )}

        {/* Overlay & Title */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-30">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg tracking-wider">
            {isLoading ? (
              <div className="bg-gray-400 h-10 w-64 rounded-md animate-pulse" />
            ) : (
              campaignData?.name
            )}
          </h1>
        </div>
        <div className="absolute w-full h-full bg-black top-0 left-0 opacity-50 z-20" />
      </div>

      {/* Content Section */}
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center drop-shadow-lg">
          {isLoading ? (
            <div className="bg-gray-400 h-8 w-72 mx-auto rounded-md animate-pulse" />
          ) : (
            campaignData?.name
          )}
        </h1>

        <div className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-100 mt-2">
          {isLoading ? (
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded-md animate-pulse w-3/4" />
              <div className="h-4 bg-gray-300 rounded-md animate-pulse w-2/3" />
              <div className="h-4 bg-gray-300 rounded-md animate-pulse w-5/6" />
              <div className="h-4 bg-gray-300 rounded-md animate-pulse w-4/5" />
            </div>
          ) : (
            <ReactMarkdown>{campaignData?.description}</ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
