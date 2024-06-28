import { AiFillStar } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { HotelType } from '@/types';
import { Button } from '@/components/ui/button';

type Props = {
  hotel: HotelType;
};

const SearchHotel = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="relative h-[300px] overflow-hidden">
        <Image
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          width={300}
          height={300}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar className="fill-yellow-400" key={index} />
              ))}
            </span>
            <span className="ml-1 text-sm">{hotel.type}</span>
          </div>
          <Link
            href={`/hotel/${hotel._id}/details`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>

        <div className="line-clamp-4">{hotel.description}</div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 2).map((facility, index) => (
              <span key={index} className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 2 &&
                `+${hotel.facilities.length - 2} more`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex flex-col items-center justify-center">
              <span className="font-bold">£{hotel.pricePerNight} per night</span>
              <Button
                asChild
                size="lg"
                className="bg-blue-600 text-white font-semibold text-xl rounded-lg hover:bg-blue-500"
              >
                <Link
                  href={`/hotel/${hotel._id}/details`}
                >
                  View More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchHotel;