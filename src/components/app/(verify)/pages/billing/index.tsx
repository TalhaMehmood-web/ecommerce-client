"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { FormStepper } from "../../components/form-stepper";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CreditCard, Package } from "lucide-react";
import { motion } from "framer-motion";
import { PaymentDetailsForm } from "../../forms/subscription/payment-details";
import { SubscriptionPlanForm } from "../../forms/subscription/subscription-plan";
import { SubscriptionFormData } from "@/types/verify";
import { toast } from "sonner";

const subscriptionSteps = [
  {
    label: "Plan",
    description: "Subscription plan",
    icon: <Package className="h-5 w-5" />,
  },
  {
    label: "Payment",
    description: "Payment details",
    icon: <CreditCard className="h-5 w-5" />,
  },
];

const BillingView = () => {
  const [subscriptionCurrentStep, setSubscriptionCurrentStep] = useState(0);
  const [subscriptionData, setSubscriptionData] =
    useState<SubscriptionFormData>({
      plan: "basic",
      purchaseDate: new Date(),
      expiryDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      isActive: true,
      paymentStatus: "pending",
    });

  const handleSubscriptionNext = () => {
    if (subscriptionCurrentStep < subscriptionSteps.length - 1) {
      setSubscriptionCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubscriptionBack = () => {
    if (subscriptionCurrentStep > 0) {
      setSubscriptionCurrentStep((prev) => prev - 1);
    }
  };
  const updateSubscriptionData = (data: Partial<SubscriptionFormData>) => {
    setSubscriptionData((prev) => ({ ...prev, ...data }));
  };
  const handleSubscriptionComplete = () => {
    toast.success("Subscription setup completed", {
      description: "Your subscription has been set up successfully.",
    });
  };
  const renderSubscriptionContent = () => {
    switch (subscriptionCurrentStep) {
      case 0:
        return (
          <SubscriptionPlanForm
            data={subscriptionData}
            updateData={updateSubscriptionData}
            onValidSubmit={handleSubscriptionNext}
          />
        );
      case 1:
        return (
          <PaymentDetailsForm
            data={subscriptionData}
            updateData={updateSubscriptionData}
            onValidSubmit={handleSubscriptionNext}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-0">
        <div className="bg-primary/5 p-6">
          <h1 className="text-center text-3xl font-bold tracking-tight">
            Subscription Management
          </h1>
        </div>

        <div className="p-6">
          <FormStepper
            steps={subscriptionSteps}
            currentStep={subscriptionCurrentStep}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={subscriptionCurrentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {renderSubscriptionContent()}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={handleSubscriptionBack}
              disabled={subscriptionCurrentStep === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            {subscriptionCurrentStep < subscriptionSteps.length - 1 ? (
              <Button onClick={handleSubscriptionNext}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubscriptionComplete}>
                Complete Setup
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default BillingView;
