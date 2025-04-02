import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PricingTierProps } from "@/types/verify";

export const PricingTier = ({
  name,
  price,
  description,
  features,
  highlighted = false,
  onSelect,
  selected,
}: PricingTierProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "relative flex h-full flex-col rounded-lg border p-6 shadow-sm transition-all",
        highlighted ? "border-primary" : "border-border",
        selected ? "ring-2 ring-primary ring-offset-2" : ""
      )}
    >
      {highlighted && (
        <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Popular
        </div>
      )}

      <div className="mb-5 space-y-2">
        <h3 className="text-xl font-bold">{name}</h3>
        <div className="flex items-baseline text-3xl font-extrabold">
          {price}
          <span className="ml-1 text-sm font-medium text-muted-foreground">
            /month
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <ul className="mb-6 grow space-y-2 text-sm">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          selected
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : highlighted
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
        )}
      >
        {selected ? "Selected" : "Select Plan"}
      </button>
    </motion.div>
  );
};
