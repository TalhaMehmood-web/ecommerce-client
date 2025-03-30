import { z } from "zod";

// Basic Information Schema
export const basicInfoSchema = z.object({
  productName: z.string().min(3, "Product name must be at least 3 characters"),
  productDescription: z
    .string()
    .min(20, "Description must be at least 20 characters"),
  category: z.string().min(1, "Please select a category"),
  subcategory: z.string().optional(),
  brand: z.string().min(1, "Brand is required"),
  sku: z.string().min(3, "SKU must be at least 3 characters"),
  productTags: z.array(z.string()).min(1, "Add at least one tag"),
});

// Pricing Schema
export const pricingSchema = z.object({
  basePrice: z.number().positive("Price must be greater than 0"),
  discountedPrice: z
    .number()
    .positive("Discounted price must be greater than 0")
    .optional(),
  discountPercentage: z
    .number()
    .min(0, "Discount can't be negative")
    .max(100, "Discount can't exceed 100%")
    .optional(),
  taxRate: z.number().min(0, "Tax rate can't be negative"),
  currency: z.string().min(1, "Currency is required"),
});

// Inventory Schema
export const inventorySchema = z.object({
  stockQuantity: z
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock can't be negative"),
  stockStatus: z.enum(["In Stock", "Out of Stock", "Low Stock"]),
  minOrderQuantity: z
    .number()
    .int("Must be a whole number")
    .min(1, "Minimum order must be at least 1"),
  maxOrderQuantity: z
    .number()
    .int("Must be a whole number")
    .min(1, "Maximum order must be at least 1"),
});

// Shipping Schema
export const shippingSchema = z.object({
  weight: z.number().positive("Weight must be greater than 0"),
  dimensions: z
    .object({
      length: z.number().positive("Length must be greater than 0"),
      width: z.number().positive("Width must be greater than 0"),
      height: z.number().positive("Height must be greater than 0"),
    })
    .optional(),
  shippingCost: z.number().min(0, "Shipping cost can't be negative"),
  estimatedDelivery: z.string().min(1, "Estimated delivery time is required"),
  returnPolicy: z.string().min(1, "Return policy is required"),
});

// Images Schema
export const imagesSchema = z.object({
  productImages: z
    .array(z.string())
    .min(1, "At least one product image is required"),
  productVideos: z.array(z.string()).optional(),
  altTexts: z.array(z.string()).optional(),
});

// Variations Schema
export const variationsSchema = z.object({
  sizeOptions: z.array(z.string()).optional(),
  colorVariants: z
    .array(
      z.object({
        name: z.string(),
        hex: z
          .string()
          .regex(
            /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
            "Must be a valid hex color code"
          ),
      })
    )
    .optional(),
  materialType: z.array(z.string()).optional(),
  customizations: z.string().optional(),
});

// SEO Schema
export const seoSchema = z.object({
  metaTitle: z
    .string()
    .min(5, "Meta title must be at least 5 characters")
    .max(60, "Meta title should not exceed 60 characters"),
  metaDescription: z
    .string()
    .min(20, "Meta description must be at least 20 characters")
    .max(160, "Meta description should not exceed 160 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens"
    ),
});

// Other Information Schema
export const otherInfoSchema = z.object({
  isFeatured: z.boolean(),
  warrantyInfo: z.string().optional(),
  supplierInfo: z.string().optional(),
});

// Full Product Schema
export const productSchema = z.object({
  basicInfo: basicInfoSchema,
  pricing: pricingSchema,
  inventory: inventorySchema,
  shipping: shippingSchema,
  images: imagesSchema,
  variations: variationsSchema,
  seo: seoSchema,
  otherInfo: otherInfoSchema,
});

export type ProductFormValues = z.infer<typeof productSchema>;
export type BasicInfoValues = z.infer<typeof basicInfoSchema>;
export type PricingValues = z.infer<typeof pricingSchema>;
export type InventoryValues = z.infer<typeof inventorySchema>;
export type ShippingValues = z.infer<typeof shippingSchema>;
export type ImagesValues = z.infer<typeof imagesSchema>;
export type VariationsValues = z.infer<typeof variationsSchema>;
export type SeoValues = z.infer<typeof seoSchema>;
export type OtherInfoValues = z.infer<typeof otherInfoSchema>;
