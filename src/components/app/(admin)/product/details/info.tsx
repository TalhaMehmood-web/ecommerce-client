import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductData } from "@/types/products/details";

interface ProductInfoProps {
  product: ProductData;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(
    product.inventory.minOrderQuantity || 1
  );
  const [selectedColor, setSelectedColor] = useState(
    product.variations.colorVariants[0]?.name || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product.variations.sizeOptions[0] || ""
  );
  const [selectedMaterial, setSelectedMaterial] = useState(
    product.variations.materialType[0] || ""
  );
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const incrementQuantity = () => {
    if (quantity < product.inventory.maxOrderQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > product.inventory.minOrderQuantity) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    // Simulate API call
    setTimeout(() => {
      setIsAddingToCart(false);
      // Here you would add the product to cart
    }, 1000);
  };

  // Helper function to format price
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  // Extract the plain text from the product description
  const extractText = (description: any): string => {
    try {
      return description.root.children
        .map((paragraph: any) =>
          paragraph.children
            .filter((child: any) => child.type === "text")
            .map((textNode: any) => textNode.text)
            .join("")
        )
        .join("\n");
    } catch (error) {
      return "No description available";
    }
  };

  const description = extractText(product.basicInfo.productDescription);

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
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
        <motion.div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">
            {formatPrice(product.pricing.basePrice, product.pricing.currency)}
          </span>
          {product.pricing.taxRate > 0 && (
            <span className="text-sm text-muted-foreground">
              + {product.pricing.taxRate}% tax
            </span>
          )}
        </motion.div>
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

      {/* Description */}
      <motion.div variants={itemVariants}>
        <p className="text-muted-foreground">{description}</p>
      </motion.div>

      {/* Variations */}
      {product.variations.colorVariants.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-2">
          <h3 className="font-medium">Color</h3>
          <div className="flex flex-wrap gap-2">
            {product.variations.colorVariants.map((color: any) => (
              <motion.button
                key={color.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedColor(color.name)}
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
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 rounded-md border ${
                  selectedSize === size
                    ? "border-primary bg-primary/10"
                    : "border-input bg-background"
                }`}
              >
                {size}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Material Types */}
      {product.variations.materialType.length > 0 && (
        <motion.div variants={itemVariants} className="space-y-2">
          <h3 className="font-medium">Material</h3>
          <div className="flex flex-wrap gap-2">
            {product.variations.materialType.map((material) => (
              <motion.button
                key={material}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMaterial(material)}
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

      {/* Quantity selector */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h3 className="font-medium">Quantity</h3>
        <div className="flex items-center">
          <Button
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
            value={quantity}
            readOnly
          />
          <Button
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

      {/* Shipping info card */}
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

      {/* Add to Cart */}
      <motion.div variants={itemVariants} className="pt-4">
        <Button
          className="w-full"
          size="lg"
          onClick={handleAddToCart}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? (
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
    </motion.div>
  );
};

export default ProductInfo;
