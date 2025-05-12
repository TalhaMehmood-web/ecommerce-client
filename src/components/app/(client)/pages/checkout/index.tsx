"use client";
import axiosInstance from "@/config/axios";
import { useSelectedCart } from "@/context/selected-cart-context";
import { API_ENDPOINTS } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import React from "react";
const fetchShippingInfo = async () => {
  const response = await axiosInstance.get(
    API_ENDPOINTS.SHIPPING_INFO.GET_BY_LOGGED_IN_USER
  );
  return response.data;
};

const CheckoutView = () => {
  const { selectedItems } = useSelectedCart();
  const { data, error, isLoading } = useQuery({
    queryKey: ["shipping-info"],
    queryFn: fetchShippingInfo,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0,
  });
  console.log({ data });
  console.log({ selectedItems });
  return <div>CheckoutView</div>;
};

export default CheckoutView;
