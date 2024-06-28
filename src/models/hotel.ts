import mongoose from "mongoose";

import { BookingType, HotelType } from "../types";


const bookingSchema = new mongoose.Schema<BookingType>({
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    userId: { type: String, required: true },
    stripeId: { type: String, required: true },
    totalCost: { type: Number, required: true },
    createdAt: { type: Date, required: true },
  });
  


const hotelSchema = new mongoose.Schema<HotelType>({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    facilities: [{ type: String, required: true }],
    pricePerNight: { type: Number, required: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    imageUrls: [{ type: String, required: true }],
    lastUpdated: { type: Date, required: true },
    bookings: [bookingSchema],
});

const Hotel = mongoose.models?.Hotel || mongoose.model<HotelType>("Hotel", hotelSchema);
export default Hotel;

