import LatestDestination from '@/components/latest-destination';
import Container from "@/components/container";
import SearchBar from "@/components/search-bar";
import { getHotels } from '@/lib/actions/hotel.action';
import { HotelType } from "@/types";

export default async function Home() {
  const hotels: HotelType[] = await getHotels();
  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <Container>
        <div className="flex flex-col items-center gap-3 my-3">
          <h2 className="text-2xl font-bold">Latest Destinations</h2>
          <p>Most recent desinations added by our hosts</p>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topRowHotels.map((hotel) => (
                <LatestDestination hotel={hotel} width={600} key={hotel._id} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {bottomRowHotels.map((hotel) => (
                <LatestDestination hotel={hotel} width={300} key={hotel._id} />
              ))}
            </div>
          </div>
        </div>
    </Container>

  );
}
