import Container from "@/components/container"
import { getHotel } from "@/lib/actions/hotel.action";
import { getCurrentUser } from "@/lib/actions/user.action";
import { BookingType, HotelType, UserType } from "@/types";
import { notFound } from "next/navigation";
import Image from 'next/image';
import MyBookingDetails from "@/components/my-booking-details";

const BookingSuccess = async ({
    params: { id },
}: {
    params: { id: string },
}) => {
    const currentUser: UserType = await getCurrentUser();
    if (!currentUser) return notFound();

    const hotel: HotelType = await getHotel(id);
    if (!hotel) return notFound();
    return (
        <Container>
            <div className="flex justify-center items-center">
                <div className="space-y-5">
                    <h1 className="text-2xl font-bold tracking-tight">Hotel Booked Successfully</h1>
                    <p className="text-lg font-normal">Thank you, <span className="font-semibold">{currentUser.firstName}</span> for booking hotel with us.</p>
                    <div className="flex flex-1 border border-slate-300 rounded-lg p-4 gap-5">
                        <div className="relative h-[300px] overflow-hidden aspect-video">
                            <Image
                                src={hotel.imageUrls[0]}
                                alt={hotel.name}
                                fill
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                        <div className="flex flex-col gap-4 overflow-y-auto">
                            <div className="text-xl font-bold">
                                {hotel.name}
                                <div className="text-sm font-normal">
                                    {hotel.city}, {hotel.country}
                                </div>
                            </div>
                            {hotel.bookings.map((booking: BookingType) => (
                                <MyBookingDetails booking={booking} key={booking._id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default BookingSuccess;