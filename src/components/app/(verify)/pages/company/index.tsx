"use client";
import { FormStepper } from "@/components/app/(verify)/components/form-stepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Building2, ListChecks } from "lucide-react";
import { toast } from "sonner";
import { CompanyDetailsForm } from "../../forms/company";
import { useState } from "react";
import {
  CompanyFormData,
  companyFormSchema,
  CompanyFormValues,
} from "@/types/verify";
import { CompanyReviewForm } from "./review";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";

const companySteps = [
  {
    label: "Company",
    description: "Company details",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    label: "Review",
    description: "Final review",
    icon: <ListChecks className="h-5 w-5" />,
  },
];

const RegitserCompanyView = () => {
  const [companyCurrentStep, setCompanyCurrentStep] = useState(0);
  const [companyData, setCompanyData] = useState<CompanyFormData>({
    name: "",
    address: "",
    contact: "",
    taxId: "",
    isActive: false,
  });
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "",
      address: "",
      contact: "",
      taxId: "",
      isActive: false,
    },
  });
  const { handleSubmit } = form;

  // Toast promise wrapper
  const toastPromise = async (promise: any) => {
    return toast.promise(promise, {
      loading: "Processing request...",
      success: (data: any) => data.message || "Operation successful!",
      error: (error) => error.response?.data?.message || "Something went wrong",
    });
  };

  // Create mutation for adding a company
  const mutation = useMutation({
    mutationFn: async (companyData: any) => {
      const res = await axiosInstance.post("company", companyData);

      if (res.data?.statusCode === 200) {
        setCompanyData(res.data?.data);

        setCompanyCurrentStep((prev) => prev + 1);
      }
      return res.data;
    },
  });

  const addCompany = async (companyData: any) => {
    try {
      const res = await toastPromise(mutation.mutateAsync(companyData));

      return res;
    } catch (error) {
      throw error;
    }
  };

  const handleCompanyBack = () => {
    if (companyCurrentStep > 0) {
      setCompanyCurrentStep((prev) => prev - 1);
    }
  };

  const updateCompanyData = (data: Partial<CompanyFormData>) => {
    setCompanyData((prev) => ({ ...prev, ...data }));
  };

  // onSubmit now uses try/catch for error handling
  const onSubmit = async (data: CompanyFormData) => {
    setCompanyData(data);
    await addCompany(data);
  };

  const renderCompanyContent = () => {
    switch (companyCurrentStep) {
      case 0:
        return (
          <CompanyDetailsForm
            data={companyData}
            updateData={updateCompanyData}
          />
        );
      case 1:
        return <CompanyReviewForm data={companyData} />;
      default:
        return null;
    }
  };

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-0">
        <div className="p-6">
          <FormStepper steps={companySteps} currentStep={companyCurrentStep} />
          <FormProvider {...form}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={companyCurrentStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderCompanyContent()}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleCompanyBack}
                  disabled={companyCurrentStep === 0}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                {companyCurrentStep < companySteps.length - 1 ? (
                  // "Next" button triggers form submit and onSubmit handles the mutation
                  <Button disabled={mutation.isPending} type="submit">
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="button">Complete Registration</Button>
                )}
              </div>
            </form>
          </FormProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegitserCompanyView;
