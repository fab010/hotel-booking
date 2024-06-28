"use client";

import { addDays } from "date-fns";
import { HotelType, PaymentIntent, SearchParams, UserType } from '@/types';
import SessionStorage from "@/lib/storage";
import CheckoutForm from './forms/checkout-form';


type Props = {
    hotel: HotelType;
    currentUser: UserType;
};



const BookingSummary = ({ hotel, currentUser }: Props) => {
    const search: SearchParams = SessionStorage.get("search");
    const now = new Date();
    const nextDay = addDays(new Date(), 1);

    const paymentIntent: PaymentIntent = {
        adultCount: Number(search?.adultCount) || 1,
        childCount: Number(search?.childCount) || 0,
        checkIn: new Date(search?.checkIn || now),
        checkOut: new Date(search.checkOut || nextDay),
        hotelId: hotel._id,
        userId: currentUser._id,
    };

    const numOfNights =
        Math.ceil(Math.abs(paymentIntent.checkOut.getTime() - paymentIntent.checkIn.getTime()) /
            (1000 * 60 * 60 * 24));

    const nights = numOfNights > 1 ? 'nights' : 'night';

    const totalCost = hotel.pricePerNight * numOfNights;


    return (
        <div className="space-y-5">
            <div className="flex flex-col md:flex-row md:justify-between rounded-lg border border-slate-300 p-5 gap-5">
                <div className="flex flex-col h-fit gap-4">
                    <h2 className="text-2xl">Customer Details</h2>
                    <div className="border-b py-2">
                        Name:
                        <div className="font-bold">{currentUser.firstName} {currentUser.lastName}</div>
                    </div>
                    <div className="border-b py-2">
                        Email:
                        <div className="font-bold">{currentUser.email}</div>
                    </div>
                    <div className="space-y-2 py-2">
                        <h3 className="text-xl">Your Price Summary</h3>
                        <div className="bg-blue-200 p-4 rounded-md">
                            Total Cost:
                            <div className="font-semibold text-lg">
                                 £{totalCost.toFixed(2)}
                            </div>
                            <div className="text-xs">Includes taxes and charges</div>
                        </div>
                    </div>
                </div>


                <div className="flex flex-col border-l h-fit px-4 gap-4">
                    <h2 className="text-2xl">Booking Summary</h2>
                    <div className="border-b py-2">
                        Location:
                        <div className="flex-1 font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
                    </div>
                    <div className="flex flex-1 justify-between border-b py-2 gap-2">
                        <div>
                            Check-in
                            <div className="font-bold"> {paymentIntent.checkIn.toDateString()}</div>
                        </div>
                        <div>
                            Check-out
                            <div className="font-bold"> {paymentIntent.checkOut.toDateString()}</div>
                        </div>
                    </div>

                    <div className="border-b py-2">
                        Guests{" "}
                        <div className="font-bold">
                            {paymentIntent.adultCount} adults & {paymentIntent.childCount} children
                        </div>
                    </div>

                    <div className="border-b py-2">
                        Price:
                        <div className="font-bold">£{hotel.pricePerNight} per night</div>
                    </div>

                    <div className="py-2">
                        Total length of stay:
                        <div className="font-bold">{numOfNights}  {nights}</div>
                    </div>
                </div>

            </div>
            <div className="flex justify-end">
                <CheckoutForm paymentIntent={paymentIntent} />
            </div>
        </div>
    );
}

export default BookingSummary;