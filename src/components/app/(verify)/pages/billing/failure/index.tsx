"use client";
import React from "react";
import PaymentStatusPage from "../../../components/payment-status";
import FailureAnimation from "../../../components/payment-failure-animation";

const PaymentFailureView = () => {
  return (
    <PaymentStatusPage
      status="failure"
      title="Payment Failed"
      message={"Failed to process your payment. Please try again."}
      primaryActionLabel="Try Again"
      primaryActionLink="/billing"
      secondaryActionLabel="Contact Support"
      secondaryActionLink="/company"
    >
      <FailureAnimation />
    </PaymentStatusPage>
  );
};

export default PaymentFailureView;
