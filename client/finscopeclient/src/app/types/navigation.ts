export interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isMobileMenuOpen: boolean) => void;
  userEmail?: string;
  pathname: string;
  navigation: { name: string; href: string }[];
}

export interface DesktopMenuProps {
  pathname: string;
  navigation: { name: string; href: string }[];
}

