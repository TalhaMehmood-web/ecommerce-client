import { Check, Circle } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FormStepperProps } from "@/types/verify";

export const FormStepper = ({ steps, currentStep }: FormStepperProps) => {
  return (
    <div className="w-full pb-8 pt-2">
      <div className="relative flex justify-between">
        {steps.map((step, i) => {
          const isCompleted = i < currentStep;
          const isCurrent = i === currentStep;

          return (
            <div key={i} className="relative flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.2, duration: 0.3 }}
                className={cn(
                  "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCurrent
                    ? "border-primary bg-background text-primary"
                    : "border-muted-foreground bg-background text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span>{i + 1}</span>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 + 0.1, duration: 0.3 }}
                className="mt-2 max-w-[100px] text-center text-sm font-medium"
              >
                <p
                  className={cn(
                    isCompleted || isCurrent
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.label}
                </p>
              </motion.div>
            </div>
          );
        })}

        <div className="absolute left-0 top-5 -z-10 h-0.5 w-full">
          <div className="h-full w-full bg-muted">
            <motion.div
              initial={{ width: "0%" }}
              animate={{
                width: `${(currentStep / (steps.length - 1)) * 100}%`,
              }}
              transition={{ duration: 0.4 }}
              className="h-full bg-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
