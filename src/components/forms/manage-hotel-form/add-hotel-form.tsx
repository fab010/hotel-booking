"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import HotelForm from "@/components/forms/manage-hotel-form/hotel-form";
import { addHotel } from "@/lib/actions/hotel.action";
import { toast } from 'sonner';


const AddHotelForm = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string>("");
    const handleSave = (hotelFormData: FormData) => {

        startTransition(() => {
            addHotel(hotelFormData)
                .then(_ => {
                    toast.success("Hotel details saved");
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
                    <HotelForm onSave={handleSave} isLoading={isPending} />
                </div>
                
            )}

        </div>

    )
}

export default AddHotelForm;