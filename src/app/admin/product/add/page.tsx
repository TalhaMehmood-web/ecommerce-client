import AddProductView from "@/components/app/(admin)/product/add";
import PageWrapper from "@/components/shared/page-wrapper";
import { PageBreadCrumb } from "@/components/shared/page-wrapper/breadcrumb";
import PageTitle from "@/components/shared/page-wrapper/page-title";
import React from "react";

const AddProductPage = () => {
  return (
    <PageWrapper className="flex flex-col gap-1.5">
      <PageTitle title="Add Product" />
      <PageBreadCrumb
        items={[
          { title: "Dashboard", href: "/admin/dashboard" },
          { title: "Add Product" },
        ]}
      />
      <AddProductView />
    </PageWrapper>
  );
};

export default AddProductPage;
