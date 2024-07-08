"use client";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { hotelFacilities } from "@/config/hotel-options-config";

const FacilityFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const selectedFacilties: string[] = params.getAll("facilities");
  function handleSearch(term: string) {
    params.set("page", "1");
    if (selectedFacilties?.includes(term)) {
      params.delete('facilities');
      const facilities = selectedFacilties.filter(facility => facility !== term);
      facilities.map((facility) => params.append('facilities', facility));

    } else {
      params.append('facilities', term);
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
      {hotelFacilities.map((facility, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            defaultValue={facility}
            checked={selectedFacilties.includes(facility)}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  );
}

export default FacilityFilter;