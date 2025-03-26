import { ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface RegisterResponse {
  user: User;
}

export interface LoginVariables {
  email: string;
  password: string;
}

export interface RegisterVariables extends LoginVariables {}

export interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

// hooks
export interface UseAuthOptions {
  required?: boolean;
  redirectTo?: string;
  onError?: () => void;
}
