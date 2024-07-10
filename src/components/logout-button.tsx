"use client";

import { Button } from "@/components/ui/button";
import { handleLogout } from "@/lib/actions/auth.action";

const LogoutButton = () => {
    return (
        <Button
            onClick={() => handleLogout()}
            className="bg-blue-800 text-white font-medium text-sm hover:bg-blue-700 w-fit">
            Logout
        </Button>
    );
}

export default LogoutButton;