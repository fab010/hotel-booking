"use client";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const StarRatingFilter = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const selectedStars: string[] = params.getAll("stars");

    function handleSearch(term: string) {
        params.set("page", "1");
        if (selectedStars?.includes(term)) {
            params.delete('stars');
            const stars = selectedStars.filter(star => star !== term);
            stars.map((star) => params.append('stars', star));

        } else {
            params.append('stars', term);
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Property Rating</h4>
            {["5", "4", "3", "2", "1"].map((star, index) => (
                <label key={index} className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="rounded"
                        defaultValue={star}
                        checked={selectedStars.includes(star)}
                        onChange={(e) => {
                            handleSearch(e.target.value);
                        }}
                    />
                    <span>{star} Stars</span>
                </label>
            ))}
        </div>
    );

}

export default StarRatingFilter