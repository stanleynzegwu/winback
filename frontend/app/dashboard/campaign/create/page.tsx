"use client";
import { publicRequest } from "@/lib/api";
import { uploadMultipleFilesToFirebase } from "@/lib/firebase";
import { CampaignFormState } from "@/lib/types";
import React, { FormEvent, useState } from "react";

const CreateCampaign = () => {
  // Define form state with the new campaign images array
  const [formState, setFormState] = useState<CampaignFormState>({
    name: "",
    campaignImages: [], // Store image URLs here
    description: "",
    date: "",
    status: "draft",
  });

  // Add state to handle image previews
  const [previews, setPreviews] = useState<string[]>([]);

  // Handle image file selection and update both previews and formState
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (!files) return;

    const newPreviews: string[] = [];
    const newFiles: File[] = []; // To store File objects for uploading

    // Loop through the files and create data URLs for each one (for preview)
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        const result = reader.result as string;
        newPreviews.push(result); // Add preview (base64) to previews state
        newFiles.push(file); // Add file to formState (for uploading)

        // Once all files are read, update the state
        if (newPreviews.length === files.length) {
          setPreviews(newPreviews);
          setFormState((prevState) => ({
            ...prevState,
            campaignImages: newFiles, // Add actual File objects to formState
          }));
        }
      };

      reader.readAsDataURL(file); // Read the file as a data URL for preview
    }
  };

  // Handle input change for other form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle radio button change
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.value as "draft" | "ongoing" | "completed"; // Ensure correct status type
    setFormState((prevState) => ({
      ...prevState,
      status: newStatus, // Correctly assign the status
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Upload the files from formState.campaignImages (which contains File objects)
      const campaignImgUrls = await uploadMultipleFilesToFirebase(
        formState.campaignImages, // This now contains File objects
        "winback_campaign"
      );

      const campaignData = {
        // campaignImgUrls, // Store the uploaded URLs in the backend or database
        ...formState,
        campaignImages: campaignImgUrls,
      };

      // Send the data to your backend (for example, MongoDB)
      const res = await publicRequest.post("/campaign", campaignData);
      if (res.status === 201) {
        console.log("Campaign created successfully!");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="max-md:pt-20 p-4 min-h-screen bg-white md:rounded-xl">
      <h1 className="uppercase text-lg lg:text-2xl text-center mb-8">Create campaign</h1>
      <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Campaign Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Campaign Name</label>
          <input
            type="text"
            name="name"
            placeholder="Project Back To school"
            value={formState.name}
            onChange={handleInputChange}
            className="border-[1px] border-gray-400 rounded-xl px-2 py-2 focus:outline-none focus:border-[#483EEC] focus:text-gray-500"
          />
        </div>

        {/* Campaign Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Description</label>
          <textarea
            name="description"
            placeholder="Description"
            value={formState.description}
            onChange={handleInputChange}
            className="border-[1px] border-gray-400 rounded-xl px-2 py-2 focus:outline-none focus:border-[#483EEC] focus:text-gray-500"
          />
        </div>

        {/* Start Date */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Start Date</label>
          <input
            type="date"
            name="date"
            value={formState.date}
            onChange={handleInputChange}
            className="border-[1px] border-gray-400 rounded-xl px-2 py-2 focus:outline-none focus:border-[#483EEC] focus:text-gray-500"
          />
        </div>

        {/* Image Upload and Preview */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Campaign Image</label>
          <input
            type="file"
            name="campaignImages"
            accept="image/*"
            onChange={handleImageChange} // Add this line to handle file change
            multiple // Allow multiple file selection
            className="border-[1px] border-gray-400 rounded-xl px-2 py-2 cursor-pointer focus:outline-none focus:border-[#483EEC] focus:text-gray-500"
          />
          {/* Image previews */}
          <div className="flex flex-wrap gap-4 mt-4">
            {previews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Image Preview ${index + 1}`}
                className="max-w-xs h-60 aspect-square rounded-xl border-[1px] border-gray-300"
              />
            ))}
          </div>
        </div>

        {/* Status Radio buttons */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Status</label>
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <input
                type="radio"
                name="status"
                value="draft"
                checked={formState.status === "draft"}
                onChange={handleRadioChange}
                className="cursor-pointer"
              />
              <label className="cursor-pointer">Draft</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="radio"
                name="status"
                value="ongoing"
                checked={formState.status === "ongoing"}
                onChange={handleRadioChange}
                className="cursor-pointer"
              />
              <label className="cursor-pointer">Ongoing</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="radio"
                name="status"
                value="completed"
                checked={formState.status === "completed"}
                onChange={handleRadioChange}
                className="cursor-pointer"
              />
              <label className="cursor-pointer">Completed</label>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <button className="self-end w-full md:w-60 px-2 py-3 rounded-2xl bg-[#483EEC] text-white">
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;
