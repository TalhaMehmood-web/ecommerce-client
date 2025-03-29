"use client";

import { TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { fadeIn, itemVariants } from "./animation-variants";
import { DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

const ProductInventoryPricing = () => {
  const methods = useFormContext();
  const { register, setValue, watch } = methods;
  const { taxClass, displayFormat } = watch("inventory.pricing");

  return (
    <TabsContent
      value="pricing"
      className="mt-0 focus-visible:outline-none focus-visible:ring-0"
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            variants={itemVariants}
            className="space-y-4 p-5 rounded-lg bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100/80 dark:border-blue-700/20"
          >
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
              Regular Price
            </h3>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/70" />
              <Input
                {...register("inventory.pricing.regularPrice")}
                placeholder="99.99"
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Set your standard product price before any discounts
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="space-y-4 p-5 rounded-lg bg-green-50/50 dark:bg-green-900/10 border border-green-100/80 dark:border-green-700/20"
          >
            <h3 className="text-sm font-medium text-green-800 dark:text-green-300">
              Sale Price
            </h3>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/70" />
              <Input
                {...register("inventory.pricing.salesPrice")}
                placeholder="79.99"
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Promotional price when running special offers
            </p>
          </motion.div>
        </div>

        <div className="p-5 rounded-lg bg-slate-50/50 dark:bg-slate-900/10 border border-slate-100/80 dark:border-slate-700/20">
          <h3 className="text-sm font-medium mb-4">Advanced Pricing</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label>Tax Class</Label>
              <Select
                value={taxClass}
                onValueChange={(value) =>
                  setValue("inventory.pricing.taxClass", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Standard Rate" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Rate</SelectItem>
                  <SelectItem value="reduced">Reduced Rate</SelectItem>
                  <SelectItem value="zero">Zero Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-4">
              <Label>Price Display Format</Label>
              <Select
                value={displayFormat}
                onValueChange={(value) =>
                  setValue("inventory.pricing.displayFormat", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="$99.99" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">$99.99</SelectItem>
                  <SelectItem value="eur">€99.99</SelectItem>
                  <SelectItem value="gbp">£99.99</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </motion.div>
    </TabsContent>
  );
};

export default ProductInventoryPricing;
