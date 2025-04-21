"use client";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Category } from "@/types/category";

interface CategoryFieldProps {
  form: UseFormReturn<any>;
  index: number;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export function CategoryField({
  form,
  index,
  categories,
  setCategories,
}: CategoryFieldProps) {
  // Update form value when categories change
  useEffect(() => {
    form.setValue(`categories.${index}`, categories[index]);
  }, [form, index, categories]);

  const handleNameChange = (value: string) => {
    const updatedCategories = [...categories];
    updatedCategories[index] = {
      ...updatedCategories[index],
      name: value,
    };
    setCategories(updatedCategories);
  };

  return (
    <FormField
      control={form.control}
      name={`categories.${index}.name`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              placeholder="Category name"
              {...field}
              value={categories[index]?.name || ""}
              onChange={(e) => {
                field.onChange(e);
                handleNameChange(e.target.value);
              }}
              className="mb-2"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
