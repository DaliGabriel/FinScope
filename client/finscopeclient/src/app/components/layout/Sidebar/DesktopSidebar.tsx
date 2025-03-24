import Link from "next/link";
import React from "react";
import { DesktopSideBarProps } from "../../../types/Layout";

const DesktopSidebar = ({ navItems }: DesktopSideBarProps) => {
  return (
    <>
      <aside className="hidden md:block w-60  shadow-md px-4 py-6">
        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className=" hover:text-blue-600 font-medium"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default DesktopSidebar;
