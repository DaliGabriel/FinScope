"use client";

import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import Navbar from "../components/navigation/Navbar";
import { DashboardLayoutProps } from "../types/Dashboard";

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
