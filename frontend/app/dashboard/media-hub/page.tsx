"use client";

import { AppDispatch, RootState } from "@/app/state/store";
import { useToast } from "@/hooks/use-toast";
import { publicRequest } from "@/lib/api";
import { deleteFileFromFirebase } from "@/lib/firebase";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { updateMediaHubData } from "@/app/state/mainSlice";
import DialogBox from "@/app/components/DialogBox";

const MediaHub = () => {
  const { toast } = useToast();
  const dispatch = useDispatch<AppDispatch>();

  const mediaHubData = useSelector(
    (state: RootState) => state.main.fetchedGeneralDataObj.mediaHubData
  );
  //const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleDeleteOrUpdate = async (
    id: string,
    imgUrl: string,
    reqMethod: "delete" | "update"
  ) => {
    const media = mediaHubData.find(({ _id }) => _id === id);

    const updatedMedia =
      reqMethod === "update" && media
        ? {
            ...media,
            mediaImages: media.mediaImages?.filter((img) => img !== imgUrl) || [],
          }
        : undefined;

    if (media) {
      try {
        const res =
          reqMethod === "delete"
            ? await publicRequest.delete(`/media-hub/${id}`)
            : await publicRequest.patch(`/media-hub/${id}`, updatedMedia);

        if (res.status === 200) {
          //Delete Image from firebase
          await deleteFileFromFirebase(imgUrl);

          //remove deleted campaignData
          const filteredMediaData =
            reqMethod === "delete"
              ? mediaHubData.filter((media) => media._id !== id)
              : mediaHubData.map((m) => (m._id === id && updatedMedia ? updatedMedia : m));

          //update store
          dispatch(updateMediaHubData(filteredMediaData));
          toast({
            title: "Delete Successful",
            description: "Media deleted successfully!",
            variant: "success",
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: `${error}`,
          variant: "destructive",
        });
        process.env.NODE_ENV === "development" && console.error("Error deleting Image:", error);
      }
    }
  };

  return (
    <div className="max-md:pt-20 p-4 min-h-screen bg-white md:rounded-xl">
      <h1 className="uppercase text-lg lg:text-2xl text-center mb-8">Media Hub</h1>
      {/* Create Media-Hub Btn */}
      <Link href="/dashboard/media-hub/create">
        <button className="w-full p-4 rounded-xl bg-green-500">Create</button>
      </Link>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {mediaHubData.map(({ mediaImages, _id }, index) =>
          mediaImages.map((imgSrc, i) => (
            <div
              className="relative hover:scale-105 hover:shadow-xl transition-transform duration-300"
              key={`${index - i}`}
            >
              <Image
                src={imgSrc}
                alt="winback_media-image"
                width={500}
                height={500}
                priority={true}
                className="rounded-xl w-full h-72 object-cover "
              />

              <DialogBox
                func={() => {
                  const reqMethod = mediaImages.length > 1 ? "update" : "delete";
                  handleDeleteOrUpdate(_id, imgSrc, reqMethod);
                }}
                confirmMessage={
                  "This action will permanently delete the image. This cannot be undone."
                }
              >
                <span className="absolute flex items-center justify-center w-8 h-8 top-2 right-2 rounded-full p-[6px] text-white bg-red-700 text-center cursor-pointer hover:bg-red-600 transition-all duration-300">
                  <Trash />
                </span>
              </DialogBox>
            </div>
          ))
        )}

        {/* Lightbox Modal */}
        {/* <Modal
                isOpen={!!selectedImage}
                onRequestClose={() => setSelectedImage(null)}
                className="fixed inset-0 flex items-center justify-center bg-black/80"
              >
                <div className="relative p-4">
                  <button
                    className="absolute top-2 right-2 text-white text-3xl"
                    onClick={() => setSelectedImage(null)}
                  >
                    ✕
                  </button>
                  {selectedImage && (
                    <Image
                      src={selectedImage}
                      alt="Enlarged Image"
                      width={800}
                      height={800}
                      className="max-w-full max-h-[90vh] rounded-xl"
                    />
                  )}
                </div>
              </Modal> */}
      </div>
    </div>
  );
};

export default MediaHub;
