"use client";

import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState } from 'react';
import LogoutButton from '@/components/logout-button';
import { Button } from "@/components/ui/button";

interface NavLinkProps {
    isLoggedIn: boolean
}
const NavLink = ({ isLoggedIn }: NavLinkProps) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <div onClick={() => setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                {
                    open ? <XMarkIcon /> : <Bars3BottomRightIcon />
                }
            </div>
            {isLoggedIn ? (<ul className={`absolute md:relative flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-5 bg-blue-800 top-12 left-0 md:top-0 p-5 md:p-0 w-full md:w-auto transition-all duration-500 ease-in ${open ? ("flex") : (" hidden md:flex")}`}>
                <li>
                    <Link href="/hotel/my-bookings" className="font-bold text-white">My Bookings</Link>
                </li>
                <li>
                    <Link href="/hotel" className="font-bold text-white">My Hotels</Link>
                </li>
                <li>
                    <LogoutButton />
                </li>
            </ul>
            ) : (

                <Button 
                    asChild 
                    size="lg"
                    className="bg-blue-800 text-white font-semibold text-lg rounded-lg hover:bg-blue-700">
                    <Link href="/login">
                        Sign In
                    </Link>
                </Button>
            )}
        </div>
    );
}

export default NavLink;