"use client";
import { Step } from "../../components/step";
import { CreditCard, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm, useFormContext } from "react-hook-form";

export const PaymentDetailsForm = () => {
  const { getValues, setValue, watch } = useFormContext();
  const data = getValues();

  const paymentMethod = watch("paymentMethod");

  return (
    <Step
      title="Payment Details"
      description="Choose your payment method to complete subscription"
    >
      <div className="space-y-6">
        <div className="rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Selected Plan</h3>
              <p className="text-sm text-muted-foreground capitalize">
                {data.plan}
              </p>
            </div>
            <p className="text-lg font-bold">
              {data.plan === "basic"
                ? "$9.99"
                : data.plan === "premium"
                ? "$29.99"
                : "$79.99"}
              <span className="text-sm font-normal text-muted-foreground">
                /month
              </span>
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <RadioGroup
            defaultValue="credit-card"
            className="grid gap-4 md:grid-cols-2"
            value={paymentMethod}
            onValueChange={(value) => setValue("paymentMethod", value)}
          >
            <motion.div
              whileHover={{ y: -2 }}
              className="relative rounded-lg border p-4"
            >
              <RadioGroupItem
                value="credit-card"
                id="credit-card"
                className="absolute right-4 top-4"
              />
              <FormLabel htmlFor="credit-card" className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  <span className="font-medium">Credit Card</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Pay with Visa, Mastercard, etc.
                </span>
              </FormLabel>
            </motion.div>

            <motion.div
              whileHover={{ y: -2 }}
              className="relative rounded-lg border p-4"
            >
              <RadioGroupItem
                value="paypal"
                id="paypal"
                className="absolute right-4 top-4"
              />
              <FormLabel htmlFor="paypal" className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">PayPal</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  Pay with your PayPal account
                </span>
              </FormLabel>
            </motion.div>
          </RadioGroup>

          <div className="mt-6">
            <p className="text-xs text-center mt-2 text-muted-foreground">
              You will be redirected to our secure payment provider
            </p>
          </div>
        </div>
      </div>
    </Step>
  );
};
