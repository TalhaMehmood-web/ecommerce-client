import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import {
  Truck,
  Globe,
  Package,
  DollarSign,
  Archive,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
const iconMap = {
  pricing: DollarSign,
  restock: Archive,
  shipping: Truck,
  global: Globe,
  attributes: Package,
  advanced: Settings,
};

export interface TabListProps {
  activeTab?: string;
  setActiveTab?: (key: string) => void;
}

const TabList: React.FC<TabListProps> = ({ activeTab, setActiveTab }) => {
  return (
    <TabsList className="h-auto flex-1 lg:flex lg:flex-col    w-full grid grid-cols-3 lg:grid-cols-none lg:grid-rows-6 gap-1 bg-transparent">
      {Object.entries(iconMap).map(([key, Icon]) => (
        <TabsTrigger
          key={key}
          value={key}
          onClick={() => setActiveTab?.(key)}
          className={cn(
            "flex w-full cursor-pointer  justify-start flex-1 gap-3 px-4 py-3 font-normal hover:bg-green-50 dark:hover:bg-slate-800/60 data-[state=active]:shadow transition-all duration-200",
            "data-[state=active]:bg-white data-[state=active]:dark:bg-slate-800 data-[state=active]:text-primary",
            "lg:rounded-none rounded-lg"
          )}
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={{
              scale: activeTab === key ? [1, 1.2, 1] : 1,
              color: activeTab === key ? "hsl(var(--primary))" : "currentColor",
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
  );
};

export default TabList;
