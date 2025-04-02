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
import { CompanyFormData } from "@/types/verify";
import { CompanyReviewForm } from "./review";

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

  const handleCompanyNext = () => {
    if (companyCurrentStep < companySteps.length - 1) {
      setCompanyCurrentStep((prev) => prev + 1);
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
  const handleCompanyComplete = () => {
    toast.success("Company registration completed", {
      description: "Your company has been registered successfully.",
    });
  };
  const renderCompanyContent = () => {
    switch (companyCurrentStep) {
      case 0:
        return (
          <CompanyDetailsForm
            data={companyData}
            updateData={updateCompanyData}
            onValidSubmit={handleCompanyNext}
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
        <div className="bg-primary/5 p-6">
          <h1 className="text-center text-3xl font-bold tracking-tight">
            Company Registration
          </h1>
        </div>

        <div className="p-6">
          <FormStepper steps={companySteps} currentStep={companyCurrentStep} />

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
              <Button onClick={handleCompanyNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleCompanyComplete}>
                Complete Registration
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegitserCompanyView;
