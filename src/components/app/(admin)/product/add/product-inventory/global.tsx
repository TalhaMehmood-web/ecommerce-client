"use client";
import { TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { fadeIn, itemVariants } from "./animation-variants";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const ProductInventoryGlobalDelivery = () => {
  return (
    <TabsContent
      value="global"
      className="mt-0 focus-visible:outline-none focus-visible:ring-0"
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div className="p-5 rounded-lg bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100/80 dark:border-purple-700/20">
          <div className="flex items-center mb-4">
            <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
            <h3 className="text-sm font-medium text-purple-800 dark:text-purple-300">
              Worldwide Delivery
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Available only with shipping method:{" "}
            <span className="font-medium">Fulfilled by Phoenix</span>
          </p>

          <motion.div variants={itemVariants} className="space-y-4">
            <Label>Selected Countries</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/70" />
              <Input
                placeholder="Type country names..."
                className="pl-10 bg-white dark:bg-black/20"
              />
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {[
                "United States",
                "Canada",
                "United Kingdom",
                "Germany",
                "France",
              ].map((country) => (
                <span
                  key={country}
                  className="px-2 py-1 text-xs rounded-full bg-white dark:bg-black/20 border border-purple-200 dark:border-purple-700/40 text-purple-800 dark:text-purple-300 flex items-center"
                >
                  {country}
                  <button className="ml-1 text-purple-500 hover:text-purple-700 dark:text-purple-400">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="p-5 rounded-lg bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200/80 dark:border-slate-700/20"
        >
          <h3 className="text-sm font-medium mb-4">Local Delivery</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox id="local-delivery" className="mt-1" defaultChecked />
              <div>
                <Label htmlFor="local-delivery" className="text-base">
                  Enable Local Delivery
                </Label>
                <p className="text-sm text-muted-foreground">
                  Deliver to your country of residence.{" "}
                  <a href="#" className="text-primary underline">
                    Change profile address
                  </a>
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label className="text-xs">Delivery Radius (km)</Label>
                <Input placeholder="50" className="bg-white dark:bg-black/20" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Local Delivery Fee</Label>
                <Input
                  placeholder="5.00"
                  className="bg-white dark:bg-black/20"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </TabsContent>
  );
};

export default ProductInventoryGlobalDelivery;
