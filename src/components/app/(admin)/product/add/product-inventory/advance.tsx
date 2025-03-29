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

const ProductInventoryAdvance = () => {
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
              <Select>
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
            <div className="flex items-start space-x-2">
              <Checkbox id="track-inventory" className="mt-1" defaultChecked />
              <div>
                <Label htmlFor="track-inventory">Track Inventory</Label>
                <p className="text-xs text-muted-foreground">
                  Automatically update stock levels when orders are placed
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="allow-backorders" className="mt-1" />
              <div>
                <Label htmlFor="allow-backorders">Allow Backorders</Label>
                <p className="text-xs text-muted-foreground">
                  Allow customers to purchase products that are out of stock
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox id="sold-individually" className="mt-1" />
              <div>
                <Label htmlFor="sold-individually">Sold Individually</Label>
                <p className="text-xs text-muted-foreground">
                  Limit purchases to one item per order
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="pt-4 flex justify-end">
          <Button className="bg-primary text-white hover:bg-primary/90">
            Save Settings
          </Button>
        </div>
      </motion.div>
    </TabsContent>
  );
};

export default ProductInventoryAdvance;
