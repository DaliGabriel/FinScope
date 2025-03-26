"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/Form/Button";
import { Footer } from "../components/Form/Footer";
import { Form } from "../components/Form/Form";
import { Input } from "../components/Form/Input";
import { useMutation } from "@apollo/client";
import { RegisterResponse } from "../types/auth";
import { REGISTER } from "../graphql/auth/mutations";

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<FormErrors>({});
  const [register, { loading }] = useMutation<{ register: RegisterResponse }>(
    REGISTER
  );

  const validateForm = (data: Record<string, string>): boolean => {
    const newErrors: FormErrors = {};

    // Confirm password validation
    if (data.password !== data.confirmPassword) {
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
      const response = await register({
        variables: {
          email: data.email,
          name: data.name,
          password: data.password,
        },
      });

      if (response.data?.register) {
        router.push("/login?registered=true");
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
