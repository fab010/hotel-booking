"use client";

import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "@/types";


const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls?.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-bold">Images</h2>
      {existingImageUrls && (
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {existingImageUrls.map((url, index) => (
            <div className="relative w-auto group" key={index}>
              <Image 
                 src={url}  
                 width={100}
                 height={135}
                 alt=""
                 className="min-h-full object-cover" 
                 />
              <button
                onClick={(event) => handleDelete(event, url)}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
        
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);

              if (totalLength === 0) {
                return "At least one image should be added";
              }

              if (totalLength > 6) {
                return "Total number of images cannot be more than 6";
              }

              return true;
            },
          })}
        />
      {errors.imageFiles && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
