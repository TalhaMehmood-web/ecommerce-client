"use client";
import React, { useState } from "react";
// import { ProductFormValues } from "@/lib/form-schema";
// import { ProductAddStepper } from "@/components/product/ProductAddStepper";
// import { BasicInfoForm } from "@/components/product/BasicInfoForm";
// import { PricingForm } from "@/components/product/PricingForm";
// import { InventoryForm } from "@/components/product/InventoryForm";
// import { ShippingForm } from "@/components/product/ShippingForm";
// import { ImagesForm } from "@/components/product/ImagesForm";
// import { VariationsForm } from "@/components/product/VariationsForm";
// import { SeoForm } from "@/components/product/SeoForm";
// import { OtherInfoForm } from "@/components/product/OtherInfoForm";
// import { ReviewForm } from "@/components/product/ReviewForm";
// import { SuccessScreen } from "@/components/product/SuccessScreen";
import { ProductFormValues } from "@/lib/schema/add-product";
import { BasicInfoForm } from "./basic-info-form";
import { useRouter } from "next/navigation";
import { AddProductStepper } from "./add-product-stepper";
import { PricingForm } from "./pricing-form";
import { InventoryForm } from "./inventory-form";
import { ShippingForm } from "./shipping-form";
import { VariationsForm } from "./variation-form";
import { ImagesForm } from "./images-form";
import { SeoForm } from "./seo-from";
import { OtherInfoForm } from "./other-info-from";
import { ReviewForm } from "./review";
import { SuccessScreen } from "./success-screen";
const steps = [
  "Basic Info",
  "Pricing",
  "Inventory",
  "Shipping",
  "Images",
  "Variations",
  "SEO",
  "Other Info",
  "Review",
];

const ProductAdd = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState<ProductFormValues>({
    basicInfo: {
      productName: "",
      productDescription: "",
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
      stockStatus: "In Stock",
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
  });

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleStepClick = (step: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentStep(step);
  };

  const handleBasicInfoSubmit = (values: any) => {
    setFormData((prev) => ({ ...prev, basicInfo: values }));
    handleNext();
  };

  const handlePricingSubmit = (values: any) => {
    setFormData((prev) => ({ ...prev, pricing: values }));
    handleNext();
  };

  const handleInventorySubmit = (values: any) => {
    setFormData((prev) => ({ ...prev, inventory: values }));
    handleNext();
  };

  const handleShippingSubmit = (values: any) => {
    setFormData((prev) => ({ ...prev, shipping: values }));
    handleNext();
  };

  const handleImagesSubmit = (values: any) => {
    setFormData((prev) => ({ ...prev, images: values }));
    handleNext();
  };

  const handleVariationsSubmit = (values: any) => {
    setFormData((prev) => ({ ...prev, variations: values }));
    handleNext();
  };

  const handleSeoSubmit = (values: any) => {
    setFormData((prev) => ({ ...prev, seo: values }));
    handleNext();
  };

  const handleOtherInfoSubmit = (values: any) => {
    setFormData((prev) => ({ ...prev, otherInfo: values }));
    handleNext();
  };

  const handleFinalSubmit = () => {
    console.log("Final product data:", formData);
    setIsCompleted(true);
  };

  const handleAddAnother = () => {
    setCurrentStep(0);
    setIsCompleted(false);
    setFormData({
      basicInfo: {
        productName: "",
        productDescription: "",
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
        stockStatus: "In Stock",
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
    });
  };

  const handleViewProducts = () => {
    // In a real app, router to products list
    router.push("/");
  };

  if (isCompleted) {
    return (
      <SuccessScreen
        productData={formData}
        onAddAnother={handleAddAnother}
        onViewProducts={handleViewProducts}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
          <p className="text-gray-600 mt-2">
            Fill in the details to add a new product to your inventory
          </p>
        </div>

        <AddProductStepper
          steps={steps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />

        <div className="mt-8">
          {currentStep === 0 && (
            <BasicInfoForm
              defaultValues={formData.basicInfo}
              onSubmit={handleBasicInfoSubmit}
            />
          )}
          {currentStep === 1 && (
            <PricingForm
              defaultValues={formData.pricing}
              onSubmit={handlePricingSubmit}
              onBack={handleBack}
            />
          )}
          {currentStep === 2 && (
            <InventoryForm
              defaultValues={formData.inventory}
              onSubmit={handleInventorySubmit}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <ShippingForm
              defaultValues={formData.shipping}
              onSubmit={handleShippingSubmit}
              onBack={handleBack}
            />
          )}
          {currentStep === 4 && (
            <ImagesForm
              defaultValues={formData.images}
              onSubmit={handleImagesSubmit}
              onBack={handleBack}
            />
          )}
          {currentStep === 5 && (
            <VariationsForm
              defaultValues={formData.variations}
              onSubmit={handleVariationsSubmit}
              onBack={handleBack}
            />
          )}

          {currentStep === 6 && (
            <SeoForm
              defaultValues={formData.seo}
              onSubmit={handleSeoSubmit}
              onBack={handleBack}
            />
          )}
          {currentStep === 7 && (
            <OtherInfoForm
              defaultValues={formData.otherInfo}
              onSubmit={handleOtherInfoSubmit}
              onBack={handleBack}
            />
          )}
          {currentStep === 8 && (
            <ReviewForm
              values={formData}
              onSubmit={handleFinalSubmit}
              onBack={handleBack}
              onEdit={handleStepClick}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductAdd;
