import { BookingType } from "@/types";

type Props = {
    booking: BookingType;
};

const MyBookingDetails = ({ booking }: Props) => {
    return (
        <div className="space-y-2 text-normal py-2">
            <div>
                Dates:
                <div  className="font-semibold">
                    {new Date(booking.checkIn).toDateString()}{" - "}
                    {new Date(booking.checkOut).toDateString()}
                </div>
            </div>
            <div>
                Guests:
                <div className="font-semibold">
                    {booking.adultCount} adults, {booking.childCount} children
                </div>
            </div>
            <div>
                Total Cost:
                <div className="font-semibold">
                    £{booking.totalCost.toFixed(2)}
                </div>
            </div>
        </div>
    )
}

export default MyBookingDetails;