"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { User } from "@/app/types/auth";
import { UseAuthOptions } from "../types/auth";
import { GET_CURRENT_USER } from "../graphql/auth/mutations";

export function useAuth(options: UseAuthOptions = {}) {
  const { required = false, redirectTo = "/login", onError } = options;
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const { data, loading, error } = useQuery<{ currentUser: User | null }>(
    GET_CURRENT_USER,
    {
      fetchPolicy: "network-only", // Don't use cache for auth checks
    }
  );

  useEffect(() => {
    if (!loading) {
      const authenticated = !!data?.currentUser;
      setIsAuthenticated(authenticated);

      if (required && !authenticated) {
        // User needs to be authenticated but isn't
        router.push(redirectTo);
        onError?.();
      }
    }
  }, [data, loading, required, redirectTo, router, onError]);

  return {
    user: data?.currentUser || null,
    isAuthenticated,
    isLoading: loading,
    error,
  };
}
