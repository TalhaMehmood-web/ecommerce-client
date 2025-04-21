"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  shippingInfoSchema,
  type ShippingFormValues,
  countries,
} from "@/types/shipping-info";
import { formVariants, inputVariants, buttonVariants } from "./animations";
import { toast } from "sonner";
import axiosInstance from "@/config/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiLoader from "@/components/shared/loading/api-loader";
import { API_ENDPOINTS } from "@/utils/endpoints";

interface ShippingFormProps {
  initialData?: ShippingFormValues;
  isEditMode?: boolean;
}

export function ShippingInfoForm({
  initialData,
  isEditMode = false,
}: ShippingFormProps) {
  const queryClient = useQueryClient();
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingInfoSchema),
    defaultValues: initialData || {
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      isDefault: false,
    },
  });
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData: ShippingFormValues) => {
      const response = await axiosInstance.post(
        API_ENDPOINTS.SHIPPING_INFO.CREATE,
        formData
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.statusCode === 201) {
        toast.success(data?.message || "Shipping address saved successfully!");
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["shipping-info"] });
      }
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    },
  });

  const handleSubmit = async (data: ShippingFormValues) => {
    await mutateAsync(data);
  };

  return (
    <React.Fragment>
      <ApiLoader isLoading={isPending} message="Saving Your Shipping Address" />
      <Card className="shadow-none border-none bg-transparent pb-0">
        <CardHeader>
          <CardTitle className="text-2xl">
            {isEditMode ? "Edit Shipping Address" : "Add Shipping Address"}
          </CardTitle>
          <CardDescription>
            Enter your shipping information below
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <motion.form
              onSubmit={form.handleSubmit(handleSubmit)}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <motion.div variants={inputVariants}>
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Phone */}
                <motion.div variants={inputVariants}>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Address Line 1 */}
                <motion.div variants={inputVariants} className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="addressLine1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Address Line 2 */}
                <motion.div variants={inputVariants} className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="addressLine2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line 2 (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Apt 4B, Floor 3, etc."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* City */}
                <motion.div variants={inputVariants}>
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="New York" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* State */}
                <motion.div variants={inputVariants}>
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Province (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="NY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Country */}
                <motion.div variants={inputVariants}>
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-80">
                            {countries.map((country) => (
                              <SelectItem
                                key={country.value}
                                value={country.value}
                              >
                                {country.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Postal Code */}
                <motion.div variants={inputVariants}>
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="10001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                {/* Is Default */}
                <motion.div variants={inputVariants} className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="isDefault"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="cursor-pointer">
                            Set as default shipping address
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </motion.div>
              </div>

              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <div className="flex justify-end mt-4">
                  <Button className="w-fit" type="submit">
                    {isPending
                      ? "Saving..."
                      : isEditMode
                      ? "Update Address"
                      : "Save Address"}
                  </Button>
                </div>
              </motion.div>
            </motion.form>
          </Form>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}
