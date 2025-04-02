import EditProductView from "@/components/app/(admin)/product/edit";
import ProductDetails from "@/components/app/(admin)/product/preview";
import PageLoader from "@/components/shared/loading/page-loader";
import PageWrapper from "@/components/shared/page-wrapper";
import { PageBreadCrumb } from "@/components/shared/page-wrapper/breadcrumb";
import PageTitle from "@/components/shared/page-wrapper/page-title";
import React, { Suspense } from "react";

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <Suspense fallback={<PageLoader />}>
      <PageWrapper className="flex flex-col gap-1.5">
        <PageBreadCrumb
          items={[
            { title: "Dashboard", href: "/admin/dashboard" },
            { title: "Product Details" },
          ]}
        />
        {/* <PageTitle title="Product Details" /> */}
        <ProductDetails id={id} />
      </PageWrapper>
    </Suspense>
  );
};

export default EditProductPage;
