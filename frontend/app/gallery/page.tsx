"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import Image from "next/image";
import Modal from "react-modal";
import { Navbar } from "../components";

export default function Gallery() {
  useEffect(() => {
    // Ensure this runs only on the client side because Next.js may render on the server
    if (typeof window !== "undefined") {
      // Fixes "No elements were found for selector `#__next`" error
      // Instead of `#__next`, we use `document.body` to correctly set the modal's app element
      // This ensures screen readers don't access background content when the modal is open
      Modal.setAppElement(document.body);
    }
  }, []);

  const mediaHubData = useSelector(
    (state: RootState) => state.main.fetchedGeneralDataObj.mediaHubData
  );
  const flattenedImages = mediaHubData.flatMap((item) => item.mediaImages);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div>
      <Navbar />
      <h1 className="text-center mb:4 lg:mb-8">Photo Gallery</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {flattenedImages.map((imgSrc, index) => (
          <Image
            key={index}
            src={imgSrc}
            alt=""
            width={500}
            height={500}
            priority={true}
            className="rounded-xl w-full h-72 object-cover transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={() => setSelectedImage(imgSrc)}
          />
        ))}

        {/* Lightbox Modal */}
        <Modal
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
        </Modal>
      </div>
    </div>
  );
}
