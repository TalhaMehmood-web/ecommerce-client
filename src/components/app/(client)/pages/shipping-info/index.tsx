"use client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import { ShippingInfoForm } from "./form";
import ApiLoader from "@/components/shared/loading/api-loader";

const fetchShippingInfo = async () => {
  const response = await axiosInstance.get("/shipping-info");
  return response.data;
};

const ShippingInfoView = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["shipping-info"],
    queryFn: fetchShippingInfo,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 0,
  });

  return (
    <div>
      <ApiLoader isLoading={isLoading} message="Loading Shipping Data" />
      {!isLoading && <ShippingInfoForm initialData={data} />}
    </div>
  );
};

export default ShippingInfoView;
