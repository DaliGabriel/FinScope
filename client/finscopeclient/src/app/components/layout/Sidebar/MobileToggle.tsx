import { HiMenu, HiX } from "react-icons/hi";
import { MobileToggleProps } from "../../../types/Layout";
import ToggleDarkMode from "../ToggleDarkMode/ToggleDarkMode";

const MobileToggle = ({ setOpen, open, title }: MobileToggleProps) => {
  return (
    <>
      <div className="md:hidden px-4 py-3 shadow flex items-center gap-4">
        <span className="font-semibold text-lg truncate flex-1">{title}</span>
        <div className="flex-1 flex justify-center">
          <ToggleDarkMode />
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl flex-1 flex justify-end"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>
    </>
  );
};

export default MobileToggle;
