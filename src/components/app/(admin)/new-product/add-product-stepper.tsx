import React from "react";
import { cn } from "@/lib/utils";

interface AddProductStepperProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function AddProductStepper({
  steps,
  currentStep,
  onStepClick,
}: AddProductStepperProps) {
  return (
    <div className="w-full max-w-3xl mx-auto my-8">
      <div className="relative flex items-center justify-between">
        {/* Progress bar */}
        <div className="absolute left-0 top-1/2 h-1 bg-gray-200 w-full -translate-y-1/2" />
        <div
          className="absolute left-0 top-1/2 h-1 bg-primary w-full -translate-y-1/2 transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {/* Step circles */}
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "relative flex flex-col items-center group",
              index <= currentStep ? "cursor-pointer" : ""
            )}
            onClick={() => {
              if (onStepClick && index <= currentStep) {
                onStepClick(index);
              }
            }}
          >
            <div
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center transition-all duration-500 z-10",
                index < currentStep
                  ? "bg-primary text-white"
                  : index === currentStep
                  ? "bg-primary text-white animate-pulse"
                  : "bg-gray-200 text-gray-500"
              )}
            >
              {index + 1}
            </div>
            <div
              className={cn(
                "absolute -bottom-7 text-xs font-medium whitespace-nowrap transition-all duration-300",
                index === currentStep
                  ? "opacity-100 text-primary translate-y-0"
                  : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
              )}
            >
              {step}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
