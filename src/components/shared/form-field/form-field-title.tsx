import React from "react";
import clsx from "clsx";

interface FormFieldTitleProps {
  children: React.ReactNode;
  className?: string;
}

const FormFieldTitle: React.FC<FormFieldTitleProps> = ({
  children,
  className,
}) => {
  return (
    <h3 className={clsx("text-lg font-semibold text-gray-700", className)}>
      {children}
    </h3>
  );
};

export default FormFieldTitle;
