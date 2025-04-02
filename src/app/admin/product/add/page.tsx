import ProductAdd from "@/components/app/(admin)/product/add";
import PageWrapper from "@/components/shared/page-wrapper";
import { PageBreadCrumb } from "@/components/shared/page-wrapper/breadcrumb";
import PageTitle from "@/components/shared/page-wrapper/page-title";
import { initialValue } from "@/components/shared/rich-text-editor";

import React, { Suspense } from "react";

const AddProductPage = () => {
  const defaultFormData = {
    basicInfo: {
      productName: "",
      productDescription: initialValue,
      category: "",
      subcategory: "",
      brand: "",
      sku: "",
      productTags: [],
    },
    pricing: {
      basePrice: 0,
      discountedPrice: undefined,
      discountPercentage: undefined,
      taxRate: 0,
      currency: "USD",
    },
    inventory: {
      stockQuantity: 0,
      stockStatus: "In Stock", // Use one of the allowed literal values
      minOrderQuantity: 1,
      maxOrderQuantity: 10,
    },
    shipping: {
      weight: 0,
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
      },
      shippingCost: 0,
      estimatedDelivery: "",
      returnPolicy: "",
    },
    images: {
      productImages: [],
      productVideos: [],
      altTexts: [],
    },
    variations: {
      sizeOptions: [],
      colorVariants: [],
      materialType: [],
      customizations: "",
    },
    seo: {
      metaTitle: "",
      metaDescription: "",
      slug: "",
    },
    otherInfo: {
      isFeatured: false,
      warrantyInfo: "",
      supplierInfo: "",
    },
  };
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
        <ProductAdd defaultFormData={defaultFormData} />;
      </PageWrapper>
    </Suspense>
  );
};

export default AddProductPage;
