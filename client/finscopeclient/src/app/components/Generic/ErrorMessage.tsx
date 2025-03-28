import React from "react";
import { ErrorMessageProps } from "../../types/error";

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <>
      <div className="p-4 text-red-700 bg-red-100 rounded-lg">
        Error loading transactions: {error.message}
      </div>
    </>
  );
};

export default ErrorMessage;
