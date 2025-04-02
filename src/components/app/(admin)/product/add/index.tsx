"use client";

import React, { useState } from "react";
import { ProductFormValues } from "@/lib/schema/add-product";
import { useRouter } from "next/navigation";
import { AddProductStepper } from "./add-product-stepper";
import { BasicInfoForm } from "./basic-info-form";
import { PricingForm } from "./pricing-form";
import { InventoryForm } from "./inventory-form";
import { ShippingForm } from "./shipping-form";
import { VariationsForm } from "./variation-form";
import { ImagesForm } from "./images-form";
import { SeoForm } from "./seo-from";
import { OtherInfoForm } from "./other-info-from";
import { ReviewForm } from "./review";
import { SuccessScreen } from "./success-screen";
import { useMultiStepForm } from "@/hooks/product/add/use-multistep-form";
import { useAddProduct } from "@/hooks/product/add/use-addproduct-mutation";
import { ProductData } from "@/types/products/details";

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

const ProductAdd = ({
  defaultFormData,
  editMode,
  id,
}: {
  defaultFormData: ProductFormValues;
  editMode?: boolean;
  id?: string;
}) => {
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
  } = useMultiStepForm(defaultFormData, LOCAL_STORAGE_KEY, editMode);
  const mutation = useAddProduct(editMode, id);

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    nextStep();
  };

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    prevStep();
  };

  const handleStepSubmit = (step: number, values: any) => {
    const stepKeys = [
      "basicInfo",
      "pricing",
      "inventory",
      "shipping",
      "images",
      "variations",
      "seo",
      "otherInfo",
    ];
    setFormData((prev) => ({ ...prev, [stepKeys[step]]: values }));
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }
    handleNext();
  };

  const handleFinalSubmit = () => {
    mutation
      .mutateAsync(formData as ProductData)
      .then(() => {
        setCompletedSteps((prev) => [...prev, 8]);
        setIsCompleted(true);
      })
      .catch((err) => console.error(err));
  };

  const handleAddAnother = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsCompleted(false);
    setFormData(defaultFormData);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    router.push("/admin/product/add");
  };

  const handleViewProducts = () => {
    router.push("/admin/product/list");
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

  const forms = [
    <BasicInfoForm
      defaultValues={formData.basicInfo}
      onSubmit={(values) => handleStepSubmit(0, values)}
    />,
    <PricingForm
      defaultValues={formData.pricing}
      onSubmit={(values) => handleStepSubmit(1, values)}
      onBack={handleBack}
    />,
    <InventoryForm
      defaultValues={formData.inventory}
      onSubmit={(values) => handleStepSubmit(2, values)}
      onBack={handleBack}
    />,
    <ShippingForm
      defaultValues={formData.shipping}
      onSubmit={(values) => handleStepSubmit(3, values)}
      onBack={handleBack}
    />,
    <ImagesForm
      defaultValues={formData.images}
      onSubmit={(values) => handleStepSubmit(4, values)}
      onBack={handleBack}
    />,
    <VariationsForm
      defaultValues={formData.variations}
      onSubmit={(values) => handleStepSubmit(5, values)}
      onBack={handleBack}
    />,
    <SeoForm
      defaultValues={formData.seo}
      onSubmit={(values) => handleStepSubmit(6, values)}
      onBack={handleBack}
    />,
    <OtherInfoForm
      defaultValues={formData.otherInfo}
      onSubmit={(values) => handleStepSubmit(7, values)}
      onBack={handleBack}
    />,
    <ReviewForm
      values={formData}
      onSubmit={handleFinalSubmit}
      onBack={handleBack}
      onEdit={setCurrentStep}
      editMode={editMode}
    />,
  ];

  return (
    <div className="flex-1">
      <div className="w-full">
        <AddProductStepper
          steps={steps}
          completedSteps={completedSteps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
        <div className="mt-16">{forms[currentStep]}</div>
      </div>
    </div>
  );
};

export default ProductAdd;
