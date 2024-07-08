"use server";

import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';
import connectToDb from "@/lib/db";
import Hotel from "@/models/hotel";
import { constructSearchQuery, handleError } from "@/lib/utils";
import { auth } from "@/auth";
import { uploadImages } from "@/lib/load";
import { SearchHotelQuery } from "@/types";


export const getMyHotels = async (userId: string) => {
  try {
    await connectToDb();

    const hotels = await Hotel.find({ userId }).sort({ lastUpdated: -1 });

    return JSON.parse(JSON.stringify(hotels));
  } catch (error) {
    handleError(error);
  }
};

export const getMyHotel = async (hotelId: string, userId: string) => {
  try {
    await connectToDb();
    const hotel = await Hotel.findOne({ _id: hotelId, userId: userId });
    return JSON.parse(JSON.stringify(hotel));
  } catch (error) {
    handleError(error);
  }
};

export const getHotels = async () => {
  try {
    await connectToDb();
    const hotels = await Hotel.find().sort("-lastUpdated");
    return JSON.parse(JSON.stringify(hotels));
  } catch (error) {
    handleError(error);
  }
};

export const getHotel = async (id: string) => {
  try {
    await connectToDb();
    const hotel = await Hotel.findById(id);
    return JSON.parse(JSON.stringify(hotel));
  } catch (error) {
    handleError(error);
  }
};

export const searchHotels = async (searchParams: SearchHotelQuery) => {
  const query = constructSearchQuery(searchParams);
  let sortOptions = {};
  switch (searchParams.sortOption) {
    case "starRating":
      sortOptions = { starRating: -1 };
      break;
    case "pricePerNightAsc":
      sortOptions = { pricePerNight: 1 };
      break;
    case "pricePerNightDesc":
      sortOptions = { pricePerNight: -1 };
      break;
  }

  const pageSize = 3;
  const pageNumber = parseInt(
    searchParams.page ? searchParams.page : "1"
  );

  const skip = (pageNumber - 1) * pageSize;

  try {
    await connectToDb();
    const hotels = await Hotel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize);

    const total = await Hotel.countDocuments(query);

    const response = {
      data: JSON.parse(JSON.stringify(hotels)),
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / pageSize),
      },
    }
    revalidatePath("/search");
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    handleError(error);
  }
};

export const addHotel = async (hotelFormData: FormData) => {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }
  const userId = session.user.id;


  const files = hotelFormData.getAll('imageFiles') as File[];
  const imageUrls = await uploadImages(files);

  const {
    name,
    city,
    country,
    description,
    starRating,
    type,
    pricePerNight,
    adultCount,
    childCount,
  } = Object.fromEntries(hotelFormData.entries());

  const facilities = hotelFormData.getAll('facilities') as string[];

  try {
    await connectToDb();
    const newHotel = Hotel.create({
      name,
      city,
      country,
      description,
      starRating,
      type,
      facilities,
      pricePerNight,
      adultCount,
      childCount,
      imageUrls,
      userId,
      lastUpdated: new Date()
    });


    revalidatePath("/hotel");
    return JSON.parse(JSON.stringify(newHotel));
  } catch (error) {
    handleError(error);
  }

};

export const editHotel = async (hotelFormData: FormData) => {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;


  const files = hotelFormData.getAll('imageFiles') as File[];
  const updatedImageUrls = await uploadImages(files);

  const {
    name,
    city,
    country,
    description,
    starRating,
    type,
    pricePerNight,
    adultCount,
    childCount,
    hotelId,
  } = Object.fromEntries(hotelFormData.entries());

  const facilities = hotelFormData.getAll('facilities') as string[];
  const imageUrls = hotelFormData.getAll('imageUrls') as string[];

  try {
    await connectToDb();
    const updatedHotel = {
      name,
      city,
      country,
      description,
      starRating,
      type,
      facilities,
      pricePerNight,
      adultCount,
      childCount,
      imageUrls,
      lastUpdated: new Date(),
    }


    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: hotelId,
        userId: userId,
      },
      updatedHotel,
      { new: true }
    );

    if (!hotel) {
      throw new Error("Hotel not found");
    }

    hotel.imageUrls = [
      ...updatedImageUrls,
      ...(updatedHotel.imageUrls || []),
    ];

    revalidatePath("/hotel");
    return JSON.parse(JSON.stringify(await hotel.save()));
  } catch (error) {
    handleError(error);
  }

};


export const searchAction = async (
  destination: string,
  checkIn: string,
  checkOut: string,
  adultCount: string,
  childCount: string) => {

  const params = new URLSearchParams();
  params.set("destination", destination);
  params.set("checkIn", checkIn);
  params.set("checkOut", checkOut);
  params.set("adultCount", adultCount);
  params.set("childCount", childCount);

  redirect(`/search?${params.toString()}`);

};

