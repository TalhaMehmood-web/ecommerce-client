"use client";

import PageLoader from "@/components/shared/loading/page-loader";
import axiosInstance from "@/config/axios";
import { API_ENDPOINTS } from "@/utils/endpoints";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import PaymentStatusPage from "../../../components/payment-status";
import SuccessAnimation from "../../../components/payment-success-animation";

const PaymentSuccessView = () => {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");

  const { isLoading } = useQuery({
    queryKey: ["verify-payment", sessionId],
    queryFn: () =>
      axiosInstance.get(
        `${API_ENDPOINTS.SUBSCRIPTION.VERIFY_PAYMENT_BY_SESSION_ID}/${sessionId}`
      ),
    retry: 0,
    refetchOnWindowFocus: false,
    enabled: !!sessionId,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <PaymentStatusPage
        status="success"
        title="Payment Successful!"
        message="Thank you for your payment. Your transaction was successful and a confirmation has been sent to your email."
        primaryActionLabel="Go To Dashboard"
        primaryActionLink="/admin/dashboard"
      >
        <SuccessAnimation />
      </PaymentStatusPage>
    </>
  );
};

export default PaymentSuccessView;
