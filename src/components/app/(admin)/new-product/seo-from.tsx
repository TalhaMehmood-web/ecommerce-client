"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { seoSchema, SeoValues } from "@/lib/schema/add-product";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Search, Globe } from "lucide-react";

interface SeoFormProps {
  defaultValues?: SeoValues;
  onSubmit: (values: SeoValues) => void;
  onBack: () => void;
}

export function SeoForm({ defaultValues, onSubmit, onBack }: SeoFormProps) {
  const form = useForm<SeoValues>({
    resolver: zodResolver(seoSchema),
    defaultValues: defaultValues || {
      metaTitle: "",
      metaDescription: "",
      slug: "",
    },
  });

  const metaTitle = form.watch("metaTitle");
  const metaDescription = form.watch("metaDescription");

  const titleLength = metaTitle?.length || 0;
  const descriptionLength = metaDescription?.length || 0;

  const titleProgress = Math.min((titleLength / 60) * 100, 100);
  const descriptionProgress = Math.min((descriptionLength / 160) * 100, 100);

  const getTitleProgressColor = () => {
    if (titleLength < 20) return "bg-red-500";
    if (titleLength > 55) return "bg-amber-500";
    return "bg-green-500";
  };

  const getDescriptionProgressColor = () => {
    if (descriptionLength < 50) return "bg-red-500";
    if (descriptionLength > 150) return "bg-amber-500";
    return "bg-green-500";
  };

  const handleGenerateSlug = () => {
    if (metaTitle) {
      const slug = metaTitle
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen

      form.setValue("slug", slug);
    }
  };

  return (
    <div className="w-full  p-6 mx-auto bg-white rounded-lg shadow-md animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">SEO & Marketing</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="metaTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input placeholder="SEO-friendly title" {...field} />
                </FormControl>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span
                      className={`${
                        titleLength > 60 ? "text-red-500" : "text-gray-500"
                      }`}
                    >
                      {titleLength}/60 characters
                    </span>
                    <span
                      className={`
                      ${titleLength < 20 ? "text-red-500" : ""}
                      ${
                        titleLength >= 20 && titleLength <= 55
                          ? "text-green-500"
                          : ""
                      }
                      ${titleLength > 55 ? "text-amber-500" : ""}
                    `}
                    >
                      {titleLength < 20 ? "Too short" : ""}
                      {titleLength >= 20 && titleLength <= 55
                        ? "Good length"
                        : ""}
                      {titleLength > 55 ? "Getting long" : ""}
                    </span>
                  </div>
                  <Progress
                    value={titleProgress}
                    className={getTitleProgressColor()}
                  />
                </div>
                <FormDescription>
                  A concise, descriptive title that will appear in search
                  results
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="metaDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief description for search engines"
                    className="min-h-24"
                    {...field}
                  />
                </FormControl>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span
                      className={`${
                        descriptionLength > 160
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      {descriptionLength}/160 characters
                    </span>
                    <span
                      className={`
                      ${descriptionLength < 50 ? "text-red-500" : ""}
                      ${
                        descriptionLength >= 50 && descriptionLength <= 150
                          ? "text-green-500"
                          : ""
                      }
                      ${descriptionLength > 150 ? "text-amber-500" : ""}
                    `}
                    >
                      {descriptionLength < 50 ? "Too short" : ""}
                      {descriptionLength >= 50 && descriptionLength <= 150
                        ? "Good length"
                        : ""}
                      {descriptionLength > 150 ? "Getting long" : ""}
                    </span>
                  </div>
                  <Progress
                    value={descriptionProgress}
                    className={getDescriptionProgressColor()}
                  />
                </div>
                <FormDescription>
                  A short description that appears under the title in search
                  results
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="relative">
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Slug</FormLabel>
                  <div className="flex">
                    <div className="bg-gray-100 flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 text-gray-500 text-sm">
                      yoursite.com/products/
                    </div>
                    <FormControl>
                      <Input
                        placeholder="product-url-slug"
                        className="rounded-l-none"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <div className="flex justify-end mt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleGenerateSlug}
                      className="text-xs"
                    >
                      Generate from Title
                    </Button>
                  </div>
                  <FormDescription>
                    A URL-friendly version of the product name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6 animate-fade-in">
            <div className="flex items-center mb-3">
              <Search className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="font-medium text-blue-800">Search Preview</h3>
            </div>
            <div className="p-3 bg-white rounded border border-gray-200">
              <div className="text-blue-600 text-lg font-medium truncate mb-1">
                {metaTitle || "Your Product Title"}
              </div>
              <div className="text-green-700 text-sm mb-1 flex items-center">
                <Globe className="h-3 w-3 mr-1" />
                yoursite.com/products/{form.getValues().slug || "product-url"}
              </div>
              <div className="text-gray-600 text-sm line-clamp-2">
                {metaDescription ||
                  "Your product description will appear here. Make sure it's compelling and includes relevant keywords."}
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" className="animate-float">
              Next Step
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
