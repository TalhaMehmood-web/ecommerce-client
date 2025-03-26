"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Truck,
  Globe,
  Package,
  DollarSign,
  Archive,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const ProductInventory = () => {
  const [activeTab, setActiveTab] = useState("pricing");

  // Icon mapping with subtle animation states
  const iconMap = {
    pricing: DollarSign,
    restock: Archive,
    shipping: Truck,
    global: Globe,
    attributes: Package,
    advanced: Settings,
  };

  return (
    <motion.div
      className="w-full max-w-7xl mx-auto lg:h-[440px] "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="bg-white/50 backdrop-blur-sm dark:bg-black/20 rounded-xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm overflow-hidden">
        <Tabs
          defaultValue="pricing"
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col lg:flex-row"
        >
          <div className="lg:border-r border-b lg:border-b-0 border-slate-200/70 dark:border-slate-700/30 bg-slate-50/80 dark:bg-slate-900/20">
            <TabsList className="h-auto  w-full grid grid-cols-3 lg:grid-cols-none lg:grid-rows-6 gap-1 bg-transparent">
              {Object.entries(iconMap).map(([key, Icon]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  onClick={() => setActiveTab(key)}
                  className={cn(
                    "flex w-full  gap-3 px-4 py-3 justify-start font-normal hover:bg-white/60 dark:hover:bg-slate-800/60 data-[state=active]:shadow transition-all duration-200",
                    "data-[state=active]:bg-white data-[state=active]:dark:bg-slate-800 data-[state=active]:text-primary",
                    "lg:rounded-none rounded-lg"
                  )}
                >
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{
                      scale: activeTab === key ? [1, 1.2, 1] : 1,
                      color:
                        activeTab === key
                          ? "hsl(var(--primary))"
                          : "currentColor",
                    }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex items-center justify-center rounded-md w-8 h-8",
                      activeTab === key ? "bg-primary/10" : "bg-transparent"
                    )}
                  >
                    <Icon
                      size={18}
                      className={activeTab === key ? "text-primary" : ""}
                    />
                  </motion.div>
                  <span className="text-sm">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="flex-1 p-6 lg:overflow-y-auto lg:h-[440px]">
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
                      <Input placeholder="99.99" className="pl-10" />
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
                      <Input placeholder="79.99" className="pl-10" />
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
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Standard Rate" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">
                            Standard Rate
                          </SelectItem>
                          <SelectItem value="reduced">Reduced Rate</SelectItem>
                          <SelectItem value="zero">Zero Rate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-4">
                      <Label>Price Display Format</Label>
                      <Select>
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
                      <div className="flex items-center justify-between bg-white dark:bg-black/20 p-3 rounded border border-slate-200/80 dark:border-slate-700/20">
                        <span className="text-muted-foreground">
                          Available Units
                        </span>
                        <span className="font-medium">128</span>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-4">
                      <h3 className="text-sm font-medium">Add to Stock</h3>
                      <Input
                        placeholder="Enter quantity"
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
                        placeholder="10"
                        className="bg-white dark:bg-black/20"
                      />
                    </div>
                    <div className="space-y-4">
                      <Label>Stock Status</Label>
                      <Select>
                        <SelectTrigger className="bg-white dark:bg-black/20">
                          <SelectValue placeholder="In Stock" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in-stock">In Stock</SelectItem>
                          <SelectItem value="out-of-stock">
                            Out of Stock
                          </SelectItem>
                          <SelectItem value="backorder">
                            On Backorder
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>

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
                  <h3 className="text-sm font-medium mb-4">
                    Fulfillment Options
                  </h3>

                  <RadioGroup defaultValue="seller" className="space-y-4">
                    <motion.div
                      variants={itemVariants}
                      className="flex items-start space-x-4 p-4 rounded-lg border border-slate-200/80 dark:border-slate-700/20 hover:bg-white/80 dark:hover:bg-black/20 transition-colors"
                    >
                      <RadioGroupItem
                        value="seller"
                        id="seller"
                        className="mt-1"
                      />
                      <div>
                        <Label
                          htmlFor="seller"
                          className="text-base font-medium"
                        >
                          Fulfilled by Seller
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          You'll be responsible for product delivery, handling
                          shipping logistics and customer support.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="flex items-start space-x-4 p-4 rounded-lg border border-blue-200/80 dark:border-blue-700/20 bg-blue-50/50 dark:bg-blue-900/10"
                    >
                      <RadioGroupItem
                        value="phoenix"
                        id="phoenix"
                        className="mt-1"
                      />
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
                          Your product, our responsibility. We handle storage,
                          packing, shipping and delivery support.
                        </p>
                      </div>
                    </motion.div>
                  </RadioGroup>
                </div>

                <motion.div
                  variants={itemVariants}
                  className="p-5 rounded-lg bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200/80 dark:border-slate-700/20"
                >
                  <h3 className="text-sm font-medium mb-4">
                    Package Dimensions
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Width (cm)</Label>
                      <Input
                        placeholder="0.00"
                        className="bg-white dark:bg-black/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Height (cm)</Label>
                      <Input
                        placeholder="0.00"
                        className="bg-white dark:bg-black/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Length (cm)</Label>
                      <Input
                        placeholder="0.00"
                        className="bg-white dark:bg-black/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Weight (kg)</Label>
                      <Input
                        placeholder="0.00"
                        className="bg-white dark:bg-black/20"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>

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
                      <Checkbox
                        id="local-delivery"
                        className="mt-1"
                        defaultChecked
                      />
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
                        <Input
                          placeholder="50"
                          className="bg-white dark:bg-black/20"
                        />
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
                  <h3 className="text-sm font-medium mb-4">
                    Product Attributes
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        name: "Fragile Product",
                        description:
                          "Requires special handling during shipping",
                      },
                      {
                        name: "Biodegradable",
                        description: "Product uses eco-friendly materials",
                      },
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
                      {
                        name: "Handmade",
                        description: "Artisan crafted product",
                      },
                    ].map((attr, index) => (
                      <motion.div
                        key={attr.name}
                        variants={itemVariants}
                        custom={index}
                        className="flex items-start space-x-2 p-3 rounded-lg border border-slate-200/80 dark:border-slate-700/20 hover:bg-white/80 dark:hover:bg-black/20 transition-colors"
                      >
                        <Checkbox id={attr.name} className="mt-1" />
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

                <motion.div
                  variants={itemVariants}
                  className="p-5 rounded-lg bg-slate-50/50 dark:bg-slate-900/10 border border-slate-200/80 dark:border-slate-700/20"
                >
                  <h3 className="text-sm font-medium mb-4">
                    Custom Attributes
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Attribute Name</Label>
                      <Input
                        placeholder="e.g., Material"
                        className="bg-white dark:bg-black/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Attribute Value</Label>
                      <Input
                        placeholder="e.g., Cotton, Polyester"
                        className="bg-white dark:bg-black/20"
                      />
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Package className="h-4 w-4 mr-2" />
                    Add Custom Attribute
                  </Button>
                </motion.div>
              </motion.div>
            </TabsContent>

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
                  <h3 className="text-sm font-medium mb-4">
                    Product Identification
                  </h3>

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
                          {["ISBN", "UPC", "EAN", "JAN", "GTIN", "SKU"].map(
                            (type) => (
                              <SelectItem key={type} value={type.toLowerCase()}>
                                {type}
                              </SelectItem>
                            )
                          )}
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
                  <h3 className="text-sm font-medium mb-4">
                    Inventory Settings
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="track-inventory"
                        className="mt-1"
                        defaultChecked
                      />
                      <div>
                        <Label htmlFor="track-inventory">Track Inventory</Label>
                        <p className="text-xs text-muted-foreground">
                          Automatically update stock levels when orders are
                          placed
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox id="allow-backorders" className="mt-1" />
                      <div>
                        <Label htmlFor="allow-backorders">
                          Allow Backorders
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Allow customers to purchase products that are out of
                          stock
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox id="sold-individually" className="mt-1" />
                      <div>
                        <Label htmlFor="sold-individually">
                          Sold Individually
                        </Label>
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
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default ProductInventory;
