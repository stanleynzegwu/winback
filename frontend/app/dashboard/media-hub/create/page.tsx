"use client";

import { AppDispatch, RootState } from "@/app/state/store";
import { useToast } from "@/hooks/use-toast";
import { publicRequest } from "@/lib/api";
import { uploadMultipleFilesToFirebase } from "@/lib/firebase";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMediaHubData } from "@/app/state/mainSlice";
import { useRouter } from "next/navigation";

// Define the type for formState
interface FormState {
  mediaImages: File[]; // Define mediaImages as an array of File objects
}

const CreateMediaHub = () => {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize formState with the correct type
  const [formState, setFormState] = useState<FormState>({
    mediaImages: [], // Initialize mediaImages as an empty array
  });

  const [previews, setPreviews] = useState<string[]>([]); // To display image previews

  const storeMediaHubData = useSelector(
    (state: RootState) => state.main.fetchedGeneralDataObj.mediaHubData
  );

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
            mediaImages: newFiles, // Add actual File objects to formState
          }));
        }
      };

      reader.readAsDataURL(file); // Read the file as a data URL for preview
    }
  };

  // Handle form submission (upload images to Firebase)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    let localError = "";
    // handle Empty input fields
    if (!formState.mediaImages.length) {
      localError = "No image selected; Upload an image/images";
    }

    if (localError) {
      toast({
        title: "Empty Field",
        description: localError,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    try {
      // Upload the files from formState.campaignImages (which contains File objects)
      const mediaHubImgUrls = await uploadMultipleFilesToFirebase(
        formState.mediaImages, // This now contains File objects
        "winback_mediaImage"
      );

      const mediaHubData = {
        mediaImages: mediaHubImgUrls,
      };
      // Send the data to your backend (for example, MongoDB)
      const res = await publicRequest.post("/media-hub", mediaHubData);
      if (res.status === 201) {
        toast({
          title: "Upload Successful",
          description: `${
            mediaHubData?.mediaImages.length > 1 ? "Images" : "Image"
          } uploaded successfully!`,
          variant: "success",
        });
        setLoading(false);
        // Optionally, clear the form after submission
        setPreviews([]);
        setFormState({
          mediaImages: [], // Reset the mediaImages array after successful submission
        });

        //update store
        const updatedMediaData = [res.data, ...storeMediaHubData];
        //update store data
        dispatch(updateMediaHubData(updatedMediaData));
        router.push("/dashboard/media-hub");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
      process.env.NODE_ENV === "development" && console.error("Error uploading images:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-md:pt-20 p-4 min-h-screen bg-white md:rounded-xl">
      <h1 className="uppercase text-lg lg:text-2xl text-center mb-8">Create Media</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Media Hub Image Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Upload Images</label>
          <input
            type="file"
            name="mediaImages"
            accept="image/*"
            onChange={handleImageChange}
            multiple
            className="border-[1px] border-gray-400 rounded-xl px-2 py-2 cursor-pointer focus:outline-none focus:border-[#483EEC] focus:text-gray-500"
          />
        </div>

        {/* Image Previews */}
        <div className="flex flex-wrap gap-4 mt-4">
          {previews.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Image Preview ${index + 1}`}
                className="max-w-xs h-60 aspect-square rounded-xl border-[1px] border-gray-300"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          className={`self-end w-full md:w-60 px-2 py-3 rounded-2xl text-white ${
            loading ? "bg-[#7c7aa2]" : "bg-[#483EEC]"
          }`}
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Images"}
        </button>
      </form>
    </div>
  );
};

export default CreateMediaHub;
