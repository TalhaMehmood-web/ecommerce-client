import ProductAdd from "@/components/app/(admin)/new-product";
import PageWrapper from "@/components/shared/page-wrapper";
import { PageBreadCrumb } from "@/components/shared/page-wrapper/breadcrumb";
import PageTitle from "@/components/shared/page-wrapper/page-title";
import React, { Suspense } from "react";

const AddProductPage = () => {
  return (
    <Suspense fallback={<p>Loading</p>}>
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
    </Suspense>
  );
};

export default AddProductPage;
