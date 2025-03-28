import React from "react";
import clsx from "clsx";

interface FormFieldWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx("flex flex-col  gap-2", className)}>{children}</div>
  );
};

export default FormFieldWrapper;
