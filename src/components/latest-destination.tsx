import { HotelType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';


type Props = {
    hotel: HotelType;
    width: number;
};


const LatestDestination = ({ hotel, width }: Props) => {
    return (
        <Link
            href={`/search?destination=${hotel.city}`}
            className="relative overflow-hidden cursor-pointer rounded-md"
        >
            <div className="relative overflow-hidden aspect-video">
                <Image
                    src={hotel.imageUrls[0]}
                    alt={hotel.name}
                    width={width}
                    height={300}
                    style={{ objectFit: "cover" }}
                    className="w-full h-full object-center"
                />
            </div>
            <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
                <div className="flex justify-between">
                    <span className="text-white font-bold tracking-tight text-md">
                        {hotel.name}
                    </span>
                    <span className="text-white font-bold tracking-tight text-sm">
                        {hotel.city}
                    </span>
                </div>

            </div>
        </Link>
    );
}

export default LatestDestination;