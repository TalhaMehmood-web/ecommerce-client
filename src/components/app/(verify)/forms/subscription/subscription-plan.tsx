"use client";
import { useEffect } from "react";
import { Step } from "../../components/step";
import { PricingTier } from "../../components/pricing-tier";
import {
  SubscriptionFormData,
  SubscriptionPlan,
  SubscriptionFormValues,
  subscriptionFormSchema,
} from "@/types/verify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";

interface SubscriptionPlanFormProps {
  data: SubscriptionFormData;
  updateData: (data: Partial<SubscriptionFormData>) => void;
  onValidSubmit?: () => void;
}

export const SubscriptionPlanForm = ({
  data,
  updateData,
  onValidSubmit,
}: SubscriptionPlanFormProps) => {
  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: {
      plan: data.plan,
      purchaseDate: data.purchaseDate,
      expiryDate: data.expiryDate,
      isActive: data.isActive,
      paymentStatus: data.paymentStatus,
    },
  });

  // Update form when data prop changes
  useEffect(() => {
    form.reset({
      plan: data.plan,
      purchaseDate: data.purchaseDate,
      expiryDate: data.expiryDate,
      isActive: data.isActive,
      paymentStatus: data.paymentStatus,
    });
  }, [data, form]);

  const handleSelectPlan = (plan: SubscriptionPlan) => {
    // Update expiry date to 1 month from now
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);

    form.setValue("plan", plan);
    form.setValue("expiryDate", expiryDate);

    updateData({
      plan,
      expiryDate,
    });

    toast.success(
      `${plan.charAt(0).toUpperCase() + plan.slice(1)} plan selected`
    );
  };

  const plans = [
    {
      name: "Basic",
      price: "$9.99",
      description: "Essential features for small businesses",
      features: [
        "Up to 5 team members",
        "Basic CRM features",
        "Email support",
        "1GB storage",
      ],
      plan: "basic" as SubscriptionPlan,
    },
    {
      name: "Premium",
      price: "$29.99",
      description: "Advanced features for growing companies",
      features: [
        "Up to 20 team members",
        "Advanced CRM features",
        "Priority support",
        "10GB storage",
        "Analytics dashboard",
      ],
      plan: "premium" as SubscriptionPlan,
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "$79.99",
      description: "Complete solution for larger organizations",
      features: [
        "Unlimited team members",
        "Full CRM suite",
        "Dedicated support",
        "100GB storage",
        "Advanced analytics",
        "Custom integrations",
        "White labeling",
      ],
      plan: "enterprise" as SubscriptionPlan,
    },
  ];

  return (
    <Step
      title="Choose a Plan"
      description="Select the subscription plan that fits your needs"
    >
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(() => {
            if (onValidSubmit) onValidSubmit();
          })}
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((planInfo) => (
              <PricingTier
                key={planInfo.name}
                name={planInfo.name}
                price={planInfo.price}
                description={planInfo.description}
                features={planInfo.features}
                highlighted={planInfo.highlighted}
                selected={data.plan === planInfo.plan}
                onSelect={() => handleSelectPlan(planInfo.plan)}
              />
            ))}
          </div>
        </form>
      </Form>
    </Step>
  );
};
