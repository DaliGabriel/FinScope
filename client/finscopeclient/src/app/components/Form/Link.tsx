"use client";

import Link from "next/link";
import { LinkProps } from "@/app/types/form";

export function FormLink({ text, href }: LinkProps) {
  return (
    <div className="text-right">
      <Link
        href={href}
        className="text-sm text-green-600 hover:text-green-700 transition duration-200 ease-in-out"
      >
        {text}
      </Link>
    </div>
  );
}
