import { redirect, notFound } from 'next/navigation';
import BookingSummary from '@/components/booking-summary';
import Container from '@/components/container';
import { getHotel } from '@/lib/actions/hotel.action';
import { getCurrentUser } from '@/lib/actions/user.action';
import { HotelType, UserType } from '@/types';


const HotelBooking = async ({
    params: { id },
}: {
    params: { id: string },
}) => {

    const currentUser: UserType = await getCurrentUser();
    if (!currentUser) return notFound();

    const hotel: HotelType = await getHotel(id);
    if (!hotel) return notFound();

    if(currentUser._id === hotel.userId) {
        redirect(`/hotel/${hotel._id}/details`);
    }

    return (
        <Container>
            <div className="flex flex-col justify-center items-center gap-5">
                <h1 className="text-2xl font-bold">Booking Hotel</h1>
                <BookingSummary hotel={hotel} currentUser={currentUser} />
            </div>
        </Container>

    );
}

export default HotelBooking;