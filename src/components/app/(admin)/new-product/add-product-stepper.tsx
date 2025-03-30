import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
interface AddProductStepperProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  completedSteps?: number[];
}

export function AddProductStepper({
  steps,
  currentStep,
  onStepClick,
  completedSteps = [],
}: AddProductStepperProps) {
  return (
    <div className="w-full  my-8">
      <div className="relative flex items-center justify-between">
        {/* Progress bar */}
        <div className="absolute left-0 top-1/2 h-1 bg-gray-200 w-full -translate-y-1/2" />
        <div
          className="absolute left-0 top-1/2 h-1 bg-primary w-full -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {/* Step circles */}
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isCurrent = index === currentStep;
          const isClickable = index <= currentStep;

          return (
            <div
              key={index}
              className={cn(
                "relative flex flex-col items-center group",
                isClickable ? "cursor-pointer" : ""
              )}
              onClick={() => {
                if (onStepClick && isClickable) {
                  onStepClick(index);
                }
              }}
            >
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-500 z-10",
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isCurrent
                    ? "bg-primary text-white animate-pulse"
                    : "bg-gray-200 text-gray-500"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <div
                className={cn(
                  "absolute -bottom-7 text-xs font-medium whitespace-nowrap transition-all duration-300",
                  isCurrent
                    ? "opacity-100 text-primary translate-y-0"
                    : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                )}
              >
                {step}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
