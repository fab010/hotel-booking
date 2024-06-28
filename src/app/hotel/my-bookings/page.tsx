import Image from 'next/image';
import { notFound } from 'next/navigation';

import { BookingType, HotelType } from '@/types';
import { auth } from '@/auth';
import { getMyBookings } from '@/lib/actions/booking.action';
import Container from '@/components/container';
import MyBookingDetails from '@/components/my-booking-details';



const MyBooking = async () => {
    const session = await auth();
    if (!session || !session.user?.id) {
        notFound();
    }
    const userId = session.user.id as string;
    const hotels: HotelType[] = await getMyBookings(userId);
    if (!hotels || hotels.length == 0) {
        return (
            <Container>
                <div className='flex flex-col gap-3'>
                    <h1 className="text-3xl text-center font-bold">My Bookings</h1>
                    <p className='font-normal text-xl text-center'>
                        No hotel booked at the moment.
                    </p>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="flex flex-col justify-center items-center gap-5">
                <h1 className="text-2xl font-bold">My Bookings</h1>
                <div className='flex flex-col md:flex-row gap-5'>
                    {hotels.map((hotel: HotelType) => (
                        <div key={hotel._id} className="flex flex-col border border-slate-300 rounded-lg p-8 gap-3">
                            <div>
                                <p className="text-2xl font-bold">{hotel.name}</p>
                                <p className="text-sm font-normal">{hotel.city}, {hotel.country}</p>
                            </div>

                            <div className="relative overflow-hidden aspect-video">
                                <Image
                                    src={hotel.imageUrls[0]}
                                    alt={hotel.name}
                                    fill
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                            {hotel.bookings.map((booking: BookingType) => (
                                <MyBookingDetails booking={booking} key={booking._id} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    )
}

export default MyBooking;