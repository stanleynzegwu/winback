// "use client";
// import { useToast } from "@/hooks/use-toast";
// import { publicRequest } from "@/lib/api";
// import { PROJECT_CATEGORIES } from "@/lib/Constants";
// import { uploadMultipleFilesToFirebase } from "@/lib/firebase";
// import { CampaignFormState } from "@/lib/types";
// import React, { FormEvent, useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import ReactMarkdown from "react-markdown";

// const EditCampaign = ({ params }: { params: { id: number } }) => {
//   const { id } = useParams();
//   const { toast } = useToast();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [formState, setFormState] = useState<CampaignFormState | null>(null);
//   const [previews, setPreviews] = useState<string[]>([]);
//   const [newImages, setNewImages] = useState<File[]>([]);

//   useEffect(() => {
//     const fetchCampaign = async () => {
//       try {
//         const res = await publicRequest.get(`/campaign/${id}`);
//         const campaign = res.data;
//         setFormState(campaign);
//         setPreviews(campaign.campaignImages || []);
//       } catch (error) {
//         console.error("Error fetching campaign:", error);
//       }
//     };
//     fetchCampaign();
//   }, [id]);

//   if (!formState) return <p>Loading...</p>;

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files) return;

//     const newPreviews: string[] = [];
//     const newFiles: File[] = [];

//     for (let i = 0; i < files.length; i++) {
//       const file = files[i];
//       const reader = new FileReader();

//       reader.onloadend = () => {
//         newPreviews.push(reader.result as string);
//         newFiles.push(file);
//         if (newPreviews.length === files.length) {
//           setPreviews((prev) => [...prev, ...newPreviews]);
//           setNewImages((prev) => [...prev, ...newFiles]);
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormState((prevState) => prevState && { ...prevState, [name]: value });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (!formState) return;
//       const existingUrls = formState.campaignImages.filter(
//         (img) => typeof img === "string"
//       ) as string[];
//       const newImages = formState.campaignImages.filter((img) => img instanceof File) as File[];

//       let updatedImages: string[] = [...existingUrls];

//       if (newImages.length > 0) {
//         const uploadedUrls = await uploadMultipleFilesToFirebase(newImages, "winback_campaign");
//         updatedImages = [...existingUrls, ...uploadedUrls];
//       }

//       const updatedCampaign = { ...formState, campaignImages: updatedImages };
//       await publicRequest.put(`/campaign/${params.id}`, updatedCampaign);

//       toast({ title: "Update Successful", description: "Campaign updated successfully!" });
//       setLoading(false);
//     } catch (error) {
//       console.error("Error updating campaign:", error);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-md:pt-20 p-4 min-h-screen bg-white md:rounded-xl">
//       <h1 className="uppercase text-lg lg:text-2xl text-center mb-8">Edit Campaign</h1>
//       <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-semibold">Campaign Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formState.name}
//             onChange={handleInputChange}
//             className="border border-gray-400 rounded-xl px-2 py-2 focus:outline-none focus:border-[#483EEC]"
//           />
//         </div>

//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-semibold">Description (Supports Markdown)</label>
//           <textarea
//             name="description"
//             value={formState.description}
//             onChange={handleInputChange}
//             className="border border-gray-400 rounded-xl px-2 py-2 focus:outline-none focus:border-[#483EEC]"
//           />
//           <div className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-100 mt-2">
//             <h3 className="text-sm font-semibold mb-1">Preview:</h3>
//             <ReactMarkdown>{formState.description}</ReactMarkdown>
//           </div>
//         </div>

//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-semibold">Start Date</label>
//           <input
//             type="date"
//             name="date"
//             value={formState.date}
//             onChange={handleInputChange}
//             className="border border-gray-400 rounded-xl px-2 py-2 focus:outline-none focus:border-[#483EEC]"
//           />
//         </div>

//         <div className="flex flex-col gap-2">
//           <label className="text-sm font-semibold">Campaign Image</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             multiple
//             className="border border-gray-400 rounded-xl px-2 py-2 cursor-pointer"
//           />
//           <div className="flex flex-wrap gap-4 mt-4">
//             {previews.map((preview, index) => (
//               <img
//                 key={index}
//                 src={preview}
//                 alt={`Preview ${index}`}
//                 className="max-w-xs h-60 rounded-xl border border-gray-300"
//               />
//             ))}
//           </div>
//         </div>

//         <button
//           className={`self-end w-full md:w-60 px-2 py-3 rounded-2xl text-white ${
//             loading ? "bg-[#7c7aa2]" : "bg-[#483EEC]"
//           }`}
//           disabled={loading}
//         >
//           {loading ? "Updating..." : "Update Campaign"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditCampaign;

"use client";

import { useToast } from "@/hooks/use-toast";
import { publicRequest } from "@/lib/api";
import { PROJECT_CATEGORIES } from "@/lib/Constants";
import { deleteFileFromFirebase, uploadMultipleFilesToFirebase } from "@/lib/firebase";
import { CampaignFormState } from "@/lib/types";
import React, { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { X } from "lucide-react";

const EditCampaign = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const { id } = useParams(); // Get campaign ID from URL
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<CampaignFormState | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const [oldCampaignImages, setOldCampaignImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await publicRequest.get(`/campaign/${id}`);
        const campaign = res.data;
        setFormState(campaign);
        setPreviews(campaign.campaignImages || []); // Use existing images
      } catch (error) {
        console.error("Error fetching campaign:", error);
      }
    };
    fetchCampaign();
  }, [id]);

  if (!formState) return <p>Loading...</p>;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPreviews: string[] = [];
    const newFiles: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        newFiles.push(file);

        if (newPreviews.length === files.length) {
          setPreviews((prev) => [...prev, ...newPreviews]);
          setFormState((prev) =>
            prev
              ? {
                  ...prev,
                  campaignImages: [...prev.campaignImages, ...newFiles],
                }
              : prev
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => prevState && { ...prevState, [name]: value });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(
      (prevState) =>
        prevState && { ...prevState, status: e.target.value as CampaignFormState["status"] }
    );
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(
      (prevState) =>
        prevState && { ...prevState, category: e.target.value as CampaignFormState["category"] }
    );
  };

  const handleRemoveImage = (index: number) => {
    //Save Image to Old Image array if it's a string and not a file, which shows it's an old image
    const selectedImage = formState.campaignImages[index];
    if (typeof selectedImage === "string") {
      setOldCampaignImages((prev) => [...prev, selectedImage]);
    }

    setFormState((prev) =>
      prev
        ? {
            ...prev,
            campaignImages: prev.campaignImages.filter((_, i) => i !== index),
          }
        : prev
    );
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formState) return;
      const existingUrls = formState.campaignImages.filter(
        (img) => typeof img === "string"
      ) as string[];

      const newImages = formState.campaignImages.filter((img) => img instanceof File) as File[];
      let updatedImages: string[] = [...existingUrls];

      if (newImages.length > 0) {
        const uploadedUrls = await uploadMultipleFilesToFirebase(newImages, "winback_campaign");
        updatedImages = [...existingUrls, ...uploadedUrls];

        //Delete removed Images from zustand
        for (const imgUrl of oldCampaignImages) {
          await deleteFileFromFirebase(imgUrl);
        }
      }

      setFormState((prev) =>
        prev
          ? {
              ...prev,
              campaignImages: updatedImages as unknown as File[],
            }
          : prev
      );

      const updatedCampaign = {
        ...formState,
        campaignImages: updatedImages,
      };

      const campaignId = params.id;
      if (!campaignId) {
        throw new Error("Campaign ID is missing");
      }

      const res = await publicRequest.patch(`/campaign/${campaignId}`, updatedCampaign);
      if (res.status === 200) {
        toast({
          title: "Update Successful",
          description: "Your campaign was updated successfully!",
        });

        router.push("/dashboard/campaign");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating campaign:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-md:pt-20 p-4 min-h-screen bg-white md:rounded-xl">
      <h1 className="uppercase text-lg lg:text-2xl text-center mb-8">Edit Campaign</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Campaign Name</label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-xl px-2 py-2 focus:outline-none focus:border-[#483EEC]"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Description (Supports Markdown)</label>
          <textarea
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            className="border border-gray-400 rounded-xl px-2 py-2 focus:outline-none focus:border-[#483EEC]"
          />
          <div className="border border-gray-300 rounded-xl px-4 py-3 bg-gray-100 mt-2">
            <h3 className="text-sm font-semibold mb-1">Preview:</h3>
            <ReactMarkdown>{formState.description}</ReactMarkdown>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          multiple
          className="border border-gray-400 rounded-xl px-2 py-2 cursor-pointer"
        />
        <div className="flex flex-wrap gap-4 mt-4">
          {previews.map((img, index) => (
            <div key={index} className="relative group">
              <img
                src={img}
                alt={`Preview ${index}`}
                className="max-w-xs h-60 rounded-xl border border-gray-300"
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-75 group-hover:opacity-100 transition"
                onClick={() => handleRemoveImage(index)}
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Category</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROJECT_CATEGORIES.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={formState.category === category}
                  onChange={handleCategoryChange}
                  className="cursor-pointer"
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Status</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["draft", "ongoing", "completed"].map((status) => (
              <label key={status} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value={status}
                  checked={formState.status === status}
                  onChange={handleRadioChange}
                  className="cursor-pointer"
                />
                {status}
              </label>
            ))}
          </div>
        </div>

        <button
          className={`self-end w-full md:w-60 px-2 py-3 rounded-2xl text-white ${
            loading ? "bg-[#7c7aa2]" : "bg-[#483EEC]"
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Campaign"}
        </button>
      </form>
    </div>
  );
};

export default EditCampaign;
