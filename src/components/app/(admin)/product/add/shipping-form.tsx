"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { shippingSchema, ShippingValues } from "@/lib/schema/add-product";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ShippingFormProps {
  defaultValues?: ShippingValues;
  onSubmit: (values: ShippingValues) => void;
  onBack: () => void;
}

export function ShippingForm({
  defaultValues,
  onSubmit,
  onBack,
}: ShippingFormProps) {
  const form = useForm<ShippingValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: defaultValues || {
      weight: 0,
      dimensions: {
        length: 0,
        width: 0,
        height: 0,
      },
      shippingCost: 0,
      estimatedDelivery: "",
      returnPolicy: "",
    },
  });

  return (
    <div className="w-full  p-6 mx-auto bg-white rounded-lg shadow-md animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Shipping & Delivery
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
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
              name="shippingCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Cost</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseFloat(e.target.value) || 0);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Leave at 0 for free shipping
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Accordion
            defaultValue="dimensions"
            type="single"
            collapsible
            className="w-full"
          >
            <AccordionItem value="dimensions">
              <AccordionTrigger className="text-sm font-medium">
                Product Dimensions (Optional)
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 grid-cols-3 pt-2">
                  <FormField
                    control={form.control}
                    name="dimensions.length"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Length (cm)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="0"
                            placeholder="0.0"
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
                    name="dimensions.width"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Width (cm)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="0"
                            placeholder="0.0"
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
                    name="dimensions.height"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Height (cm)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            min="0"
                            placeholder="0.0"
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
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <FormField
            control={form.control}
            name="estimatedDelivery"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Delivery Time</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 3-5 business days" {...field} />
                </FormControl>
                <FormDescription>
                  Provide an estimate of how long shipping usually takes
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="returnPolicy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Return Policy</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your return policy..."
                    className="min-h-24"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe if returns are allowed and under what conditions
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
