"use client";

import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { handleLogout } from "@/lib/actions/auth.action";

interface NavLinkProps {
    isLoggedIn: boolean
}
const NavLink = ({ isLoggedIn }: NavLinkProps) => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            {isLoggedIn ? (
                <>
                    <div onClick={() => setOpen(open => !open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                        {
                            open ? <XMarkIcon /> : <Bars3BottomRightIcon />
                        }
                    </div>

                    <ul className={`absolute md:relative flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-5 bg-blue-800 top-12 left-0 md:top-0 p-5 md:p-0 w-full md:w-auto transition-all duration-500 ease-in ${open ? ("flex") : (" hidden md:flex")}`}>
                        <li>
                            <Button
                                asChild
                                onClick={() => { open && setOpen(false) }}
                                className="bg-blue-800 text-white font-medium text-sm hover:bg-blue-700 w-fit"
                            >
                                <Link href="/hotel/my-bookings">My Bookings</Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                onClick={() => { open && setOpen(false) }}
                                className="bg-blue-800 text-white font-medium text-sm hover:bg-blue-700 w-fit"
                            >
                                <Link href="/hotel">My Hotels</Link>
                            </Button>

                        </li>
                        <li>
                            <Button
                                onClick={() => { handleLogout(); open && setOpen(false) }}
                                className="bg-blue-800 text-white font-medium text-sm hover:bg-blue-700 w-fit">
                                Logout
                            </Button>
                        </li>
                    </ul>
                </>
            ) : (

                <Button
                    asChild
                    className="bg-blue-800 text-white font-medium text-sm hover:bg-blue-700 w-fit"
                >
                    <Link href="/login">
                        Login/Register
                    </Link>
                </Button>

            )}
        </div>
    );
}

export default NavLink;