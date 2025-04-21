import React from "react";
import CategoriesFilters from "./categories-filter";

const ProductsFilterSidebar = () => {
  return (
    <div>
      <span className="text-lg font-semibold p-2"> Categories</span>
      <CategoriesFilters />
    </div>
  );
};

export default ProductsFilterSidebar;
