import ListProductView from "@/components/app/(admin)/product/list";
import PageWrapper from "@/components/shared/page-wrapper";
import { PageBreadCrumb } from "@/components/shared/page-wrapper/breadcrumb";
import PageTitle from "@/components/shared/page-wrapper/page-title";
import React from "react";

const ListProductPage = () => {
  return (
    <PageWrapper className="flex flex-col gap-4">
      <PageBreadCrumb
        items={[
          { title: "Dashboard", href: "/admin/dashboard" },
          { title: "Add Product" },
        ]}
      />
      <PageTitle title="Products List" />
      <ListProductView />
    </PageWrapper>
  );
};

export default ListProductPage;
