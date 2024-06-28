import { BookOpenIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { auth } from "@/auth";
import NavLink from "@/components/nav-link";

const Navbar = async () => {
    const session = await auth();
    const isLoggedIn = session?.user ? true : false;
    return (
        <div className='bg-blue-800 relative'>
            <div className='flex text-white items-center justify-between p-4 gap-20'>
                {/* logo section */}
                <div className='font-bold text-2xl cursor-pointer flex items-center gap-1'>
                    <BookOpenIcon className='w-7 h-7' />
                    <Link href="/">Hotels.com</Link>
                </div>
                <NavLink isLoggedIn={isLoggedIn} />
            </div>
        </div>
    );
}

export default Navbar;