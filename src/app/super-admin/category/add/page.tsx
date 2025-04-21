import AddCategoryView from "@/components/app/(super-admin)/category/add";
import PageWrapper from "@/components/shared/page-wrapper";
import { PageBreadCrumb } from "@/components/shared/page-wrapper/breadcrumb";
import PageTitle from "@/components/shared/page-wrapper/page-title";
import React from "react";

const page = () => {
  return (
    <PageWrapper className="flex flex-col gap-1.5">
      <PageBreadCrumb
        items={[
          { title: "Dashboard", href: "/super-admin/dashboard" },
          { title: "Add Category" },
        ]}
      />
      <PageTitle title="Category Management" />
      <AddCategoryView />
    </PageWrapper>
  );
};

export default page;
