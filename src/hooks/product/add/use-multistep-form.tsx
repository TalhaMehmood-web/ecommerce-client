"use client";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
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
export function useMultiStepForm<T>(
  defaultData: T,
  storageKey: string,
  editMode?: boolean
) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const LOCAL_STORAGE_STEP_KEY = `${storageKey}_step`;

  // Load form data from localStorage or use defaultData
  const [formData, setFormData] = useState<T>(() => {
    if (typeof window !== "undefined" && !editMode) {
      const savedData = localStorage.getItem(storageKey);
      return savedData ? JSON.parse(savedData) : defaultData;
    }
    return defaultData;
  });

  // Load step from localStorage or query param
  const [currentStep, setCurrentStep] = useState<number>(() => {
    if (typeof window !== "undefined" && !editMode) {
      const savedStep = localStorage.getItem(LOCAL_STORAGE_STEP_KEY);
      return savedStep ? parseInt(savedStep, 10) : 1;
    }
    return 0;
  });

  // Sync step from query params when component mounts
  useEffect(() => {
    const stepFromUrl = searchParams.get("step");
    if (stepFromUrl) {
      setCurrentStep(parseInt(stepFromUrl, 10));
    }
  }, [searchParams]);

  // Save formData to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined" && !editMode) {
      localStorage.setItem(storageKey, JSON.stringify(formData));
    }
  }, [formData]);

  // Save step to localStorage & update query params
  useEffect(() => {
    if (typeof window !== "undefined") {
      router.replace(`${pathname}?step=${currentStep}`);
      if (!editMode) {
        localStorage.setItem(LOCAL_STORAGE_STEP_KEY, currentStep.toString());
      }
    }
  }, [currentStep, pathname, router]);

  // Step navigation functions
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));
  return {
    formData,
    setFormData,
    currentStep,
    nextStep,
    prevStep,
    setCurrentStep,
  };
}
