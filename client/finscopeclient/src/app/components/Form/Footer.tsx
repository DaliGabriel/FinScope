"use client";

import Link from "next/link";
import { FooterProps } from "@/app/types/form";

export function Footer({ text, linkText, linkHref }: FooterProps) {
  return (
    <div className="text-center text-sm text-gray-600">
      {text}{" "}
      <Link
        href={linkHref}
        className="font-medium text-green-600 hover:text-green-700 transition duration-200 ease-in-out"
      >
        {linkText}
      </Link>
    </div>
  );
}
