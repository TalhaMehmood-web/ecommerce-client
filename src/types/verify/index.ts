import { ReactNode } from "react";
import { z } from "zod";

// Company types
export type CompanyFormData = {
  name: string;
  address: string;
  contact: string;
  taxId?: string;
  logo?: string;
  isActive?: boolean;
};

// Subscription types
export type SubscriptionPlan = "basic" | "premium" | "enterprise";
export type PaymentStatus = "pending" | "paid" | "failed";

export type SubscriptionFormData = {
  plan: SubscriptionPlan;
  purchaseDate: Date;
  expiryDate: Date;
  isActive: boolean;
  paymentStatus: PaymentStatus;
};

// Step form types
export interface StepProps {
  children: ReactNode;
  title: string;
  description: string;
}

export interface FormStepperProps {
  steps: {
    label: string;
    description: string;
    icon?: ReactNode;
  }[];
  currentStep: number;
}

export interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  onSelect: () => void;
  selected: boolean;
}

// Zod schemas for form validation
export const companyFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters" }),
  address: z.string().min(5, { message: "Please provide a valid address" }),
  contact: z
    .string()
    .min(5, { message: "Please provide a valid contact number" }),
  taxId: z.string().optional(),
  logo: z.string().optional(),
  isActive: z.boolean().default(false),
});

export const subscriptionFormSchema = z.object({
  plan: z.enum(["basic", "premium", "enterprise"]),
  purchaseDate: z.date(),
  expiryDate: z.date(),
  isActive: z.boolean().default(true),
  paymentStatus: z.enum(["pending", "paid", "failed"]).default("pending"),
});

export const paymentFormSchema = z.object({
  paymentMethod: z.enum(["credit-card", "paypal"]).default("credit-card"),
});

// Types inferred from Zod schemas
export type CompanyFormValues = z.infer<typeof companyFormSchema>;
export type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;
export type PaymentFormValues = z.infer<typeof paymentFormSchema>;
