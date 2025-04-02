import ProductAdd from "@/components/app/(admin)/product/add";
import PageWrapper from "@/components/shared/page-wrapper";
import { PageBreadCrumb } from "@/components/shared/page-wrapper/breadcrumb";
import PageTitle from "@/components/shared/page-wrapper/page-title";
import { API_BASE_URL } from "@/lib/app";
import React, { Suspense } from "react";

const EditProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const response = await fetch(`${API_BASE_URL}/api/v1/product/${id}`);
  const data = await response.json();
  const product = data.data;

  return (
    <Suspense fallback={<p>Loading</p>}>
      <PageWrapper className="flex flex-col gap-1.5">
        <PageBreadCrumb
          items={[
            { title: "Dashboard", href: "/admin/dashboard" },
            { title: "Edit Product" },
          ]}
        />
        <PageTitle title="Edit Product" />
        <ProductAdd editMode defaultFormData={product} />;
      </PageWrapper>
    </Suspense>
  );
};

export default EditProductPage;
