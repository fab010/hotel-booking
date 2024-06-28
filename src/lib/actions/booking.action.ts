"use server";

import Stripe from "stripe";
import connectToDb from "@/lib/db";
import Hotel from "@/models/hotel";
import { handleError } from "@/lib/utils";
import { BookingParams, BookingType, HotelType, PaymentIntent } from "@/types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createPaymentIntent = async (data: PaymentIntent) => {
    await connectToDb();
    const hotel = await Hotel.findById(data.hotelId);
    if (!hotel) {
        throw new Error("Hotel not found");
    }

    const nights =
        Math.abs(data.checkOut.getTime() - data.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: "gbp",
                    unit_amount: hotel.pricePerNight * 100,
                    product_data: {
                        name: hotel.name,
                    },
                },
                quantity: Math.ceil(nights),
            },
        ],
        metadata: {
            hotelId: data.hotelId,
            userId: data.userId,
            checkIn: data.checkIn.toISOString(),
            checkOut: data.checkOut.toISOString(),
            adultCount: data.adultCount,
            childCount: data.childCount,
        },
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/hotel/${hotel._id}/booking-success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });


    redirect(session.url as string);
};

export const createBooking = async (booking: BookingParams, hotelId: string) => {
    try {
        await connectToDb();
        const hotel = await Hotel.findOneAndUpdate(
            { _id: hotelId },
            {
                $push: { bookings: booking },
            },
            {
                new: true
            }
        );

        return JSON.parse(JSON.stringify(hotel));
    } catch (error) {
        handleError(error);
    }
};

export const getMyBookings = async (userId: string) => {
    try {
        await connectToDb();
        const hotels = await Hotel.find()
                                  .where('bookings')
                                  .elemMatch({userId: userId, checkOut: {$gte: Date.now()}});
        // const hotels = await Hotel.find({
        //     bookings: { $elemMatch: { userId: userId } },
        // });

        // const results = hotels.map((hotel) => {
        //     const userBookings = hotel.bookings.filter(
        //         (booking: BookingType) => booking.userId === userId
        //     );

        //     const hotelWithUserBookings: HotelType = {
        //         ...hotel.toObject(),
        //         bookings: userBookings,
        //     };

        //     return hotelWithUserBookings;
        // });

        return JSON.parse(JSON.stringify(hotels));
    } catch (error) {
        handleError(error);
    }
};