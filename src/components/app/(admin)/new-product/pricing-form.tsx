"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { pricingSchema, PricingValues } from "@/lib/form-schema";
import { pricingSchema, PricingValues } from "@/lib/schema/add-product";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface PricingFormProps {
  defaultValues?: PricingValues;
  onSubmit: (values: PricingValues) => void;
  onBack: () => void;
}

const currencies = [
  { value: "USD", label: "USD ($)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
  { value: "JPY", label: "JPY (¥)" },
  { value: "CAD", label: "CAD ($)" },
  { value: "AUD", label: "AUD ($)" },
  { value: "INR", label: "INR (₹)" },
];

export function PricingForm({
  defaultValues,
  onSubmit,
  onBack,
}: PricingFormProps) {
  const form = useForm<PricingValues>({
    resolver: zodResolver(pricingSchema),
    defaultValues: defaultValues || {
      basePrice: 0,
      discountedPrice: undefined,
      discountPercentage: undefined,
      taxRate: 0,
      currency: "USD",
    },
  });

  const basePrice = form.watch("basePrice");
  const discountPercentage = form.watch("discountPercentage");

  React.useEffect(() => {
    if (basePrice && discountPercentage) {
      const discounted = basePrice - basePrice * (discountPercentage / 100);
      form.setValue("discountedPrice", parseFloat(discounted.toFixed(2)));
    }
  }, [basePrice, discountPercentage, form]);

  return (
    <div className="w-full  p-6 mx-auto bg-white rounded-lg shadow-md animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Pricing & Discounts
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="basePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseFloat(e.target.value) || 0);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-medium text-lg mb-4">Discount Information</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="discountPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Percentage (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          field.onChange(parseFloat(e.target.value) || 0);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter a value between 0 and 100
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discountedPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discounted Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          field.onChange(parseFloat(e.target.value) || 0);
                        }}
                        className="bg-gray-100"
                        disabled={
                          discountPercentage !== undefined &&
                          discountPercentage > 0
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      {discountPercentage
                        ? "Auto-calculated based on discount percentage"
                        : "Enter manually if needed"}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="taxRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax Rate (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    onChange={(e) => {
                      field.onChange(parseFloat(e.target.value) || 0);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Enter the applicable tax rate percentage
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
            <h3 className="font-medium text-blue-800 mb-2">Price Summary</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-600">Base Price:</div>
              <div className="text-sm font-medium">
                {form.getValues().currency}{" "}
                {form.getValues().basePrice?.toFixed(2) || "0.00"}
              </div>
              {discountPercentage && discountPercentage > 0 && (
                <>
                  <div className="text-sm text-gray-600">Discount:</div>
                  <div className="text-sm font-medium text-red-600">
                    {form.getValues().discountPercentage}% (-{" "}
                    {form.getValues().currency}{" "}
                    {(
                      ((form.getValues().basePrice || 0) *
                        (form.getValues().discountPercentage || 0)) /
                      100
                    ).toFixed(2)}
                    )
                  </div>
                  <div className="text-sm text-gray-600">Final Price:</div>
                  <div className="text-sm font-semibold">
                    {form.getValues().currency}{" "}
                    {form.getValues().discountedPrice?.toFixed(2) || "0.00"}
                  </div>
                </>
              )}
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
