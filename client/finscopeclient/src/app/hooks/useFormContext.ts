"use client";

import { createContext, useContext } from "react";
import { FormContextType } from "@/app/types/form";

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("Form components must be used within a Form component");
  }
  return context;
}
