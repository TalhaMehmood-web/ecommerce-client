import ProductAdd from "@/components/app/(admin)/new-product";
import AddProductView from "@/components/app/(admin)/product/add";
import PageWrapper from "@/components/shared/page-wrapper";
import { PageBreadCrumb } from "@/components/shared/page-wrapper/breadcrumb";
import PageTitle from "@/components/shared/page-wrapper/page-title";
import React from "react";

const AddProductPage = () => {
  return (
    <PageWrapper className="flex flex-col gap-1.5">
      <PageBreadCrumb
        items={[
          { title: "Dashboard", href: "/admin/dashboard" },
          { title: "Add Product" },
        ]}
      />
      <PageTitle title="Add Product" />
      <ProductAdd />;
    </PageWrapper>
  );
};

export default AddProductPage;
