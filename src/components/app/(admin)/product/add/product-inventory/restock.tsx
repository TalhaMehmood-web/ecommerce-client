"use client";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { fadeIn, itemVariants } from "./animation-variants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductInventoryRestock = () => {
  const { register, watch, setValue } = useFormContext();
  const { status } = watch("inventory.restock");

  return (
    <TabsContent
      value="restock"
      className="mt-0 focus-visible:outline-none focus-visible:ring-0"
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div className="p-5 rounded-lg bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200/80 dark:border-slate-700/20">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-sm font-medium">Current Stock</h3>
              <Input
                {...register("inventory.restock.currentStock")}
                type="number"
                placeholder="Available Units"
                className="bg-white dark:bg-black/20"
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={itemVariants}
          className="p-5 rounded-lg bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200/80 dark:border-slate-700/20"
        >
          <h3 className="text-sm font-medium mb-4">Stock Management</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label>Low Stock Threshold</Label>
              <Input
                type="number"
                placeholder="10"
                className="bg-white dark:bg-black/20"
                {...register("inventory.restock.threshold")}
              />
            </div>
            <div className="space-y-4">
              <Label>Stock Status</Label>
              <Select
                value={status}
                onValueChange={(value) =>
                  setValue("inventory.restock.status", value)
                }
              >
                <SelectTrigger className="bg-white dark:bg-black/20">
                  <SelectValue placeholder="In Stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-stock">In Stock</SelectItem>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  <SelectItem value="backorder">On Backorder</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </TabsContent>
  );
};

export default ProductInventoryRestock;
