"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Form } from "../components/Form/Form";
import { Input } from "../components/Form/Input";
import { Button } from "../components/Form/Button";
import { FormLink } from "../components/Form/Link";
import { Footer } from "../components/Form/Footer";
import { LOGIN } from "../graphql/auth/mutations";
import { LoginResponse } from "../types/auth";

export default function LoginPage() {
  const router = useRouter();
  const [login, { loading, error }] = useMutation<{ login: LoginResponse }>(
    LOGIN
  );

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      const response = await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      if (response.data?.login) {
        // Store the token in localStorage or a secure cookie
        localStorage.setItem("token", response.data.login.accessToken);
        // Redirect to dashboard
        router.push("/dashboard/transactions");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error.message}
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
