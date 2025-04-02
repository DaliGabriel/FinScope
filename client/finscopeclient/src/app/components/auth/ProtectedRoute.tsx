"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { ProtectedRouteProps } from "../../types/auth";
import Loading from "../generic/Loading";

export function ProtectedRoute({ children, redirectTo }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth({
    requireAuth: true,
    redirectTo,
  });

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white bg-opacity-90">
        <Loading />
      </div>
    );
  }

  // Only render children if authenticated
  return isAuthenticated ? <>{children}</> : null;
}
