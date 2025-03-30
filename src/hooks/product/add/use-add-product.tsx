import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMultiStepForm } from "./use-multistep-form";

export function useProductForm(defaultFormData: any, storageKey: string) {
  const router = useRouter();

  const LOCAL_STORAGE_COMPLETED_KEY = `${storageKey}_completed_steps`;

  const [isCompleted, setIsCompleted] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const savedSteps = localStorage.getItem(LOCAL_STORAGE_COMPLETED_KEY);
      return savedSteps ? JSON.parse(savedSteps) : [];
    }
    return [];
  });

  const {
    formData,
    setFormData,
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
  } = useMultiStepForm(defaultFormData, storageKey);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_COMPLETED_KEY,
      JSON.stringify(completedSteps)
    );
  }, [completedSteps]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNext = () => {
    scrollToTop();
    nextStep();
  };

  const handleBack = () => {
    scrollToTop();
    prevStep();
  };

  const markStepAsCompleted = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps((prev) => [...prev, step]);
    }
  };

  const handleStepClick = (step: number) => {
    scrollToTop();
    setCurrentStep(step);
  };

  const handleSubmit = (values: any, step: number, field: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: values }));
    markStepAsCompleted(step);
    handleNext();
  };

  const handleFinalSubmit = () => {
    console.log("Final product data:", formData);
    markStepAsCompleted(currentStep);
    setIsCompleted(true);
    localStorage.removeItem(storageKey);
    localStorage.removeItem(LOCAL_STORAGE_COMPLETED_KEY);
  };

  const handleAddAnother = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsCompleted(false);
    setFormData(defaultFormData);
    localStorage.removeItem(storageKey);
    localStorage.removeItem(LOCAL_STORAGE_COMPLETED_KEY);
  };

  const handleViewProducts = () => router.push("/");

  return {
    formData,
    setFormData,
    currentStep,
    setCurrentStep,
    completedSteps,
    isCompleted,
    handleNext,
    handleBack,
    handleStepClick,
    handleSubmit,
    handleFinalSubmit,
    handleAddAnother,
    handleViewProducts,
  };
}
