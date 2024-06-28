"use client";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';


const PriceFilter = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    
    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        if (term) {
            params.set('maxPrice', term);
        } else {
            params.delete('maxPrice');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div>
            <h4 className="text-md font-semibold mb-2"> Max Price</h4>
            <select
                className="p-2 border rounded-md w-full"
                defaultValue={searchParams.get('maxPrice')?.toString()}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
            >
                <option value="">Select Max Price</option>
                {[50, 100, 200, 300, 500].map((price, index) => (
                    <option key={index} value={price}>{price}</option>
                ))}
            </select>
        </div>
    );
}

export default PriceFilter;