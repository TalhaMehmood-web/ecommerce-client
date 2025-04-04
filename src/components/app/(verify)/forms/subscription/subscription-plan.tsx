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
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import convertToTimestamp from "@/utils/getTimeStamp";
interface SubscriptionPlanFormProps {
  handleSubscriptionNext: () => void;
}
export const SubscriptionPlanForm: React.FC<SubscriptionPlanFormProps> = ({
  handleSubscriptionNext,
}) => {
  const { setValue, getValues } = useFormContext();
  const data = getValues();
  const handleSelectPlan = (plan: SubscriptionPlan) => {
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);

    setValue("plan", plan);
    setValue("expiryDate", convertToTimestamp(expiryDate));
    handleSubscriptionNext();
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
      <div className="space-y-6">
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
      </div>
    </Step>
  );
};
