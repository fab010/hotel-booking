"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from "react-hook-form";
import { LuCalendarDays } from "react-icons/lu";
import { addDays } from "date-fns";
import DatePicker from "react-datepicker";
import { HotelType } from '@/types';



type Props = {
    hotel: HotelType;
    isLoggedIn: boolean;
};

type GuestInfoFormData = {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
};



const GuestForm = ({ hotel, isLoggedIn }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = {
        checkIn: searchParams.get('checkIn'),
        checkOut: searchParams.get('checkOut'),
        adultCount: searchParams.get('adultCount'),
        childCount: searchParams.get('childCount'),
    }

    const {
        watch,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<GuestInfoFormData>({
        defaultValues: {
            checkIn: new Date(search.checkIn || ""),
            checkOut: new Date(search.checkOut || ""),
            adultCount: Number(search.adultCount) || 1,
            childCount: Number(search.childCount) || 0,
        },
    });

    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const handleChange = ([newStartDate, newEndDate]: [Date, Date]) => {
        setValue("checkIn", newStartDate);
        setValue("checkOut", newEndDate);
    };

    const onSubmit = (data: GuestInfoFormData) => {
        const {checkIn, checkOut, adultCount, childCount } = data;

        const params = new URLSearchParams();

        params.set("checkIn", checkIn.toDateString());
        params.set("checkOut", checkOut.toDateString());
        params.set("adultCount", adultCount.toString());
        params.set("childCount", childCount.toString());

        router.push(`/hotel/${hotel._id}/booking?${params.toString()}`);

    };


    return (
        <div className="flex flex-col p-4 bg-blue-200 gap-4">
            <div className="flex justify-between gap-2">
                <span className="text-sm font-bold">{hotel.city}, {hotel.country}</span>
                <h3 className="text-sm font-bold">£{hotel.pricePerNight} <span className="font-normal">per night</span></h3>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="grid grid-cols-1 gap-4 items-center">
                    <div>
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
                    <div className="flex bg-white px-2 py-1 gap-2">
                        <label className="items-center flex">
                            Adults:
                            <input
                                className="w-full p-1 focus:outline-none font-bold"
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
                        <label className="items-center flex">
                            Children:
                            <input
                                className="w-full p-1 focus:outline-none font-bold"
                                type="number"
                                min={0}
                                max={20}
                                {...register("childCount", {
                                    valueAsNumber: true,
                                })}
                            />
                        </label>
                        {errors.adultCount && (
                            <span className="text-red-500 font-semibold text-sm">
                                {errors.adultCount.message}
                            </span>
                        )}
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-600 text-white h-full p-2 font-bold text-xl rounded-lg hover:bg-blue-500"
                        >
                        Book Now
                    </button>
                </div>
            </form>
        </div>
    );
}

export default GuestForm;