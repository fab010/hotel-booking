import Container from "@/components/container";
import SearchResultHotel from "@/components/search-result-hotel";
import { searchHotels } from "@/lib/actions/hotel.action";
import { HotelSearchResponse } from "@/types";
import SortFilter from "@/components/forms/manage-search-filters/sort-filter";
import StarRatingFilter from "@/components/forms/manage-search-filters/star-rating-filter";
import HotelTypeFilter from "@/components/forms/manage-search-filters/hotel-type-filter";
import FacilityFilter from "@/components/forms/manage-search-filters/facility-filter";
import PriceFilter from "@/components/forms/manage-search-filters/price-filter";
import Pagination from "@/components/pagination";
import SearchBar from "@/components/search-bar";

const Search = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const hotelData: HotelSearchResponse = await searchHotels(searchParams);
  const page = hotelData.pagination.page;
  const pages = hotelData.pagination.pages;

  if (!hotelData || hotelData.data.length == 0) {
    return (
      <Container>
        <div className='flex items-center justify-center'>
          <h2 className='text-xl font-medium'>Sorry, no search result found.</h2>
        </div>
      </Container>

    );
  };


  return (
    <Container>
      <div className='flex flex-col items-center gap-3 my-3'>
        <div className="relative grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5">
          <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
            <div className="space-y-5 max-sm:hidden">
              <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                Filter by:
              </h3>
              <StarRatingFilter />
              <HotelTypeFilter />
              <FacilityFilter />
              <PriceFilter />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">
                {hotelData?.pagination.total} Hotels found
                {searchParams.destination ? ` in ${searchParams.destination}` : ""}
              </span>
              <SortFilter />
            </div>
            {hotelData?.data.map((hotel) => (
              <SearchResultHotel hotel={hotel} key={hotel._id} />
            ))}
            <div>
              <Pagination
                page={page}
                pages={pages}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>

  );
}

export default Search;