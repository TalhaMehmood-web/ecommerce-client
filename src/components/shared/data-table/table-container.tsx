import { ReactNode } from "react";

interface TableContainerProps {
  children: ReactNode;
}

export default function TableContainer({ children }: TableContainerProps) {
  return (
    <div className="w-full rounded-lg shadow-md bg-white overflow-hidden">
      <div className="overflow-x-auto overflow-y-hidden w-full min-w-2xl">
        {children}
      </div>
    </div>
  );
}
