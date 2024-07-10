"use client";

import React, { useContext, useState } from "react";
import { addDays } from "date-fns";
import SessionStorage from "@/lib/storage";
import { SearchHotelParams } from "@/types";

type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number
  ) => void;
};

const today = new Date();
const nextDay = addDays(new Date(), 1);
const initHotelSearch = () => {
    return {
      destination: "",
      checkIn: today,
      checkOut: nextDay,
      adultCount: 1,
      childCount: 0,
    }
  };

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({
  children,
}: SearchContextProviderProps) => {
  const storage: SearchHotelParams = SessionStorage.get("search") || initHotelSearch();
  const [destination, setDestination] = useState<string>(storage.destination);
  const [checkIn, setCheckIn] = useState<Date>(storage.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(storage.checkOut);
  const [adultCount, setAdultCount] = useState<number>(storage.adultCount);
  const [childCount, setChildCount] = useState<number>(storage.childCount);
  const [hotelId, setHotelId] = useState<string>(storage?.hotelId || "");

  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (hotelId) {
      setHotelId(hotelId);
    }

    const searchHotel: SearchHotelParams = {
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
      };

      SessionStorage.save("search", searchHotel);
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context as SearchContext;
};
