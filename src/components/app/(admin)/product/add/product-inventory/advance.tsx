"use client";
import { TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { fadeIn, itemVariants } from "./animation-variants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

const ProductInventoryAdvance = () => {
  const { watch, setValue, register } = useFormContext();
  const idType = watch("inventory.advance.identification.idType");
  const selectedSetting = watch("inventory.advance.inventorySettings");

  const handleSelectSetting = (setting: string) => {
    setValue(
      "inventory.advance.inventorySettings",
      selectedSetting === setting ? "" : setting
    );
  };

  return (
    <TabsContent
      value="advanced"
      className="mt-0 focus-visible:outline-none focus-visible:ring-0"
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div className="p-5 rounded-lg bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200/80 dark:border-slate-700/20">
          <h3 className="text-sm font-medium mb-4">Product Identification</h3>

          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-2 gap-6"
          >
            <div className="space-y-4">
              <Label>Product ID Type</Label>
              <Select
                value={idType}
                onValueChange={(value) =>
                  setValue("inventory.advance.identification.idType", value)
                }
              >
                <SelectTrigger className="bg-white dark:bg-black/20">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {["ISBN", "UPC", "EAN", "JAN", "GTIN", "SKU"].map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Product ID</Label>
              <Input
                {...register("inventory.advance.identification.productId")}
                placeholder="Enter product ID"
                className="bg-white dark:bg-black/20"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="p-5 rounded-lg bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200/80 dark:border-slate-700/20"
        >
          <h3 className="text-sm font-medium mb-4">Inventory Settings</h3>

          <div className="space-y-4">
            {[
              {
                id: "track-inventory",
                name: "Track Inventory",
                description:
                  "Automatically update stock levels when orders are placed",
              },
              {
                id: "allow-backorders",
                name: "Allow Backorders",
                description:
                  "Allow customers to purchase products that are out of stock",
              },
              {
                id: "sold-individually",
                name: "Sold Individually",
                description: "Limit purchases to one item per order",
              },
            ].map((setting) => (
              <div key={setting.id} className="flex items-start space-x-2">
                <Checkbox
                  id={setting.id}
                  checked={selectedSetting === setting.id}
                  onCheckedChange={() => handleSelectSetting(setting.id)}
                  className="mt-1"
                />
                <div>
                  <Label htmlFor={setting.id}>{setting.name}</Label>
                  <p className="text-xs text-muted-foreground">
                    {setting.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </TabsContent>
  );
};

export default ProductInventoryAdvance;
