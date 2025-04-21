import ProductDetails from "@/components/app/(admin)/product/preview";
import PageLoader from "@/components/shared/loading/page-loader";
import PageWrapper from "@/components/shared/page-wrapper";
import { PageBreadCrumb } from "@/components/shared/page-wrapper/breadcrumb";
import React, { Suspense } from "react";

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <Suspense fallback={<PageLoader className="min-h-screen" />}>
      <PageWrapper className="flex flex-col gap-1.5">
        <PageBreadCrumb
          items={[
            { title: "Home", href: "/home" },
            { title: "Products", href: "/products" },
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
