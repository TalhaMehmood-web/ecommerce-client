"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import ProductAdd from "../add";
import PageLoader from "@/components/shared/loading/page-loader";
import ErrorWrapper from "@/components/shared/errors";

const fetchProductById = async (id: string) => {
  const response = await axiosInstance.get(`/product/${id}`);
  return response.data;
};

const EditProductView = ({ id }: { id: string }) => {
  const {
    data: productData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <ErrorWrapper message="Error loading product data." />;
  }

  return <ProductAdd id={id} defaultFormData={productData?.data} editMode />;
};

export default EditProductView;
