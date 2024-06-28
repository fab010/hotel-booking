"use client";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const SortFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set('sortOption', term);
    } else {
      params.delete('sortOption');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      defaultValue={searchParams.get('sortOption')?.toString()}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      className="p-2 border rounded-md"
    >
      <option value="">Sort By</option>
      <option value="starRating">Star Rating</option>
      <option value="pricePerNightAsc">
        Price Per Night (low to high)
      </option>
      <option value="pricePerNightDesc">
        Price Per Night (high to low)
      </option>
    </select>
  );
}

export default SortFilter;