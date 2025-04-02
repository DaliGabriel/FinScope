"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/form/Button";
import { Footer } from "../components/form/Footer";
import { Form } from "../components/form/Form";
import { Input } from "../components/form/Input";
import { useMutation } from "@apollo/client";
import { RegisterResponse, RegisterVariables } from "../types/auth";
import { REGISTER } from "../graphql/auth/mutations";
import { useAuth } from "../hooks/useAuth";

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});
  const { isAuthenticated, isLoading } = useAuth();
  const [register, { loading }] = useMutation<
    { register: RegisterResponse },
    RegisterVariables
  >(REGISTER);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard/transactions");
    }
  }, [isAuthenticated, isLoading, router]);

  const validateForm = (data: Record<string, string>): boolean => {
    const newErrors: FormErrors = {};

    if (!data.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (data: Record<string, string>) => {
    if (!validateForm(data)) {
      return;
    }

    try {
      setErrors({});
      const response = await register({
        variables: {
          email: data.email,
          name: data.name,
          password: data.password,
        },
      });

      if (response.data?.register) {
        if (response.data.register.__typename === "AuthError") {
          setErrors({ general: response.data.register.message });
        } else if (response.data.register.__typename === "RegisterSuccess") {
          router.push("/login?registered=true");
        }
      }
    } catch (err) {
      setErrors({
        general:
          err instanceof Error
            ? err.message
            : "An error occurred during registration",
      });
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
      <Input
        name="name"
        type="text"
        label="Full Name"
        required
        placeholder="Enter your full name"
      />

      {errors.general && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {errors.general}
        </div>
      )}
      <Input
        name="email"
        type="email"
        label="Email"
        required
        placeholder="Enter your email"
      />
      {errors.email && (
        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
      )}

      <Input
        name="password"
        type="password"
        label="Password"
        required
        placeholder="Choose a strong password"
      />
      {errors.password && (
        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
      )}

      <Input
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        required
        placeholder="Re-enter your password"
      />
      {errors.confirmPassword && (
        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
      )}

      <Button>{loading ? "Creating account..." : "Sign up"}</Button>

      <Footer
        text="Already have an account?"
        linkText="Log in"
        linkHref="/login"
      />
    </Form>
  );
}
