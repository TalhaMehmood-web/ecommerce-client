"use client";
import React, { useState } from "react";
import { ProductFormValues } from "@/lib/schema/add-product";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ReviewFormProps {
  values: ProductFormValues;
  onSubmit: () => void;
  onBack: () => void;
  onEdit?: any;
}

export function ReviewForm({
  values,
  onSubmit,
  onBack,
  onEdit,
}: ReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Product successfully added!", {
        description: "Your product has been created and is now live.",
      });
      setIsSubmitting(false);
      onSubmit();
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Review Your Product
        </h2>
        <p className="text-gray-600">
          Please review all information before submitting your product
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Card className="overflow-hidden">
            <CardHeader className="pb-0">
              <CardTitle>Product Preview</CardTitle>
              <CardDescription>
                How your product might appear to customers
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {values.images.productImages.length > 0 && (
                <div className="relative mb-4 rounded-md overflow-hidden">
                  <AspectRatio ratio={1}>
                    <img
                      src={values.images.productImages[0]}
                      alt={
                        values.images.altTexts?.[0] ||
                        values.basicInfo.productName
                      }
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                  {values.images.productImages.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md">
                      +{values.images.productImages.length - 1} more
                    </div>
                  )}
                </div>
              )}
              <h3 className="font-bold text-lg">
                {values.basicInfo.productName}
              </h3>

              <div className="flex items-center gap-2 mt-1 mb-2">
                <span className="text-lg font-bold">
                  {values.pricing.currency}{" "}
                  {values.pricing.discountedPrice || values.pricing.basePrice}
                </span>
                {values.pricing.discountedPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    {values.pricing.currency} {values.pricing.basePrice}
                  </span>
                )}
                {values.pricing.discountPercentage &&
                  values.pricing.discountPercentage > 0 && (
                    <Badge variant="destructive" className="ml-auto">
                      {values.pricing.discountPercentage}% OFF
                    </Badge>
                  )}
              </div>
              {/* 
              <p className="text-gray-500 text-sm line-clamp-3 mb-3">
                {values.basicInfo.productDescription}
              </p> */}

              <div className="flex flex-wrap gap-1 mb-3">
                {values.variations.colorVariants &&
                  values.variations.colorVariants.length > 0 && (
                    <div className="flex items-center gap-1 mr-4">
                      <span className="text-xs text-gray-500">Colors:</span>
                      <div className="flex -space-x-1">
                        {values.variations.colorVariants
                          .slice(0, 3)
                          .map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-gray-200"
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                            />
                          ))}
                        {values.variations.colorVariants.length > 3 && (
                          <div className="w-4 h-4 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center text-[10px] text-gray-500">
                            +{values.variations.colorVariants.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                {values.variations.sizeOptions &&
                  values.variations.sizeOptions.length > 0 && (
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500">Sizes:</span>
                      <div className="flex gap-1">
                        {values.variations.sizeOptions
                          .slice(0, 3)
                          .map((size, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs py-0 h-5"
                            >
                              {size}
                            </Badge>
                          ))}
                        {values.variations.sizeOptions.length > 3 && (
                          <Badge variant="outline" className="text-xs py-0 h-5">
                            +{values.variations.sizeOptions.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
              </div>

              <div className="text-xs text-gray-500 flex items-center mt-2">
                <span
                  className={`mr-2 ${
                    values.inventory.stockStatus === "In Stock"
                      ? "text-green-600"
                      : values.inventory.stockStatus === "Low Stock"
                      ? "text-amber-600"
                      : "text-red-600"
                  }`}
                >
                  {values.inventory.stockStatus}
                </span>
                <span className="mr-2">•</span>
                <span>{values.shipping.estimatedDelivery}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Accordion
            type="single"
            collapsible
            defaultValue="basicInfo"
            className="w-full"
          >
            <AccordionItem
              value="basicInfo"
              className="border rounded-md px-4 mb-2 animate-bounce-in"
              style={{ animationDelay: "0ms" }}
            >
              <AccordionTrigger className="py-3">
                <div className="flex items-center text-left">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <h3 className="font-medium">Basic Information</h3>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <dl className="space-y-2 text-sm">
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="text-gray-500">Name:</dt>
                    <dd className="col-span-2 font-medium">
                      {values.basicInfo.productName}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="text-gray-500">Category:</dt>
                    <dd className="col-span-2">
                      {values.basicInfo.category}
                      {values.basicInfo.subcategory
                        ? ` > ${values.basicInfo.subcategory}`
                        : ""}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="text-gray-500">Brand:</dt>
                    <dd className="col-span-2">{values.basicInfo.brand}</dd>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="text-gray-500">SKU:</dt>
                    <dd className="col-span-2">{values.basicInfo.sku}</dd>
                  </div>
                </dl>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit("basicInfo")}
                  className="mt-2"
                >
                  Edit
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="pricing"
              className="border rounded-md px-4 mb-2 animate-bounce-in"
              style={{ animationDelay: "50ms" }}
            >
              <AccordionTrigger className="py-3">
                <div className="flex items-center text-left">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <h3 className="font-medium">Pricing</h3>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <dl className="space-y-2 text-sm">
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="text-gray-500">Base Price:</dt>
                    <dd className="col-span-2">
                      {values.pricing.currency} {values.pricing.basePrice}
                    </dd>
                  </div>
                  {values.pricing.discountedPrice && (
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-gray-500">Discounted Price:</dt>
                      <dd className="col-span-2">
                        {values.pricing.currency}{" "}
                        {values.pricing.discountedPrice}
                      </dd>
                    </div>
                  )}
                  {values.pricing.discountPercentage &&
                    values.pricing.discountPercentage > 0 && (
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-gray-500">Discount:</dt>
                        <dd className="col-span-2">
                          {values.pricing.discountPercentage}%
                        </dd>
                      </div>
                    )}
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="text-gray-500">Tax Rate:</dt>
                    <dd className="col-span-2">{values.pricing.taxRate}%</dd>
                  </div>
                </dl>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit("pricing")}
                  className="mt-2"
                >
                  Edit
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="inventory"
              className="border rounded-md px-4 mb-2 animate-bounce-in"
              style={{ animationDelay: "100ms" }}
            >
              <AccordionTrigger className="py-3">
                <div className="flex items-center text-left">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <h3 className="font-medium">Inventory</h3>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <dl className="space-y-2 text-sm">
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="text-gray-500">Stock:</dt>
                    <dd className="col-span-2">
                      {values.inventory.stockQuantity} units
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="text-gray-500">Status:</dt>
                    <dd
                      className={`col-span-2 ${
                        values.inventory.stockStatus === "In Stock"
                          ? "text-green-600"
                          : values.inventory.stockStatus === "Low Stock"
                          ? "text-amber-600"
                          : "text-red-600"
                      }`}
                    >
                      {values.inventory.stockStatus}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="text-gray-500">Order Limits:</dt>
                    <dd className="col-span-2">
                      Min: {values.inventory.minOrderQuantity}, Max:{" "}
                      {values.inventory.maxOrderQuantity}
                    </dd>
                  </div>
                </dl>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit("inventory")}
                  className="mt-2"
                >
                  Edit
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="shipping"
              className="border rounded-md px-4 mb-2 animate-bounce-in"
              style={{ animationDelay: "150ms" }}
            >
              <AccordionTrigger className="py-3">
                <div className="flex items-center text-left">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <h3 className="font-medium">Shipping</h3>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <dl className="space-y-2 text-sm">
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="text-gray-500">Weight:</dt>
                    <dd className="col-span-2">{values.shipping.weight} kg</dd>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="text-gray-500">Shipping Cost:</dt>
                    <dd className="col-span-2">
                      {values.shipping.shippingCost > 0
                        ? `$${values.shipping.shippingCost.toFixed(2)}`
                        : "Free shipping"}
                    </dd>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="text-gray-500">Delivery Time:</dt>
                    <dd className="col-span-2">
                      {values.shipping.estimatedDelivery}
                    </dd>
                  </div>
                </dl>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit("shipping")}
                  className="mt-2"
                >
                  Edit
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="images"
              className="border rounded-md px-4 mb-2 animate-bounce-in"
              style={{ animationDelay: "200ms" }}
            >
              <AccordionTrigger className="py-3">
                <div className="flex items-center text-left">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <h3 className="font-medium">Images & Media</h3>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="text-sm">
                  <p>{values.images.productImages.length} images uploaded</p>
                  {values.images.productVideos &&
                    values.images.productVideos.length > 0 && (
                      <p>{values.images.productVideos.length} videos added</p>
                    )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit("images")}
                  className="mt-2"
                >
                  Edit
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="variations"
              className="border rounded-md px-4 mb-2 animate-bounce-in"
              style={{ animationDelay: "250ms" }}
            >
              <AccordionTrigger className="py-3">
                <div className="flex items-center text-left">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <h3 className="font-medium">Variations</h3>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <dl className="space-y-2 text-sm">
                  {values.variations.sizeOptions &&
                    values.variations.sizeOptions.length > 0 && (
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-gray-500">Sizes:</dt>
                        <dd className="col-span-2">
                          {values.variations.sizeOptions.join(", ")}
                        </dd>
                      </div>
                    )}
                  {values.variations.colorVariants &&
                    values.variations.colorVariants.length > 0 && (
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-gray-500">Colors:</dt>
                        <dd className="col-span-2">
                          {values.variations.colorVariants
                            .map((c) => c.name)
                            .join(", ")}
                        </dd>
                      </div>
                    )}
                  {values.variations.materialType &&
                    values.variations.materialType.length > 0 && (
                      <div className="grid grid-cols-3 gap-1">
                        <dt className="text-gray-500">Materials:</dt>
                        <dd className="col-span-2">
                          {values.variations.materialType.join(", ")}
                        </dd>
                      </div>
                    )}
                </dl>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit("variations")}
                  className="mt-2"
                >
                  Edit
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="seo"
              className="border rounded-md px-4 mb-2 animate-bounce-in"
              style={{ animationDelay: "300ms" }}
            >
              <AccordionTrigger className="py-3">
                <div className="flex items-center text-left">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <h3 className="font-medium">SEO</h3>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <dl className="space-y-2 text-sm">
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="text-gray-500">Meta Title:</dt>
                    <dd className="col-span-2">{values.seo.metaTitle}</dd>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="text-gray-500">URL Slug:</dt>
                    <dd className="col-span-2">/products/{values.seo.slug}</dd>
                  </div>
                </dl>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit("seo")}
                  className="mt-2"
                >
                  Edit
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="other"
              className="border rounded-md px-4 mb-2 animate-bounce-in"
              style={{ animationDelay: "350ms" }}
            >
              <AccordionTrigger className="py-3">
                <div className="flex items-center text-left">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <div>
                    <h3 className="font-medium">Other Information</h3>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <dl className="space-y-2 text-sm">
                  <div className="grid grid-cols-3 gap-1">
                    <dt className="text-gray-500">Featured:</dt>
                    <dd className="col-span-2">
                      {values.otherInfo.isFeatured ? "Yes" : "No"}
                    </dd>
                  </div>
                  {values.otherInfo.warrantyInfo && (
                    <div className="grid grid-cols-3 gap-1">
                      <dt className="text-gray-500">Warranty:</dt>
                      <dd className="col-span-2 line-clamp-2">
                        {values.otherInfo.warrantyInfo}
                      </dd>
                    </div>
                  )}
                </dl>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit("otherInfo")}
                  className="mt-2"
                >
                  Edit
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex items-center"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          className="flex items-center animate-float"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              Add Product <ChevronRight className="h-4 w-4 ml-1" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
