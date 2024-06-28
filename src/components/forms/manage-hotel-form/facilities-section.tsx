"use client";

import { useFormContext } from "react-hook-form";
import { HotelFormData } from "@/types";
import { hotelFacilities } from "@/config/hotel-options-config";


const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-bold">Facilities</h2>
      <div className="flex flex-wrap gap-2">
        {hotelFacilities.map((facility, index) => (
          <label key={index} className="text-sm flex item-center gap-1 text-gray-700 whitespace-nowrap">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
