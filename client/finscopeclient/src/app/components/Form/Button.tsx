"use client";

import { ButtonProps } from "@/app/types/form";

export function Button({ children }: ButtonProps) {
  return (
    <button
      type="submit"
      className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      {children}
    </button>
  );
}
