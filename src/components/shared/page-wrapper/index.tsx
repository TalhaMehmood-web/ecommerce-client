import React, { ReactNode } from "react";
import clsx from "clsx";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        " p-6 mx[1px] my-2 flex-1 h-full bg-gray-50 rounded-lg shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
