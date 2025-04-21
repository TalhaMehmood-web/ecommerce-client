"use client";
import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CategoryFormValues } from "@/types/category";

export function CategoryNameField() {
  const { control } = useFormContext<CategoryFormValues>();

  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category Name</FormLabel>
          <FormControl>
            <Input
              placeholder="Enter category name"
              {...field}
              className="font-medium"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
