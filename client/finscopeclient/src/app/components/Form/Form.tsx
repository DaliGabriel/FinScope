"use client";

import { FormEvent } from "react";
import { FormContext } from "@/app/hooks/useFormContext";
import { FormProps } from "@/app/types/form";

export function Form({ children, onSubmit }: FormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
    onSubmit(data);
  };

  return (
    <FormContext.Provider value={{ onSubmit: handleSubmit }}>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5">
            {children}
          </form>
        </div>
      </div>
    </FormContext.Provider>
  );
}
