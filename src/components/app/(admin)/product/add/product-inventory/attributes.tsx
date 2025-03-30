"use client";

import { TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { fadeIn, itemVariants } from "./animation-variants";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";

const attributes = [
  {
    name: "Fragile Product",
    description: "Requires special handling during shipping",
  },
  { name: "Biodegradable", description: "Product uses eco-friendly materials" },
  {
    name: "Frozen Product",
    description: "Requires refrigeration during shipping",
  },
  {
    name: "Max. allowed Temperature",
    description: "Special temperature requirements",
  },
  {
    name: "Expiry Date of Product",
    description: "Product has limited shelf life",
  },
  { name: "Handmade", description: "Artisan crafted product" },
];

const ProductInventoryAttributes = () => {
  const { watch, setValue } = useFormContext();
  const selectedAttributes = watch("inventory.attribute") || [];

  const handleSelectAttribute = (attribute: string, isChecked: boolean) => {
    const updatedAttributes = isChecked
      ? [...selectedAttributes, attribute]
      : selectedAttributes.filter((attr: string) => attr !== attribute);

    setValue("inventory.attribute", updatedAttributes, {
      shouldValidate: true,
    }); // Update form
  };

  return (
    <TabsContent
      value="attributes"
      className="mt-0 focus-visible:outline-none focus-visible:ring-0"
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div className="p-5 rounded-lg bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200/80 dark:border-slate-700/20">
          <h3 className="text-sm font-medium mb-4">Product Attributes</h3>

          <div className="grid md:grid-cols-2 gap-4">
            {attributes.map((attr, index) => (
              <motion.div
                key={attr.name}
                variants={itemVariants}
                custom={index}
                className="flex items-start space-x-2 p-3 rounded-lg border border-slate-200/80 dark:border-slate-700/20 hover:bg-white/80 dark:hover:bg-black/20 transition-colors"
              >
                <Checkbox
                  id={attr.name}
                  checked={selectedAttributes.includes(attr.name)}
                  onCheckedChange={(checked) =>
                    handleSelectAttribute(attr.name, Boolean(checked))
                  }
                  className="mt-1"
                />

                <div>
                  <Label htmlFor={attr.name} className="font-medium">
                    {attr.name}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    {attr.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </TabsContent>
  );
};

export default ProductInventoryAttributes;
