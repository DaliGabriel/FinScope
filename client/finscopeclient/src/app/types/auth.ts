import { ReactNode } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
}

export interface AuthError {
  __typename: "AuthError";
  code: string;
  message: string;
}

export interface RegisterSuccess {
  __typename: "RegisterSuccess";
  user: User;
}

export type RegisterResponse = RegisterSuccess | AuthError;

export interface RegisterVariables {
  email: string;
  password: string;
  name: string;
}

export interface LoginVariables {
  email: string;
  password: string;
}

export interface LoginSuccess {
  __typename: "LoginSuccess";
  authPayload: {
    accessToken: string;
    user: User;
  };
}

export type LoginResponse = LoginSuccess | AuthError;

export interface UseAuthOptions {
  requireAuth?: boolean;
  redirectTo?: string;
  onError?: (error: Error) => void;
}

export interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}
