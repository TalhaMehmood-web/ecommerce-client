"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import ProductAdd from "../add";
import PageLoader from "@/components/shared/loading/page-loader";
import ErrorWrapper from "@/components/shared/errors";
import { useFetchProductById } from "@/hooks/product/get-by-id";

const EditProductView = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useFetchProductById(id);
  const product = data?.data;
  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <ErrorWrapper message="Error loading product data." />;
  }

  return <ProductAdd id={id} defaultFormData={product} editMode />;
};

export default EditProductView;
