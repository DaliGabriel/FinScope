import React, { useState } from "react";
import { navigation } from "../../lib/navigation";
import { usePathname } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";
import LogOutButton from "./LogOutButton";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-green-600">FinScope</h1>
              </div>
              {/* Desktop Navigation */}
              <DesktopMenu pathname={pathname} navigation={navigation} />
            </div>

            {/* Desktop Logout */}
            <div className="hidden sm:flex sm:items-center">
              <LogOutButton />
            </div>

            <MobileMenuButton
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </div>
        </div>

        {/* Mobile menu */}
        <MobileMenu
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          userEmail={user?.email}
          pathname={pathname}
          navigation={navigation}
        />
      </nav>
    </>
  );
};

export default Navbar;
