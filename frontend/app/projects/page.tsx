"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import ProjectCard from "../components/ProjectCard";
import { PROJECT_CATEGORIES } from "@/lib/Constants";
import { Navbar } from "../components";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const hasFetched = useSelector((state: RootState) => state.main.hasFetchedGeneralData);
  const campaignData = useSelector(
    (state: RootState) => state.main.fetchedGeneralDataObj.campaignData
  );

  //filter out campaign which status is draft
  const filteredCampaignList = campaignData.filter((campaign) => campaign.status !== "draft");
  const campaignList =
    selectedCategory === "All"
      ? filteredCampaignList
      : filteredCampaignList.filter((campaign) => campaign.category === selectedCategory);

  return (
    <>
      <Navbar />
      <div className="p-2 md:p-4">
        <h1 className="lg:text-5xl text-center mb:4 lg:mb-8 uppercase">Projects</h1>
        {/* Description */}
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
          At Winback, we are committed to making a lasting impact through innovative and sustainable
          projects. Our work focuses on 8 Core Functions Medical & Health, Education, Widows &
          Orphans, Social Economic Empowerment, Public Awareness,Save A Soul and Prison project.
        </p>

        {/* Category Filters */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 md:gap-4">
          {["All", ...PROJECT_CATEGORIES].map((category) => (
            <button
              key={category}
              className={`px-6 py-2 border rounded-md transition-all ${
                selectedCategory === category
                  ? "bg-darkBlue text-purple-600 font-bold"
                  : "border-darkBlue text-black hover:bg-darkBlue hover:text-gray-500"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Categories/project List */}
        <div className="mt-8 flex gap-4 flex-wrap">
          {hasFetched &&
            campaignList.map((campaign) => (
              <div key={campaign._id} className="w-full sm:w-72 lg:w-96">
                <ProjectCard
                  imgSrc={campaign.campaignImages[0]}
                  name={campaign.name}
                  description={campaign.description}
                  id={campaign._id}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
