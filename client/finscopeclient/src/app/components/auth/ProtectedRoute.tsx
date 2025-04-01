"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { ProtectedRouteProps } from "../../types/auth";
import Loading from "../Generic/Loading";

export function ProtectedRoute({ children, redirectTo }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth({
    requireAuth: true,
    redirectTo,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Only render children if authenticated
  return isAuthenticated ? <>{children}</> : null;
}
