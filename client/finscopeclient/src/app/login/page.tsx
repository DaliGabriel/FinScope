"use client";

import { useMutation } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Form } from "../components/Form/Form";
import { Input } from "../components/Form/Input";
import { Button } from "../components/Form/Button";
import { FormLink } from "../components/Form/Link";
import { Footer } from "../components/Form/Footer";
import { LOGIN } from "../graphql/auth/mutations";
import { LoginResponse, LoginVariables } from "../types/auth";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Cookies from "js-cookie";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, isLoading } = useAuth();
  const [login, { loading }] = useMutation<
    { login: LoginResponse },
    LoginVariables
  >(LOGIN);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard/transactions");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      setError(null);
      const response = await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      if (response.data?.login) {
        if (response.data.login.__typename === "AuthError") {
          setError(response.data.login.message);
        } else if (response.data.login.__typename === "LoginSuccess") {
          // Store token in an HTTP-only cookie
          Cookies.set("token", response.data.login.authPayload.accessToken, {
            expires: 7, // 7 days
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });

          // Redirect to the original URL or dashboard
          const redirectTo =
            searchParams.get("redirect") || "/dashboard/transactions";
          router.push(redirectTo);
        }
      }
    } catch (err: any) {
      if (err.networkError) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-gray-600">Checking authentication...</span>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}
      <Input
        name="email"
        type="email"
        label="Email"
        required
        placeholder="Enter your email"
      />
      <Input
        name="password"
        type="password"
        label="Password"
        required
        placeholder="Enter your password"
      />
      <FormLink text="Forgot password?" href="/forgot-password" />
      <Button>{loading ? "Logging in..." : "Log in"}</Button>
      <Footer
        text="Don't have an account?"
        linkText="Sign up"
        linkHref="/register"
      />
    </Form>
  );
}
