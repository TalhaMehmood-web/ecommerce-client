"use client";
import React from "react";
import { API_ENDPOINTS } from "@/utils/endpoints";
import axiosInstance from "@/config/axios";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/shared/product-card";
import PageLoader from "@/components/shared/loading/page-loader";

const ProductsList = () => {
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(
        API_ENDPOINTS.PRODUCT.GET_PRODUCTS_FOR_CLIENT
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["get-products-for-client"],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
    retry: false,
  });
  const products = data?.data || [];
  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <div className="flex flex-1 p-2 ">
      <div className=" grid grid-cols-3 gap-4 ">
        {products?.map((product: any) => (
          <ProductCard
            key={product._id}
            id={product._id}
            name={product.productName}
            image={product.productImage}
            basePrice={product.basePrice}
            discountedPrice={product.discountedPrice}
            rating={2}
            colorVarinats={product.colorVariants}
          />
        ))}
        {products?.map((product: any) => (
          <ProductCard
            key={product._id}
            id={product._id}
            name={product.productName}
            image={product.productImage}
            basePrice={product.basePrice}
            discountedPrice={product.discountedPrice}
            rating={2}
            colorVarinats={product.colorVariants}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
