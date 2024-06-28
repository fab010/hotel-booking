"use client";

import { FormEvent, useState } from "react";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from 'next/navigation';
import SessionStorage from "@/lib/storage";
import { SearchParams } from "@/types";
import { Button } from "@/components/ui/button";



const SearchBar = () => {
  const { replace } = useRouter();
  const search: SearchParams = SessionStorage.get("search");

  const now = new Date();
  const nextDay = addDays(new Date(), 1);
  const [destination, setDestination] = useState<string>(search?.destination || '');
  const [checkIn, setCheckIn] = useState<Date>(new Date(search?.checkIn || now.toISOString()));
  const [checkOut, setCheckOut] = useState<Date>(new Date(search?.checkOut || nextDay.toISOString()));
  const [adultCount, setAdultCount] = useState<number>(Number(search?.adultCount) || 1);
  const [childCount, setChildCount] = useState<number>(Number(search?.childCount) || 0);
  const [error, setError] = useState<string>("");

  function setStartDate(date: Date) {
    setCheckIn(date);
    setCheckOut(addDays(date, 1));
  }


  const clear = (event: FormEvent) => {
    event.preventDefault();
    setDestination("");
    setAdultCount(1);
    setChildCount(0);
    setCheckIn(new Date());
    setCheckOut(nextDay);
    setError("");
    return;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (destination === "") {
      setError("Please select a destination");
      return;
    }
    const searchParams: SearchParams = {
      destination: destination,
      checkIn: checkIn.toISOString(),
      checkOut: checkOut.toISOString(),
      adultCount: adultCount.toString(),
      childCount: childCount.toString(),
    };
    SessionStorage.save("search", searchParams);


    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    replace(`/search?${queryParams}`);
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div className="flex flex-col gap-0">
      <form
        onSubmit={handleSubmit}
        className="-mt-1 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-4"
      >

        <div className="flex flex-row items-center flex-1 bg-white p-2">
          <MdTravelExplore size={25} className="mr-2" />
          <input
            type="text"
            name="destination"
            placeholder="Where are you going?"
            className="text-md w-full focus:outline-none"
            value={destination}
            onChange={(event) => setDestination(event.target.value)}
          />
        </div>



        <div className="flex bg-white px-2 py-1 gap-2">
          <label className="items-center flex">
            Adults:
            <input
              className="w-full p-1 focus:outline-none font-bold"
              type="number"
              name="adultCount"
              min={1}
              max={20}
              value={adultCount}
              onChange={(event) => setAdultCount(parseInt(event.target.value || "1"))}
            />
          </label>
          <label className="items-center flex">
            Children:
            <input
              className="w-full p-1 focus:outline-none font-bold"
              type="number"
              name="childCount"
              min={0}
              max={20}
              value={childCount}
              onChange={(event) => setChildCount(parseInt(event.target.value || "0"))}
            />
          </label>
        </div>
        <div>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setStartDate(date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkIn}
            minDate={minDate}
            maxDate={maxDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="Check-in Date"
            className="min-w-full bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full"
          />
        </div>
        <div>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date as Date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkOut}
            maxDate={maxDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="Check-out Date"
            className="min-w-full bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full"
          />
        </div>
        <div className="flex gap-1">
          <Button
            type="submit"
            size="lg"
            className="w-2/3 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-500">
            Search
          </Button>
          <Button
            size="lg"
            onClick={clear}
            className="w-1/3 bg-red-600 text-white font-semibold text-lg rounded-lg hover:bg-red-500">
            Clear
          </Button>
        </div>
      </form>
      {error && <p className="text-sm font-bold text-destructive px-4">{error}</p>}
    </div>
  );
};

export default SearchBar;
