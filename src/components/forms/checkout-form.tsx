"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { BookingHotelParams } from "@/types";
import { Button } from "@/components/ui/button";
import { createPaymentIntent } from "@/lib/actions/booking.action";

type Props = {
    paymentIntent: BookingHotelParams;
};



loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

const CheckoutForm = ({ paymentIntent }: Props) => {

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when youâ€™re ready.');
        }
    }, []);

    const onCheckout = async () => {
        await createPaymentIntent(paymentIntent);
    }

    return (
        <form action={onCheckout} method="post">
            <Button 
                type="submit" 
                role="link" 
                size="lg" 
                className="bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-500"
                >
                Booking Payment
            </Button>
        </form>
    );
}

export default CheckoutForm;