import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import { auth } from "@/auth";
import { getHotel } from "@/lib/actions/hotel.action";
import { HotelType } from "@/types";
import Container from "@/components/container";
import GuestForm from "@/components/forms/guest-form";
import { notFound } from "next/navigation";


const HotelDetail = async ({ params: { id } }: { params: { id: string } }) => {
    const session = await auth();

    const isLoggedIn = (session && session.user?.id) ? true: false;

    const hotel: HotelType = await getHotel(id);
    if (!hotel) {
        return <Container>
            <p className="text-3xl text-center mt-4">No hotel found</p>
        </Container>;
    }

    const isOwner = isLoggedIn && (session?.user?.id === hotel.userId) ? true : false;

    return (
        <Container>
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">{hotel.name}</h1>
                        <span className="flex">
                            {Array.from({ length: hotel.starRating }).map((_, index) => (
                                <AiFillStar className="fill-yellow-400" key={index} />
                            ))}
                        </span>
                    </div>
                    <div className="whitespace-pre-line">{hotel.description}</div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 overflow-hidden gap-4">
                        {hotel.imageUrls.map((image, index) => (
                            <div className="relative h-[300px] overflow-hidden" key={index}>
                                <Image
                                    src={image}
                                    alt={hotel.name}
                                    width={300}
                                    height={300}
                                    className="w-full h-full rounded-md object-cover object-center"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center gap-2">
                        {hotel.facilities.map((facility, index) => (
                            <div className="border border-slate-300 rounded-md px-3 py-2 w-fit" key={index}>
                                <span className="whitespace-nowrap">{facility}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {!isOwner && <div className="flex justify-center items-center h-[80%] w-full">
                    <GuestForm
                        hotel={hotel}
                        isLoggedIn={isLoggedIn}
                    />
                </div>
                }
            </div>
        </Container>
    )
}

export default HotelDetail;