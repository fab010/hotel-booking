"use client";

import { useState } from "react";
import { MdTravelExplore } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { useSearchContext } from "@/context/search-context";
import { searchAction } from "@/lib/actions/hotel.action";



const SearchBar = () => {
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(new Date(search.checkIn));
  const [checkOut, setCheckOut] = useState<Date>(new Date(search.checkOut));
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  const [error, setError] = useState<string>("");

  
  const handleChange = ([newStartDate, newEndDate]: [Date, Date]) => {
    setCheckIn(newStartDate);
    setCheckOut(newEndDate);
  };

  const handleSearch = async() => {
    setError("");

    if (destination === "") {
      setError("Please select a destination");
      return;
    }

    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );

    await searchAction(
      destination,
      checkIn.toDateString(),
      checkOut.toDateString(),
      adultCount.toString(),
      childCount.toString()
    );
    
  };

  
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);


  return (
    <div className="relative p-3 bg-orange-400 rounded shadow-md w-full">
        <form
          action={handleSearch}
          method="post"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center"
        >

          <div className="flex items-center bg-white p-2 rounded-lg">
            <MdTravelExplore size={25} className="mr-2" />
            <input
              type="text"
              name="destination"
              placeholder="Where are you going?"
              className="text-sm font-medium w-full h-8 focus:outline-none"
              defaultValue={destination}
              onChange={(event) => setDestination(event.target.value)}
            />
          </div>



          <div className="flex items-center bg-white p-2 rounded-lg gap-2">
            <label className="flex items-center text-sm font-medium h-8 gap-2">
              <span>Adults:</span>
              <input
                className="w-full focus:outline-none"
                type="number"
                name="adultCount"
                min={1}
                max={20}
                defaultValue={adultCount}
                onChange={(event) => setAdultCount(parseInt(event.target.value))}
              />
            </label>
            <label className="flex items-center text-sm font-medium h-8 gap-2">
              <span>Children: </span>
              <input
                className="w-full focus:outline-none"
                type="number"
                name="childCount"
                min={0}
                max={20}
                defaultValue={childCount}
                onChange={(event) => setChildCount(parseInt(event.target.value))}
              />
            </label>
          </div>
          <div className="bg-white p-2 rounded-lg">
            <DatePicker
              showIcon
              selected={checkIn}
              startDate={checkIn}
              endDate={checkOut}
              onChange={handleChange}
              selectsRange
              dateFormat=" eee MMM d"
              monthsShown={2}
              icon={<LuCalendarDays size={16} />}
              className="text-sm font-medium p-2 w-full focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>

          <Button
            type="submit"
            className="bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-500 w-fit"
          >
            Search
          </Button>
        </form>
        {error && <p className="text-sm font-bold text-black px-4">{error}</p>}
      </div>
  );
};

export default SearchBar;
