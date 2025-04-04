import { Dispatch, SetStateAction } from "react";
import { ValidationError } from "../../types/form";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateField = (
  data: Record<string, string>
): ValidationError | null => {
  const { name, email, password, confirmPassword } = data;

  switch (true) {
    case !name:
      return { type: "name", message: "Name is required" };

    case !email:
      return { type: "email", message: "Email is required" };

    case !emailRegex.test(email):
      return {
        type: "emailFormat",
        message: "Please enter a valid email address",
      };

    case !password:
      return { type: "password", message: "Password is required" };

    case password.length < 8:
      return {
        type: "password",
        message: "Password must be at least 8 characters",
      };

    case !confirmPassword:
      return {
        type: "confirmPassword",
        message: "Please confirm your password",
      };

    case password !== confirmPassword:
      return { type: "passwordMatch", message: "Passwords do not match" };

    default:
      return null;
  }
};

export const validateRegisterForm = (
  data: Record<string, string>,
  setError: Dispatch<SetStateAction<string | null>>
): boolean => {
  const error = validateField(data);

  if (error) {
    setError(error.message);
    return false;
  }

  return true;
};
