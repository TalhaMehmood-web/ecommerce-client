"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRightCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CategoryNameField } from "./category-name-field";
import { SubcategoryList } from "./subcategory-list";
import { categoryFormSchema } from "@/lib/schema/add-category";
import { CategoryFormValues } from "@/types/category";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import { toast } from "sonner";
import ApiLoader from "@/components/shared/loading/api-loader";

export function CategoryForm() {
  const [subcategoriesCount, setSubcategoriesCount] = useState(0);

  const methods = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      subcategories: [],
    },
  });
  const mutation = useMutation({
    mutationFn: (data: CategoryFormValues) =>
      axiosInstance.post("/category", data),
    onSuccess: () => {
      toast.success("Category created successfully!");
      methods.reset();
      setSubcategoriesCount(0);
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create category."
      );
    },
  });
  const onSubmit = async (data: CategoryFormValues) => {
    await mutation.mutateAsync(data);
  };

  const addSubcategory = () => {
    const currentSubcategories = methods.getValues("subcategories") || [];
    methods.setValue("subcategories", [...currentSubcategories, { name: "" }]);
    setSubcategoriesCount((prev) => prev + 1);
  };

  return (
    <FormProvider {...methods}>
      <ApiLoader isLoading={mutation.isPending} message="Adding Category" />
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-2 space-y-6">
            <CategoryNameField />

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-muted-foreground">
                  Subcategories
                </h4>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSubcategory}
                  className="h-8"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add Subcategory
                </Button>
              </div>

              <AnimatePresence initial={false}>
                {subcategoriesCount === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-8 text-center border border-dashed rounded-md"
                  >
                    <div className="rounded-full bg-muted p-3">
                      <ArrowRightCircle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">
                      No subcategories yet
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                      Add subcategories to organize content within this
                      category.
                    </p>
                    <Button
                      type="button"
                      onClick={addSubcategory}
                      className="mt-4"
                      variant="outline"
                    >
                      Add your first subcategory
                    </Button>
                  </motion.div>
                ) : (
                  <SubcategoryList
                    subcategoriesCount={subcategoriesCount}
                    setSubcategoriesCount={setSubcategoriesCount}
                  />
                )}
              </AnimatePresence>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 py-3 flex justify-between">
            <div className="text-sm text-muted-foreground">
              {subcategoriesCount}
              {subcategoriesCount === 1 ? "subcategory" : "subcategories"}
            </div>
            <Button
              type="submit"
              disabled={
                !methods.formState.isValid || methods.formState.isSubmitting
              }
            >
              Save Category
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
