"use client";

import { useFormContext } from "react-hook-form";
import { HotelFormData } from "@/types";
import { hotelTypes } from "@/config/hotel-options-config";



const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-bold">Type</h2>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {hotelTypes.map((type, index) => (
          <label
            key={index}
            className={
              typeWatch === type
                ? "flex items-center justify-center cursor-pointer bg-blue-300 text-sm rounded-full py-2 px-4 whitespace-nowrap"
                : "flex items-center justify-center cursor-pointer bg-gray-300 text-sm rounded-full py-2 px-4 whitespace-nowrap"
            }
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span className="text-center">{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
