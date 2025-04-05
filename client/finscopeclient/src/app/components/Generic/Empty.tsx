import React from "react";
import { EmptyProps } from "../../types/empty";

const Empty = ({ message }: EmptyProps  ) => {
  return (
    <div className="flex justify-center items-center h-full">
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default Empty;
