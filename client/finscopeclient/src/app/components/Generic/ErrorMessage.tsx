import React from "react";
import { ErrorMessageProps } from "../../types/error";

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <>
      <div className="p-4 text-red-700 bg-red-100 rounded-lg">
        Error loading transactions: {message}
      </div>
    </>
  );
};

export default ErrorMessage;
