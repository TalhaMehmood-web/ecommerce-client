"use client";
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { CategoryFormValues } from "@/types/category";

interface SubcategoryListProps {
  subcategoriesCount: number;
  setSubcategoriesCount: React.Dispatch<React.SetStateAction<number>>;
}

export function SubcategoryList({
  subcategoriesCount,
  setSubcategoriesCount,
}: SubcategoryListProps) {
  const { control, getValues, setValue, watch } =
    useFormContext<CategoryFormValues>();

  // Watch subcategories to ensure UI updates when they change
  const subcategories = watch("subcategories");

  const removeSubcategory = (index: number) => {
    const currentSubcategories = [...getValues("subcategories")];
    currentSubcategories.splice(index, 1);
    setValue("subcategories", currentSubcategories);
    setSubcategoriesCount((prev) => prev - 1);
  };

  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {subcategories?.map((_: any, index: any) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, overflow: "hidden" }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <FormField
              control={control}
              name={`subcategories.${index}.name`}
              render={({ field }) => (
                <FormItem className="flex-1 mb-0">
                  <FormControl>
                    <Input
                      placeholder="Subcategory name"
                      {...field}
                      className="h-9"
                      autoFocus={index === subcategories.length - 1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeSubcategory(index)}
              className="h-9 w-9 shrink-0"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove subcategory</span>
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
