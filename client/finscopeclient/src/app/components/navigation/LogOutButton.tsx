import React from "react";

interface LogOutButtonProps {
  email: string | undefined;
}

const LogOutButton = ({ email }: LogOutButtonProps) => {
  return (
    <>
      <span className="text-sm text-gray-500 mr-4">{email}</span>
      <button
        onClick={() => {
          // Handle logout
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
        className="text-sm text-red-600 hover:text-red-700"
      >
        Logout
      </button>
    </>
  );
};

export default LogOutButton;
