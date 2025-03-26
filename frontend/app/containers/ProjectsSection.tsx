"use client";

import Image from "next/image";
import React from "react";
import ReusableCarousel from "../components/ProjectCarousel";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import Link from "next/link";

const ProjectsSection: React.FC = () => {
  const hasFetched = useSelector((state: RootState) => state.main.hasFetchedGeneralData);
  const campaignData = useSelector(
    (state: RootState) => state.main.fetchedGeneralDataObj.campaignData
  );

  const ongoingCampaignData = campaignData.filter((campaign) => campaign.status === "ongoing");
  // Only render if there are ongoing campaigns
  if (!ongoingCampaignData.length) return null;

  return (
    <section className="relative p-4 xs:px-10 sm:p-10 flex flex-col gap-24 lg:gap-20 z-0 rounded-3xl bg-white m-2">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Campaigns & Projects</h2>
      <ReusableCarousel />
      <Link href="/projects">
        <button className="relative group w-36 flex gap-2 rounded-full px-5 py-4 bg-purple-500 text-white mx-auto">
          <span className="capitalize">view all</span>
          <Image
            src="/images/forward-icon.png"
            alt="forward-icon"
            width={500}
            height={500}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white p-1 group-hover:right-3 transition-all"
          />
        </button>
      </Link>
    </section>
  );
};

export default ProjectsSection;
