"use client";

import React, { useContext, useState } from "react";
import { addDays } from "date-fns";

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

const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProviderProps = {
    children: React.ReactNode;
};

export const SearchContextProvider = ({
    children,
}: SearchContextProviderProps) => {
    const [destination, setDestination] = useState<string>(
        () => typeof window !== "undefined" && sessionStorage.getItem("destination") || ""
    );
    const [checkIn, setCheckIn] = useState<Date>(
        () =>
            new Date(typeof window !== "undefined" && sessionStorage.getItem("checkIn") || new Date().toISOString())
    );
    const [checkOut, setCheckOut] = useState<Date>(
        () =>
            new Date(typeof window !== "undefined" && sessionStorage.getItem("checkOut") || addDays(new Date(), 1).toISOString())
    );
    const [adultCount, setAdultCount] = useState<number>(() =>
        parseInt(typeof window !== "undefined" && sessionStorage.getItem("adultCount") || "1")
    );
    const [childCount, setChildCount] = useState<number>(() =>
        parseInt(typeof window !== "undefined" && sessionStorage.getItem("childCount") || "0")
    );
    const [hotelId, setHotelId] = useState<string>(
        () => typeof window !== "undefined" && sessionStorage.getItem("hotelID") || ""
    );


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

        if (typeof window !== "undefined") {
            sessionStorage.setItem("destination", destination);
            sessionStorage.setItem("checkIn", checkIn.toISOString());
            sessionStorage.setItem("checkOut", checkOut.toISOString());
            sessionStorage.setItem("adultCount", adultCount.toString());
            sessionStorage.setItem("childCount", childCount.toString());

            if (hotelId) {
                sessionStorage.setItem("hotelId", hotelId);
            }
        }
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
