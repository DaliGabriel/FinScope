export interface DesktopSideBarProps {
  navItems: { label: string; href: string }[];
}
export interface MobileDropdownProps {
  navItems: { label: string; href: string }[];
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export interface MobileToggleProps {
  title: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export interface SidebarProps {
  navItems: { label: string; href: string }[];
}
export interface HeaderProps {
  title: string;
}
