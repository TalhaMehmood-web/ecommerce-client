import PaymentSuccessView from "@/components/app/(verify)/pages/billing/success";
import PageLoader from "@/components/shared/loading/page-loader";
import React, { Suspense } from "react";

const success = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <PaymentSuccessView />
    </Suspense>
  );
};

export default success;
