import React from "react";
import { CategoryForm } from "./form";

const AddCategoryView = () => {
  return (
    <div
      className="min-h-screen flex flex-col 
     bg-gray-50 p-4"
    >
      <div className="w-full max-w-3xl container mx-auto">
        <CategoryForm />
      </div>
    </div>
  );
};

export default AddCategoryView;
