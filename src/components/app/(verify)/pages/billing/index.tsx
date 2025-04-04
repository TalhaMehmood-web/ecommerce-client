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
import { toast } from "sonner";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import { API_ENDPOINTS } from "@/utils/endpoints";

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

  const { data } = useQuery({
    queryKey: ["subscription"],
    queryFn: () =>
      axiosInstance.get(
        API_ENDPOINTS.SUBSCRIPTION.GET_SUBSCRIPTION_BY_USER_AND_ACTIVE_STATUS
      ),
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const methods = useForm({
    defaultValues: {
      plan: "basic",
      purchaseDate: Date.now(),
      expiryDate: new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      ).getTime(),
      isActive: false,
      paymentStatus: "pending",
      paymentMethod: "credit-card",
    },
  });
  const { handleSubmit } = methods;
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

  const useSaveSubscription = () => {
    return useMutation({
      mutationFn: (data) =>
        axiosInstance.post(
          API_ENDPOINTS.SUBSCRIPTION.SAVE_BEFORE_PAYMENT,
          data
        ),
      onSuccess: async ({ data }) => {
        if (data.statusCode === 201) {
          toast.success("Subscription created successfully!");

          const response = await axiosInstance.post(
            API_ENDPOINTS.SUBSCRIPTION.CREATE_STRIPE_PAYMENT_SESSION
          );

          window.location.href = response.data?.data;
        }
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message);
      },
    });
  };
  const mutation = useSaveSubscription();
  const onSubmit = async (data: any) => {
    if (!mutation.isPending) {
      await mutation.mutateAsync(data);
    }
  };
  const renderSubscriptionContent = () => {
    switch (subscriptionCurrentStep) {
      case 0:
        return (
          <SubscriptionPlanForm
            handleSubscriptionNext={handleSubscriptionNext}
          />
        );
      case 1:
        return <PaymentDetailsForm />;
      default:
        return null;
    }
  };

  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-0">
        <FormProvider {...methods}>
          <form noValidate onSubmit={handleSubmit(onSubmit)} className="p-6">
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
                type="button"
                variant="outline"
                onClick={handleSubscriptionBack}
                disabled={subscriptionCurrentStep === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>

              {subscriptionCurrentStep < subscriptionSteps.length - 1 ? (
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubscriptionNext();
                  }}
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button disabled={mutation.isPending} type="submit">
                  Complete Setup
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
export default BillingView;
