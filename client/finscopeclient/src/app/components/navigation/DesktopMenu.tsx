import React from "react";
import Link from "next/link";
import { DesktopMenuProps } from "@/app/types/navigation";

const DesktopMenu = ({ pathname, navigation }: DesktopMenuProps) => {
  return (
    <>
      <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`${
              pathname === item.href
                ? "border-green-500 text-gray-900"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default DesktopMenu;
