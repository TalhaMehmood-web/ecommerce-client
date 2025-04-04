import RegitserCompanyView from "@/components/app/(verify)/pages/company";
import PageWrapper from "@/components/shared/page-wrapper";
import PageTitle from "@/components/shared/page-wrapper/page-title";

import React from "react";

const CompanyRegistrationPage = () => {
  return (
    <PageWrapper className="flex flex-col gap-4">
      <PageTitle title="Compnay Registration" />
      <RegitserCompanyView />;
    </PageWrapper>
  );
};

export default CompanyRegistrationPage;
