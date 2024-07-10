import Link from 'next/link';
import { getMyHotels } from '@/lib/actions/hotel.action';
import { HotelType } from '@/types';
import HotelDetails from '@/components/hotel-details';
import Container from "@/components/container";
import { Button } from '@/components/ui/button';
import { auth } from "@/auth";

const MyHotels = async () => {
    const session = await auth();
    if (!session || !session.user?.id) {
        return (
            <Container>
                <p className="text-xl font-normal text-center mt-4">Unauthorized Access!</p>
            </Container>
        );
    }
    const userId = session.user.id;
    const hotelData: HotelType[] = await getMyHotels(userId);


    if (!hotelData || hotelData.length == 0) {
        return (
            <Container>
                <div className='flex flex-col justify-center items-center gap-3'>
                    <h1 className="text-2xl font-bold">My Hotels</h1>
                    <p className='font-normal text-xl'>
                        No hotel found.{" "}
                        <Button
                            asChild
                            size="lg"
                            className="bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-500"
                        >
                            <Link href="/hotel/add-hotel">
                                Add Hotel
                            </Link>
                        </Button>
                    </p>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <div className="space-y-5 my-4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">My Hotels</h1>
                    <Button
                        asChild
                        size="lg"
                        className="bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-500"
                    >
                        <Link
                            href="/hotel/add-hotel"
                        >
                            Add Hotel
                        </Link>
                    </Button>

                </div>
                <div className="flex flex-col gap-4">
                    {hotelData.map((hotel: HotelType) => (
                        <HotelDetails hotel={hotel} key={hotel._id} />
                    ))}
                </div>
            </div>
        </Container>
    );

}

export default MyHotels;