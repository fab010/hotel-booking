import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createBooking } from "@/lib/actions/booking.action";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export async function POST(req: NextRequest) {
  const body = await req.text();

  const sig = req.headers.get('stripe-signature') as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  const event = stripe.webhooks.constructEvent(body, sig, endpointSecret);


  if (event.type === "checkout.session.completed") {
    const { id, amount_total, metadata } = event.data.object;
    const booking = {
      stripeId: id,
      userId: metadata?.userId || '',
      adultCount: Number(metadata?.adultCount) || 0,
      childCount: Number(metadata?.childCount) || 0,
      checkIn: new Date(metadata?.checkIn || ''),
      checkOut: new Date(metadata?.checkOut || ''),
      totalCost: amount_total ? (amount_total / 100) : 0,
      createdAt: new Date(),
    }

    const hotelId = metadata?.hotelId || '';
    await createBooking(booking, hotelId);
  }

  return new NextResponse();
}
