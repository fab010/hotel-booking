"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import HotelForm from "@/components/forms/manage-hotel-form/hotel-form";
import { editHotel } from "@/lib/actions/hotel.action";
import { toast } from 'sonner';
import { HotelType } from "@/types";

type HotelProp = {
    hotel: HotelType
}

const EditHotelForm = ({ hotel }: HotelProp) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string>("");
    const handleSave = (hotelFormData: FormData) => {

        startTransition(() => {
            editHotel(hotelFormData)
                .then(_ => {
                    toast.success("Hotel details updated");
                    router.push("/hotel");
                
                })
                .catch((err) => setError(err?.message));
        });
    };
    return (
        <div className="flex flex-col gap-4 my-3">
            <h1 className="text-2xl font-bold text-center">Add Hotel</h1>
            {error ? (<p className="text-sm font-semibold text-destructive bg-slate-300 text-center">{error}</p>) : (
                <div className="flex item-center justify-center">
                    <HotelForm hotel={hotel} onSave={handleSave} isLoading={isPending} />
                </div>
                
            )}

        </div>

    )
}

export default EditHotelForm;