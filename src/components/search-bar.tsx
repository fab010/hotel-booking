"use client";

import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { MdTravelExplore } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { useSearchContext } from "@/context/search-context";



type SearchFormData = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const SearchBar = () => {
  const router = useRouter();
  const search = useSearchContext();


  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SearchFormData>({
    defaultValues: {
      destination: search.destination,
      checkIn: new Date(search.checkIn || ""),
      checkOut: new Date(search.checkOut || ""),
      adultCount: Number(search.adultCount) || 1,
      childCount: Number(search.childCount) || 0,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const handleChange = ([newStartDate, newEndDate]: [Date, Date]) => {
    setValue("checkIn", newStartDate);
    setValue("checkOut", newEndDate);
  };

  const onSubmit = async (data: SearchFormData) => {
    const { destination, checkIn, checkOut, adultCount, childCount } = data;
    

    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );

    const params = new URLSearchParams();
    params.set("destination", destination);
    params.set("checkIn", checkIn.toDateString());
    params.set("checkOut", checkOut.toDateString());
    params.set("adultCount", adultCount.toString());
    params.set("childCount", childCount.toString());
    router.push(`/search?${params.toString()}`);
    return;
  };


  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);


  return (
    <div className="relative p-3 bg-orange-400 shadow-md w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center"
      >

        <div className="flex items-center bg-white p-2 rounded-lg">
          <MdTravelExplore size={25} className="mr-2" />
          <input
            type="text"
            placeholder="Where are you going?"
            className="text-sm font-medium w-full h-8 focus:outline-none"
            {...register("destination", {
              required: "Please destination is required",
            })}
          />
        </div>

        <div className="flex items-center bg-white p-2 rounded-lg gap-2">
          <label className="flex items-center text-sm font-medium h-8 gap-2">
            <span>Adults:</span>
            <input
              className="w-full focus:outline-none"
              type="number"
              min={1}
              max={20}
              {...register("adultCount", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "There must be at least one adult",
                },
                valueAsNumber: true,
              })}
            />
          </label>
          <label className="flex items-center text-sm font-medium h-8 gap-2">
            <span>Children: </span>
            <input
              className="w-full focus:outline-none"
              type="number"
              min={0}
              max={10}
              {...register("childCount", {
                valueAsNumber: true,
              })}
            />
          </label>
        </div>
        <div className="bg-white p-2 rounded-lg">
          <DatePicker
            showIcon
            selected={checkIn}
            startDate={checkIn}
            endDate={checkOut}
            onChange={handleChange}
            selectsRange
            dateFormat=" eee MMM d"
            monthsShown={2}
            icon={<LuCalendarDays size={16} />}
            className="text-sm font-medium p-2 w-full focus:outline-none"
            wrapperClassName="min-w-full"
          />
        </div>

        <Button
          type="submit"
          className="bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-500 w-fit"
        >
          Search
        </Button>
      </form>
      {errors.adultCount && (
        <span className="text-red-500 font-semibold text-sm">
          {errors.adultCount.message}
        </span>
      )}
      {errors.destination && (
        <span className="text-red-500 font-semibold text-sm">
          {errors.destination.message}
        </span>
      )}
    </div>
  );
};

export default SearchBar;
