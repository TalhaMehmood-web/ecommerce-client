"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { motion } from "framer-motion";
// Animation variants
import { containerVariants } from "./animation-variants";
import ProductInventoryPricing from "./pricing";
import ProductInventoryRestock from "./restock";
import ProductInventoryShipping from "./shipping";
import ProductInventoryGlobalDelivery from "./global";
import ProductInventoryAttributes from "./attributes";
import ProductInventoryAdvance from "./advance";
import TabList from "./tab-list";

const ProductInventory = () => {
  const [activeTab, setActiveTab] = useState("pricing");

  // Icon mapping with subtle animation states

  return (
    <motion.div
      className=" lg:h-[440px] "
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
          <div className="lg:border-r flex-[0.3] border-b lg:border-b-0 border-slate-200/70 dark:border-slate-700/30 bg-slate-50/80 dark:bg-slate-900/20">
            <TabList activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          {/* product inventiory tabs content widgets */}
          <div className="flex-1 p-6 lg:overflow-y-auto lg:h-[440px]">
            <ProductInventoryPricing />
            <ProductInventoryRestock />
            <ProductInventoryShipping />
            <ProductInventoryGlobalDelivery />
            <ProductInventoryAttributes />
            <ProductInventoryAdvance />
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default ProductInventory;
