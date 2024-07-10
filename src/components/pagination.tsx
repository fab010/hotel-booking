"use client";

import { useSearchParams, usePathname, useRouter } from 'next/navigation';


type Props = {
    page: number;
    pages: number;
};


const Pagination = ({ page, pages }: Props) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }

    function onPageChange(page: number) {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push(`${pathname}?${params.toString()}`, {scroll: false});
    }

    return (
        <div className="flex justify-center items-center">
            <ul className="flex border border-slate-300">
                {pageNumbers.map((number, index) => (
                    <li key={index} className={`px-2 py-1 ${page === number ? "bg-gray-200" : ""}`}>
                        <button onClick={() => onPageChange(number)} disabled={page === number}>{number}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pagination;