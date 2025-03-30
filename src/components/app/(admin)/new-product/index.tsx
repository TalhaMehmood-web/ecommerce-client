"use client";

import React, { useEffect, useState } from "react";
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
import { initialValue } from "@/components/shared/rich-text-editor";
import { useMultiStepForm } from "@/hooks/product/add/use-multistep-form";

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

const LOCAL_STORAGE_KEY = "productFormData";

const defaultFormData: ProductFormValues = {
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
};

const ProductAdd = () => {
  const router = useRouter();
  const [isCompleted, setIsCompleted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const {
    formData,
    setFormData,
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
  } = useMultiStepForm(defaultFormData, LOCAL_STORAGE_KEY);

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    nextStep();
  };
  const markStepAsCompleted = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }
  };
  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    prevStep();
  };

  const handleStepClick = (step: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentStep(step);
  };

  const handleBasicInfoSubmit = (values: any) => {
    setFormData((prev) => ({ ...prev, basicInfo: values }));
    markStepAsCompleted(0);
    handleNext();
  };

  const handlePricingSubmit = (values: any) => {
    setFormData((prev) => ({ ...prev, pricing: values }));
    markStepAsCompleted(1);
    handleNext();
  };

  const handleInventorySubmit = (values: any) => {
    setFormData((prev) => ({ ...prev, inventory: values }));
    markStepAsCompleted(2);
    handleNext();
  };

  const handleShippingSubmit = (values: any) => {
    setFormData((prev) => ({ ...prev, shipping: values }));
    markStepAsCompleted(3);
    handleNext();
  };

  const handleImagesSubmit = (values: any) => {
    setFormData((prev) => ({ ...prev, images: values }));
    markStepAsCompleted(4);
    handleNext();
  };

  const handleVariationsSubmit = (values: any) => {
    setFormData((prev) => ({ ...prev, variations: values }));
    markStepAsCompleted(5);
    handleNext();
  };

  const handleSeoSubmit = (values: any) => {
    setFormData((prev) => ({ ...prev, seo: values }));
    markStepAsCompleted(6);
    handleNext();
  };

  const handleOtherInfoSubmit = (values: any) => {
    setFormData((prev) => ({ ...prev, otherInfo: values }));
    markStepAsCompleted(7);
    handleNext();
  };

  const handleFinalSubmit = () => {
    console.log("Final product data:", formData);
    markStepAsCompleted(8);
    setIsCompleted(true);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const handleAddAnother = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsCompleted(false);
    setFormData(defaultFormData);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
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
    <div className="flex-1 ">
      <div className="w-full">
        <AddProductStepper
          steps={steps}
          completedSteps={completedSteps}
          currentStep={currentStep}
          onStepClick={handleStepClick}
        />

        <div className="mt-16">
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
