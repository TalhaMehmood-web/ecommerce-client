"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";

interface FilterFormValues {
  search: string;
  vendor: string;
  category: string;
  publishedOn?: Date;
}

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const ProductsListFilters = () => {
  const { register, handleSubmit, control, reset } =
    useForm<FilterFormValues>();

  const onSubmit = (data: FilterFormValues) => {
    console.log("Filters Applied:", data);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className=" rounded-lg grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-8"
    >
      {/* Search Input */}
      <Input
        {...register("search")}
        placeholder="Search product..."
        className="col-span-3 h-10"
      />

      {/* Vendor Select */}
      <div className="flex items-center col-span-3 h-10 ">
        <Controller
          name="vendor"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full h-10 rounded-r-none">
                <SelectValue placeholder="Select Vendor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vendor1">Vendor 1</SelectItem>
                <SelectItem value="vendor2">Vendor 2</SelectItem>
                <SelectItem value="vendor3">Vendor 3</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        {/* Category Select */}
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-full h-10 rounded-l-none  ">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="home">Home & Living</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Start Date Filter */}
      <Controller
        name="publishedOn"
        control={control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger className="w-full col-span-2" asChild>
              <Button variant="outline" className="w-full flex justify-between">
                {field.value ? format(field.value, "PPP") : "Start Date"}
                <CalendarIcon className="h-4 w-4 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full col-span-2 p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
              />
            </PopoverContent>
          </Popover>
        )}
      />

      {/* Action Buttons */}
      <div className="flex gap-2 col-span-full justify-end">
        <Button variant="outline" onClick={() => reset()}>
          Reset
        </Button>
        <Button onClick={handleSubmit(onSubmit)}>Apply</Button>
      </div>
    </motion.div>
  );
};

export default ProductsListFilters;
