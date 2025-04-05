"use client";

import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../components/form/Button";
import { Footer } from "../components/form/Footer";
import { Form } from "../components/form/Form";
import { Input } from "../components/form/Input";
import { FormLink } from "../components/form/Link";
import ErrorMessage from "../components/generic/ErrorMessage";
import Loading from "../components/generic/Loading";
import { LOGIN } from "../graphql/auth/mutations";
import { useAuth } from "../hooks/useAuth";
import { LoginMutationParams, LoginResponse } from "../types/auth";
import SuccessMessage from "../components/generic/SuccessMessage";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { isLoading } = useAuth();

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccessMessage("Registration successful! Please log in.");
    }
  }, [searchParams]);

  const [login, { loading }] = useMutation<
    { login: LoginResponse },
    LoginMutationParams
  >(LOGIN);

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

  if (isLoading) return <Loading message="Checking authentication..." />;

  return (
    <Form onSubmit={handleSubmit}>
      {error && <ErrorMessage message={error} />}
      {successMessage && <SuccessMessage message={successMessage} />}
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
