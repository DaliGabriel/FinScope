"use client";

import { useState } from "react";
import MobileToggle from "./MobileToggle";
import DesktopSidebar from "./DesktopSidebar";
import MobileDropdown from "./MobileDropdown";
import { SidebarProps } from "../../../types/Layout";

export const Sidebar = ({ navItems }: SidebarProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <MobileToggle title="FinScope" open={open} setOpen={setOpen} />
      <DesktopSidebar navItems={navItems} />
      {open && <MobileDropdown navItems={navItems} setOpen={setOpen} />}
    </>
  );
};
