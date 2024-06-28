"use client";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { hotelTypes } from "@/config/hotel-options-config";

const HotelTypeFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const selectedTypes: string[] = params.getAll("types");
  function handleSearch(term: string) {
    params.set("page", "1");
    if (selectedTypes?.includes(term)) {
      params.delete('types');
      const types = selectedTypes.filter(type => type !== term);
      types.map((type) => params.append('types', type));

    } else {
      params.append('types', term);
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
      {hotelTypes.map((hotelType, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            defaultValue={hotelType}
            checked={selectedTypes.includes(hotelType)}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
          <span>{hotelType}</span>
        </label>
      ))}
    </div>
  );
}

export default HotelTypeFilter;