import { z } from "zod";

const subcategorySchema = z.object({
  name: z.string().min(1, "Subcategory name is required"),
});

const categoryFormSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  subcategories: z
    .array(subcategorySchema)
    .min(1, "At least one subcategory is required"),
});

export { categoryFormSchema, subcategorySchema };
