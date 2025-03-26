"use client";

import { useAuth } from "./hooks/useAuth";

export default function Home() {
  // This will automatically redirect to /login if not authenticated
  useAuth({
    required: true,
    redirectTo: "/login",
  });

  // The page will show loading state while checking auth
  // and will redirect if not authenticated
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">
          Checking authentication...
        </h2>
      </div>
    </div>
  );
}
