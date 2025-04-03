import { LoadingProps } from "@/app/types/loading";
import React from "react";

const Loading = ({ message = "Loading..." }: LoadingProps) => {
  return (
    <>
      <div
        className="min-h-screen flex items-center
    fy-cente
  -gray-50"
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">{message}</h2>
        </div>
      </div>
    </>
  );
};

export default Loading;
