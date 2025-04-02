"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { inventorySchema, InventoryValues } from "@/lib/schema/add-product";
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
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface InventoryFormProps {
  defaultValues?: InventoryValues;
  onSubmit: (values: InventoryValues) => void;
  onBack: () => void;
}

export function InventoryForm({
  defaultValues,
  onSubmit,
  onBack,
}: InventoryFormProps) {
  const form = useForm<InventoryValues>({
    resolver: zodResolver(inventorySchema),
    defaultValues: defaultValues || {
      stockQuantity: 0,
      stockStatus: "In Stock",
      minOrderQuantity: 1,
      maxOrderQuantity: 10,
    },
  });

  const stockQuantity = form.watch("stockQuantity");

  React.useEffect(() => {
    if (stockQuantity === 0) {
      form.setValue("stockStatus", "Out of Stock");
    } else if (stockQuantity <= 5) {
      form.setValue("stockStatus", "Low Stock");
    } else {
      form.setValue("stockStatus", "In Stock");
    }
  }, [stockQuantity, form]);

  return (
    <div className="w-full  p-6 mx-auto bg-white rounded-lg shadow-md animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Inventory & Stock Management
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="stockQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="0"
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value, 10) || 0);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Number of items available in inventory
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stockStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                      className="flex flex-col space-y-1 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="In Stock" id="in-stock" />
                        <Label
                          htmlFor="in-stock"
                          className="text-green-600 font-medium"
                        >
                          In Stock
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Low Stock" id="low-stock" />
                        <Label
                          htmlFor="low-stock"
                          className="text-amber-600 font-medium"
                        >
                          Low Stock
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="Out of Stock"
                          id="out-of-stock"
                        />
                        <Label
                          htmlFor="out-of-stock"
                          className="text-red-600 font-medium"
                        >
                          Out of Stock
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Auto-updated based on stock quantity (can be manually
                    overridden)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="minOrderQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Order Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder="1"
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value, 10) || 1);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum quantity a customer must purchase
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxOrderQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Order Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      placeholder="10"
                      {...field}
                      onChange={(e) => {
                        field.onChange(parseInt(e.target.value, 10) || 10);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Maximum quantity a customer can purchase in a single order
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-6">
            <h3 className="font-medium text-blue-800 mb-2">
              Inventory Summary
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-600">Total Stock:</div>
              <div className="text-sm font-medium">
                {form.getValues().stockQuantity} units
              </div>
              <div className="text-sm text-gray-600">Status:</div>
              <div
                className={`text-sm font-medium ${
                  form.getValues().stockStatus === "In Stock"
                    ? "text-green-600"
                    : form.getValues().stockStatus === "Low Stock"
                    ? "text-amber-600"
                    : "text-red-600"
                }`}
              >
                {form.getValues().stockStatus}
              </div>
              <div className="text-sm text-gray-600">Order Limits:</div>
              <div className="text-sm font-medium">
                Min: {form.getValues().minOrderQuantity}, Max:{" "}
                {form.getValues().maxOrderQuantity}
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
