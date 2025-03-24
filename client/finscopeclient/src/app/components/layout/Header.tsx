"use client";
import { HeaderProps } from "../../types/Layout";
import ToggleDarkMode from "./ToggleDarkMode/ToggleDarkMode";

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="hidden md:flex justify-between items-center  px-6 py-4 shadow-md">
      <h1 className="text-2xl font-bold">{title}</h1>
      <ToggleDarkMode />
    </header>
  );
};
