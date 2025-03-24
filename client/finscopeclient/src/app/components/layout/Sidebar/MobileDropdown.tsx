import Link from "next/link";
import { MobileDropdownProps } from "../../../types/Layout";

const MobileDropdown = ({ navItems, setOpen }: MobileDropdownProps) => {
  return (
    <>
      <div className="md:hidden  p-4 shadow-md">
        <nav className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className=" hover:text-blue-600 font-medium"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default MobileDropdown;
