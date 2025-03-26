import { FormEvent, ReactNode } from "react";

export interface FormProps {
  children: ReactNode;
  onSubmit: (data: Record<string, string>) => void;
}

export interface InputProps {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export interface ButtonProps {
  children: ReactNode;
}

export interface LinkProps {
  text: string;
  href: string;
}

export interface FooterProps {
  text: string;
  linkText: string;
  linkHref: string;
}

export interface FormContextType {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
