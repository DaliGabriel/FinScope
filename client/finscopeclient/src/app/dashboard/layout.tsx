"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { useAuth } from "../hooks/useAuth";
import { DashboardLayoutProps } from "../types/Dashboard";
import { navigation } from "../lib/navigation";
import Navbar from "../components/navigation/Navbar";

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
