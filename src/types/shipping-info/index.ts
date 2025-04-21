import { z } from "zod";

// TypeScript types for shipping information
export interface ShippingInfoType {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

// Zod validation schema for form validation
export const shippingInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  addressLine1: z.string().min(5, { message: "Address line 1 is required" }),
  addressLine2: z.string().optional(),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().optional(),
  country: z.string().min(2, { message: "Country is required" }),
  postalCode: z.string().min(3, { message: "Postal code is required" }),
  isDefault: z.boolean().default(false),
});

export type ShippingFormValues = z.infer<typeof shippingInfoSchema>;

// List of countries for the country dropdown
export const countries = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "MX", label: "Mexico" },
  { value: "UK", label: "United Kingdom" },
  { value: "FR", label: "France" },
  { value: "DE", label: "Germany" },
  { value: "IT", label: "Italy" },
  { value: "ES", label: "Spain" },
  { value: "JP", label: "Japan" },
  { value: "AU", label: "Australia" },
  // Add more countries as needed
];
