import React from "react";

const ErrorWrapper = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-1 w-full justify-center items-center text-lg font-semibold text-red-500">
      {message}
    </div>
  );
};

export default ErrorWrapper;
