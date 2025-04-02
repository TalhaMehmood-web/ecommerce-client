"use client";
import { useState } from "react";
import { SubscriptionFormData } from "@/types/verify";
import { Step } from "../../components/step";
import { Check, CreditCard, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

interface PaymentDetailsFormProps {
  data: SubscriptionFormData;
  updateData: (data: Partial<SubscriptionFormData>) => void;
  onValidSubmit?: () => void;
}

export const PaymentDetailsForm = ({
  data,
  updateData,
  onValidSubmit,
}: PaymentDetailsFormProps) => {
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(
    data.paymentStatus === "paid"
  );
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const form = useForm();

  const handleProceedToPayment = () => {
    setProcessingPayment(true);

    // Simulate payment processing - in real app would redirect to Stripe
    setTimeout(() => {
      setProcessingPayment(false);
      setPaymentSuccess(true);
      updateData({ paymentStatus: "paid" });

      toast.success("Payment successful!");
      if (onValidSubmit) onValidSubmit();
    }, 2000);
  };

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

        <Form {...form}>
          <form className="space-y-4">
            <RadioGroup
              defaultValue="credit-card"
              className="grid gap-4 md:grid-cols-2"
              value={paymentMethod}
              onValueChange={setPaymentMethod}
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
                <FormLabel
                  htmlFor="credit-card"
                  className="flex flex-col gap-1"
                >
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
              <Button
                type="button"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleProceedToPayment}
                disabled={processingPayment || paymentSuccess}
              >
                {processingPayment ? (
                  <span>Processing...</span>
                ) : paymentSuccess ? (
                  <>
                    <Check className="h-4 w-4" />
                    Payment Successful
                  </>
                ) : (
                  <>
                    Proceed to Payment
                    <ExternalLink className="h-4 w-4" />
                  </>
                )}
              </Button>
              <p className="text-xs text-center mt-2 text-muted-foreground">
                You will be redirected to our secure payment provider
              </p>
            </div>
          </form>
        </Form>
      </div>
    </Step>
  );
};
