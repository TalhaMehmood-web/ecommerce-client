"use client";
import { TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { fadeIn, itemVariants } from "./animation-variants";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ProductInventoryShipping = () => {
  return (
    <TabsContent
      value="shipping"
      className="mt-0 focus-visible:outline-none focus-visible:ring-0"
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div className="p-5 rounded-lg bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200/80 dark:border-slate-700/20">
          <h3 className="text-sm font-medium mb-4">Fulfillment Options</h3>

          <RadioGroup defaultValue="seller" className="space-y-4">
            <motion.div
              variants={itemVariants}
              className="flex items-start space-x-4 p-4 rounded-lg border border-slate-200/80 dark:border-slate-700/20 hover:bg-white/80 dark:hover:bg-black/20 transition-colors"
            >
              <RadioGroupItem value="seller" id="seller" className="mt-1" />
              <div>
                <Label htmlFor="seller" className="text-base font-medium">
                  Fulfilled by Seller
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  You'll be responsible for product delivery, handling shipping
                  logistics and customer support.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-start space-x-4 p-4 rounded-lg border border-blue-200/80 dark:border-blue-700/20 bg-blue-50/50 dark:bg-blue-900/10"
            >
              <RadioGroupItem value="phoenix" id="phoenix" className="mt-1" />
              <div>
                <div className="flex items-center">
                  <Label
                    htmlFor="phoenix"
                    className="text-base font-medium text-blue-800 dark:text-blue-300"
                  >
                    Fulfilled by Phoenix
                  </Label>
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-800/40 text-blue-800 dark:text-blue-300">
                    Recommended
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Your product, our responsibility. We handle storage, packing,
                  shipping and delivery support.
                </p>
              </div>
            </motion.div>
          </RadioGroup>
        </div>

        <motion.div
          variants={itemVariants}
          className="p-5 rounded-lg bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200/80 dark:border-slate-700/20"
        >
          <h3 className="text-sm font-medium mb-4">Package Dimensions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-xs">Width (cm)</Label>
              <Input placeholder="0.00" className="bg-white dark:bg-black/20" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Height (cm)</Label>
              <Input placeholder="0.00" className="bg-white dark:bg-black/20" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Length (cm)</Label>
              <Input placeholder="0.00" className="bg-white dark:bg-black/20" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Weight (kg)</Label>
              <Input placeholder="0.00" className="bg-white dark:bg-black/20" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </TabsContent>
  );
};

export default ProductInventoryShipping;
