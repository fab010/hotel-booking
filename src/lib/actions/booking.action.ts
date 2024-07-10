"use server";

import Stripe from "stripe";
import connectToDb from "@/lib/db";
import Hotel from "@/models/hotel";
import { handleError } from "@/lib/utils";
import { BookingParams, BookingHotelParams, HotelType } from "@/types";
import { redirect } from "next/navigation";




export const createPaymentIntent = async (data: BookingHotelParams) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    let session = null;
    try {
        await connectToDb();
        const hotel = await Hotel.findById(data?.hotelId) as HotelType;
        if (!hotel) {
            throw new Error("Hotel not found");
        }

        const nights =
            Math.ceil(Math.abs(data.checkOut.getTime() - data.checkIn.getTime()) /
                (1000 * 60 * 60 * 24));

        const price = hotel.pricePerNight * 100;
        session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'gbp',
                        unit_amount: price,
                        product_data: {
                            name: hotel.name
                        },
                    },
                    quantity: nights
                },
            ],
            metadata: {
                adultCount: data.adultCount.toString(),
                childCount: data.childCount.toString(),
                checkIn: data.checkIn.toISOString(),
                checkOut: data.checkOut.toISOString(),
                hotelId: data.hotelId,
                userId: data.userId
            },
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/hotel/${hotel._id}/booking-success`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
        });


    }
    catch (err) {
        throw err;
    }

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
            .elemMatch({ userId, checkOut: { $gte: Date.now() } });

        return JSON.parse(JSON.stringify(hotels));
    } catch (error) {
        handleError(error);
    }
};