"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { otherInfoSchema, OtherInfoValues } from "@/lib/schema/add-product";
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
import { Switch } from "@/components/ui/switch";
import { Award, ShieldCheck, Store } from "lucide-react";

interface OtherInfoFormProps {
  defaultValues?: OtherInfoValues;
  onSubmit: (values: OtherInfoValues) => void;
  onBack: () => void;
}

export function OtherInfoForm({
  defaultValues,
  onSubmit,
  onBack,
}: OtherInfoFormProps) {
  const form = useForm<OtherInfoValues>({
    resolver: zodResolver(otherInfoSchema),
    defaultValues: defaultValues || {
      isFeatured: false,
      warrantyInfo: "",
      supplierInfo: "",
    },
  });

  return (
    <div className="w-full  p-6 mx-auto bg-white rounded-lg shadow-md animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Other Information
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-amber-500" />
                    <FormLabel className="font-medium">
                      Featured Product
                    </FormLabel>
                  </div>
                  <FormDescription>
                    Feature this product on the homepage and in promotional
                    areas
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="warrantyInfo"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    <FormLabel>Warranty Information</FormLabel>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Describe warranty coverage, if applicable"
                      className="min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional: Details about any warranty provided
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="supplierInfo"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2 mb-2">
                    <Store className="h-4 w-4 text-blue-600" />
                    <FormLabel>Supplier Information</FormLabel>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Enter supplier or vendor details"
                      className="min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional: Supplier contact information for internal use
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
            <h3 className="font-medium text-blue-800 mb-2">
              Additional Information
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              You can add custom fields and additional product information after
              creating the basic product.
            </p>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Customer reviews and ratings</li>
              <li>• Related products</li>
              <li>• Cross-sell and upsell items</li>
              <li>• Bulk pricing options</li>
            </ul>
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
