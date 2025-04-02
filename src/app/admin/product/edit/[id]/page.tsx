import ProductAdd from "@/components/app/(admin)/product/add";
import EditProductView from "@/components/app/(admin)/product/edit";
import PageLoader from "@/components/shared/loading/page-loader";
import PageWrapper from "@/components/shared/page-wrapper";
import { PageBreadCrumb } from "@/components/shared/page-wrapper/breadcrumb";
import PageTitle from "@/components/shared/page-wrapper/page-title";
import { API_BASE_URL } from "@/lib/app";
import React, { Suspense } from "react";

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <Suspense fallback={<PageLoader className="min-h-screen " />}>
      <PageWrapper className="flex flex-col gap-1.5">
        <PageBreadCrumb
          items={[
            { title: "Dashboard", href: "/admin/dashboard" },
            { title: "Edit Product" },
          ]}
        />
        <PageTitle title="Edit Product" />
        <EditProductView id={id} />
      </PageWrapper>
    </Suspense>
  );
};

export default EditProductPage;
