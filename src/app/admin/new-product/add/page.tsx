import ProductAdd from "@/components/app/(admin)/new-product";
import React, { Suspense } from "react";

const AddNewProduct = () => {
  return (
    <Suspense fallback={<p>loading</p>}>
      <ProductAdd />
    </Suspense>
  );
};

export default AddNewProduct;
