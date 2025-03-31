import React from "react";
import Cookies from "js-cookie";

interface LogOutButtonProps {
  email: string | undefined;
}

const LogOutButton = ({ email }: LogOutButtonProps) => {
  const handleLogout = () => {
    // Remove the token cookie
    Cookies.remove("token", { path: "/" });
    // Redirect to login page
    window.location.href = "/login";
  };

  return (
    <>
      <span className="text-sm text-gray-500 mr-4">{email}</span>
      <button
        onClick={handleLogout}
        className="text-sm text-red-600 hover:text-red-700"
      >
        Logout
      </button>
    </>
  );
};

export default LogOutButton;
