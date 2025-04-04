import BillingView from "@/components/app/(verify)/pages/billing";
import PageWrapper from "@/components/shared/page-wrapper";
import PageTitle from "@/components/shared/page-wrapper/page-title";

import React from "react";

const BillingPage = () => {
  return (
    <PageWrapper className="flex flex-col gap-4">
      <PageTitle title="Subscription Management" />
      <BillingView />
    </PageWrapper>
  );
};

export default BillingPage;
