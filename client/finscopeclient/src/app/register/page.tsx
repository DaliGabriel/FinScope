"use client";

import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../components/form/Button";
import { Footer } from "../components/form/Footer";
import { Form } from "../components/form/Form";
import { Input } from "../components/form/Input";
import ErrorMessage from "../components/generic/ErrorMessage";
import Loading from "../components/generic/Loading";
import { REGISTER } from "../graphql/auth/mutations";
import { useAuth } from "../hooks/useAuth";
import { RegisterResponse, RegisterVariables } from "../types/auth";
import { validateRegisterForm } from "../utils/validations/validateRegisterForm";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const { isLoading } = useAuth({ redirectTo: "" });
  const [register, { loading }] = useMutation<
    { register: RegisterResponse },
    RegisterVariables
  >(REGISTER);

  const handleSubmit = async (data: Record<string, string>) => {
    if (!validateRegisterForm(data, setError)) {
      return;
    }

    try {
      setError(null);
      const response = await register({
        variables: {
          email: data.email,
          name: data.name,
          password: data.password,
        },
      });

      console.log(response.data?.register);

      if (response.data?.register) {
        if (response.data.register.__typename === "AuthError") {
          setError(response.data.register.message || "An error occurred");
        } else if (response.data.register.__typename === "RegisterSuccess") {
          router.push("/login?registered=true");
        }
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred during registration"
      );
    }
  };

  if (isLoading) return <Loading message="Checking authentication..." />;

  return (
    <Form onSubmit={handleSubmit}>
      {error && <ErrorMessage message={error} />}

      <Input
        name="name"
        type="text"
        label="Full Name"
        placeholder="Enter your full name"
      />

      <Input
        name="email"
        type="text"
        label="Email"
        placeholder="Enter your email"
      />

      <Input
        name="password"
        type="password"
        label="Password"
        placeholder="Choose a strong password"
      />

      <Input
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Re-enter your password"
      />

      <Button>{loading ? "Creating account..." : "Sign up"}</Button>

      <Footer
        text="Already have an account?"
        linkText="Log in"
        linkHref="/login"
      />
    </Form>
  );
}
