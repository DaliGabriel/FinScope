import Link from "next/link";
import React from "react";
import LogOutButton from "./LogOutButton";
import { MobileMenuProps } from "@/app/types/navigation";

const MobileMenu = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  userEmail,
  pathname,
  navigation,
}: MobileMenuProps) => {
  return (
    <>
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${
                pathname === item.href
                  ? "bg-green-50 border-green-500 text-green-700"
                  : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-4">
              <LogOutButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
