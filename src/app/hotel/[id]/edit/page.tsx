import EditHotelForm from "@/components/forms/manage-hotel-form/edit-hotel-form";
import Container from "@/components/container";
import { HotelType } from "@/types";
import { getMyHotel } from "@/lib/actions/hotel.action";
import { auth } from "@/auth";


const EditHotel = async ({ params: { id } }: { params: { id: string } }) => {
    const session = await auth();
    if (!session || !session.user?.id) {
        return (
            <Container>
                <p className="text-xl font-normal text-center mt-4">Unauthorized Access!</p>
            </Container>
        );
    }
    const userId = session.user.id;
    const hotel: HotelType = await getMyHotel(id, userId);

    if (!hotel) {
        return (
            <Container>
                <p className="text-xl font-normal text-center mt-4">Unauthorized Access!</p>
            </Container>
        );
    }

    return (
        <Container>
            <EditHotelForm hotel={hotel} />
        </Container>

    );
}

export default EditHotel;