import Link from 'next/link';
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { HotelType } from '@/types';
import { Button } from '@/components/ui/button';

const HotelDetails = ({ hotel }: { hotel: HotelType }) => {
    return (
        <div
            data-testid="hotel-card"
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
        >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="text-sm whitespace-pre-line line-clamp-2">{hotel.description}</div>
            <div className="flex flex-wrap gap-2 text-sm font-semibold">
                <div className="border border-slate-300 rounded-sm p-4 flex items-center justify-center">
                    <BsMap className="mr-1" />
                    <span className='whitespace-nowrap'>{hotel.city}, {hotel.country}</span>
                </div>
                <div className="border border-slate-300 rounded-sm p-4 flex items-center justify-center">
                    <BsBuilding className="mr-1" />
                    <span className='whitespace-nowrap'>{hotel.type}</span>
                </div>
                <div className="border border-slate-300 rounded-sm p-4 flex items-center justify-center">
                    <BiMoney className="mr-1" />
                    <span className='whitespace-nowrap'>£{hotel.pricePerNight} per night</span>
                </div>
                <div className="border border-slate-300 rounded-sm p-4 flex items-center justify-center">
                    <BiHotel className="mr-1" />
                    <span className='whitespace-nowrap'>{hotel.adultCount} adults, {hotel.childCount} children</span>
                </div>
                <div className="border border-slate-300 rounded-sm p-4 flex items-center justify-center">
                    <BiStar className="mr-1" />
                    <span className='whitespace-nowrap'>{hotel.starRating} Star Rating</span>
                </div>
            </div>
            <div className="flex justify-end">
                <Button 
                    asChild
                    size="lg"
                    className="bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-500"
                    >
                    <Link href={`/hotel/${hotel._id}/edit`}>
                        Edit
                    </Link>
                </Button>
            </div>

        </div>
    );
}

export default HotelDetails;