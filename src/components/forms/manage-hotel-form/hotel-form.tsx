"use client";

import { FormProvider, useForm } from "react-hook-form";
import { useEffect } from "react";
import DetailsSection from "./details-section";
import TypeSection from "./type-section";
import FacilitiesSection from "./facilities-section";
import GuestsSection from "./guests-section";
import ImagesSection from "./images-section";
import { HotelType, HotelFormData } from "@/types";
import { Button } from "@/components/ui/button";





type Props = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
};



const HotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      const hotelId = hotel._id!
      formData.append("hotelId", hotelId);
    }
    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append("facilities", facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append("imageUrls", url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile: File) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  return (
    <div className="max-w-[80%]">
      <FormProvider {...formMethods} >
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestsSection />
          <ImagesSection />
          <div className="flex justify-end">
            <Button
              disabled={isLoading}
              type="submit"
              size="lg"
              className="bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-500"

            >
              {isLoading ? "Saving..." : " Save "}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>

  );
};

export default HotelForm;
