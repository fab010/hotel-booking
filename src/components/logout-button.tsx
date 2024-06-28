"use client";

import { Button } from "@/components/ui/button";
import { handleLogout } from "@/lib/actions/auth.action";

const LogoutButton = () => {
    return (
        <Button
            type="submit"
            size="lg"
            onClick={() => handleLogout()}
            className="bg-blue-800 text-white font-semibold text-lg rounded-lg hover:bg-blue-700">
            Logout
        </Button>
    );
}

export default LogoutButton;