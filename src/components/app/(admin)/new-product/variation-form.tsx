"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { variationsSchema, VariationsValues } from "@/lib/schema/add-product";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface VariationsFormProps {
  defaultValues?: VariationsValues;
  onSubmit: (values: VariationsValues) => void;
  onBack: () => void;
}

export function VariationsForm({
  defaultValues,
  onSubmit,
  onBack,
}: VariationsFormProps) {
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("#000000");

  const form = useForm<VariationsValues>({
    resolver: zodResolver(variationsSchema),
    defaultValues: defaultValues || {
      sizeOptions: [],
      colorVariants: [],
      materialType: [],
      customizations: "",
    },
  });

  const handleAddSize = () => {
    if (size && !form.getValues().sizeOptions?.includes(size)) {
      form.setValue("sizeOptions", [
        ...(form.getValues().sizeOptions || []),
        size,
      ]);
      setSize("");
    }
  };

  const handleRemoveSize = (sizeToRemove: string) => {
    form.setValue(
      "sizeOptions",
      (form.getValues().sizeOptions || []).filter(
        (s: any) => s !== sizeToRemove
      )
    );
  };

  const handleAddMaterial = () => {
    if (material && !form.getValues().materialType?.includes(material)) {
      form.setValue("materialType", [
        ...(form.getValues().materialType || []),
        material,
      ]);
      setMaterial("");
    }
  };

  const handleRemoveMaterial = (materialToRemove: string) => {
    form.setValue(
      "materialType",
      (form.getValues().materialType || []).filter(
        (m: any) => m !== materialToRemove
      )
    );
  };

  const handleAddColor = () => {
    if (colorName && colorHex) {
      const newColor = { name: colorName, hex: colorHex };
      const colorExists = (form.getValues().colorVariants || []).some(
        (c) => c.name === colorName || c.hex === colorHex
      );

      if (!colorExists) {
        form.setValue("colorVariants", [
          ...(form.getValues().colorVariants || []),
          newColor,
        ]);
        setColorName("");
        setColorHex("#000000");
      }
    }
  };

  const handleRemoveColor = (index: number) => {
    const newColors = [...(form.getValues().colorVariants || [])];
    newColors.splice(index, 1);
    form.setValue("colorVariants", newColors);
  };

  return (
    <div className="w-full  p-6 mx-auto bg-white rounded-lg shadow-md animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Variations & Customizations
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Size Options */}
          <div className="space-y-3">
            <FormLabel>Size Options</FormLabel>
            <div className="flex flex-wrap gap-2 mb-2">
              {(form.getValues().sizeOptions || []).map((size: any) => (
                <Badge key={size} variant="secondary" className="px-3 py-1">
                  {size}
                  <button
                    type="button"
                    onClick={() => handleRemoveSize(size)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {(form.getValues().sizeOptions || []).length === 0 && (
                <p className="text-sm text-gray-500 italic">No sizes added</p>
              )}
            </div>
            <div className="flex space-x-2">
              <Input
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="Add a size (e.g., S, M, L, XL)"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSize();
                  }
                }}
              />
              <Button type="button" size="sm" onClick={handleAddSize}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            <FormDescription>
              Add all available sizes for this product
            </FormDescription>
          </div>

          {/* Color Variants */}
          <div className="space-y-3">
            <FormLabel>Color Variants</FormLabel>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 mb-2">
              {(form.getValues().colorVariants || []).map(
                (color: any, index: any) => (
                  <div
                    key={index}
                    className="flex items-center p-2 border rounded-md group hover:border-gray-400 transition-colors animate-scale-in"
                  >
                    <div
                      className="w-6 h-6 rounded-full mr-2"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-sm flex-grow truncate">
                      {color.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveColor(index)}
                      className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-700 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )
              )}
            </div>
            {(form.getValues().colorVariants || []).length === 0 && (
              <p className="text-sm text-gray-500 italic mb-2">
                No colors added
              </p>
            )}
            <div className="grid gap-2 sm:grid-cols-2">
              <Input
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
                placeholder="Color name (e.g., Ruby Red)"
              />
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={colorHex}
                  onChange={(e) => setColorHex(e.target.value)}
                  className="w-12 p-1 h-9"
                />
                <Input
                  value={colorHex}
                  onChange={(e) => setColorHex(e.target.value)}
                  placeholder="#HEX"
                  className="flex-grow"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="button" size="sm" onClick={handleAddColor}>
                <Plus className="h-4 w-4 mr-1" /> Add Color
              </Button>
            </div>
          </div>

          {/* Material Types */}
          <div className="space-y-3">
            <FormLabel>Material Types</FormLabel>
            <div className="flex flex-wrap gap-2 mb-2">
              {(form.getValues().materialType || []).map((material: any) => (
                <Badge key={material} variant="secondary" className="px-3 py-1">
                  {material}
                  <button
                    type="button"
                    onClick={() => handleRemoveMaterial(material)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {(form.getValues().materialType || []).length === 0 && (
                <p className="text-sm text-gray-500 italic">
                  No materials added
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <Input
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="Add a material (e.g., Cotton, Leather)"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddMaterial();
                  }
                }}
              />
              <Button type="button" size="sm" onClick={handleAddMaterial}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>

          {/* Customizations */}
          <FormField
            control={form.control}
            name="customizations"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Customizations</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe any customizations available (e.g., engraving, monograms)"
                    className="min-h-24"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Optional: Describe if users can customize aspects of the
                  product
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" className="animate-float">
              Next Step
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
