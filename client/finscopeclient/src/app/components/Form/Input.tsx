"use client";

import { InputProps } from "@/app/types/form";

export function Input({
  name,
  type,
  label,
  placeholder,
  required,
}: InputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 ease-in-out text-gray-900 text-base placeholder:text-gray-400"
      />
    </div>
  );
}
