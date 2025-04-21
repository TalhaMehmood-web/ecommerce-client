import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductData } from "@/types/products/details";
import clsx from "clsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";
import { toast } from "sonner";
import ApiLoader from "@/components/shared/loading/api-loader";
import { useRouter } from "next/navigation";

interface ProductInfoProps {
  product: ProductData;
  id: String;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, id }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      productId: id,
      quantity: product.inventory.minOrderQuantity || 1,
      variant: product.variations.sizeOptions[0] || "",
      priceAtAdd: product.pricing.basePrice,
      shippingCost: product.shipping.shippingCost,
      estimatedDelivery: product.shipping.estimatedDelivery,
      material: product.variations.materialType[0] || "",
      color: product.variations.colorVariants[0]?.name || "",
    },
  });

  const quantity = watch("quantity");
  const selectedColor = watch("color");
  const selectedMaterial = watch("material");
  const selectedVariant = watch("variant");

  const incrementQuantity = () => {
    if (quantity < product.inventory.maxOrderQuantity) {
      setValue("quantity", quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > product.inventory.minOrderQuantity) {
      setValue("quantity", quantity - 1);
    }
  };
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await axiosInstance.post("/cart", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.statusCode === 200) {
        toast.success("Product added to cart!");
        queryClient.invalidateQueries({ queryKey: ["carts", 1, 5] });
        router.push("/cart");
      }
    },
    onError: (error: any) => {
      const errorMsg =
        error?.response?.data?.message || "Something went wrong!";
      toast.error(errorMsg);
    },
  });

  const onSubmit = async (data: any) => {
    mutation.mutateAsync(data);
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <React.Fragment>
      <ApiLoader
        isLoading={mutation.isPending}
        message="Product Adding To Cart ...."
      />
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {/* Pricing */}
        <motion.div variants={itemVariants} className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">
              {formatPrice(product.pricing.basePrice, product.pricing.currency)}
            </span>
            {product.pricing.taxRate > 0 && (
              <span className="text-sm text-muted-foreground">
                + {product.pricing.taxRate}% tax
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`h-3 w-3 rounded-full ${
                product.inventory.stockStatus === "In Stock"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            ></div>
            <span className="text-sm font-medium">
              {product.inventory.stockStatus} ({product.inventory.stockQuantity}{" "}
              available)
            </span>
          </div>
        </motion.div>

        {/* Color */}
        {product.variations.colorVariants.length > 0 && (
          <motion.div variants={itemVariants} className="space-y-2">
            <h3 className="font-medium">Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.variations.colorVariants.map((color: any) => (
                <motion.button
                  type="button"
                  key={color.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setValue("color", color.name)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    selectedColor === color.name
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColor === color.name && (
                    <Check className="h-4 w-4 text-white drop-shadow-md" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
        {/* Size Options */}
        {product.variations.sizeOptions.length > 0 && (
          <motion.div variants={itemVariants} className="space-y-2">
            <h3 className="font-medium">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.variations.sizeOptions.map((size: any) => (
                <motion.button
                  key={size}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setValue("variant", size)}
                  type="button"
                  className={clsx(
                    "px-3 py-1 rounded-md  cursor-pointer",
                    selectedVariant === size ? " bg-slate-200" : "bg-background"
                  )}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
        {/* Material */}
        {product.variations.materialType.length > 0 && (
          <motion.div variants={itemVariants} className="space-y-2">
            <h3 className="font-medium">Material</h3>
            <div className="flex flex-wrap gap-2">
              {product.variations.materialType.map((material) => (
                <motion.button
                  type="button"
                  key={material}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setValue("material", material)}
                  className={`px-3 py-1 rounded-md border ${
                    selectedMaterial === material
                      ? "border-primary bg-primary/10"
                      : "border-input bg-background"
                  }`}
                >
                  {material}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Quantity */}
        <motion.div variants={itemVariants} className="space-y-2">
          <h3 className="font-medium">Quantity</h3>
          <div className="flex items-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={decrementQuantity}
              disabled={quantity <= product.inventory.minOrderQuantity}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <input
              type="number"
              className="w-16 text-center mx-2 border rounded-md py-1"
              {...register("quantity", { valueAsNumber: true })}
              readOnly
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={incrementQuantity}
              disabled={quantity >= product.inventory.maxOrderQuantity}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <span className="ml-3 text-sm text-muted-foreground">
              {product.inventory.minOrderQuantity} min /{" "}
              {product.inventory.maxOrderQuantity} max
            </span>
          </div>
        </motion.div>

        {/* Shipping Info */}
        <motion.div variants={itemVariants}>
          <Card className="p-4 bg-accent/10">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Shipping Cost:</span>
                <span className="font-medium">
                  {formatPrice(
                    product.shipping.shippingCost,
                    product.pricing.currency
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Estimated Delivery:</span>
                <span className="font-medium">
                  {product.shipping.estimatedDelivery}
                </span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Submit Button */}
        <motion.div variants={itemVariants} className="pt-4">
          <Button
            className="w-full"
            size="lg"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin mr-2" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </>
            )}
          </Button>
        </motion.div>
      </motion.form>
    </React.Fragment>
  );
};

export default ProductInfo;
