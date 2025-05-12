"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSelectedCart } from "@/context/selected-cart-context";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const CartSummary = () => {
  const { selectedItems } = useSelectedCart();

  const itemsSubtotal = selectedItems.reduce(
    (sum, item) => sum + item.priceAtAdd * item.quantity,
    0
  );

  const discountedTotal = selectedItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );

  const discount = itemsSubtotal - discountedTotal;

  const tax = selectedItems.reduce(
    (sum, item) => sum + item.tax * item.quantity,
    0
  );

  const shipping = selectedItems.reduce(
    (sum, item) => sum + item.shippingCost,
    0
  );

  const subtotal = discountedTotal + tax + shipping;

  const format = (value: number) => `$${value.toFixed(2)}`;

  const summaryRows = [
    { label: "Items subtotal", value: format(itemsSubtotal) },
    { label: "Discount", value: `-${format(discount)}`, isNegative: true },
    { label: "Tax", value: format(tax) },
    { label: "Shipping Cost", value: format(shipping) },
    { label: "Subtotal", value: format(subtotal), isBold: true },
  ];

  return (
    <div className="flex-1 w-full flex-col flex gap-2">
      <Card className="max-w-md w-full shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Cart Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {summaryRows.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b last:border-none pb-1"
            >
              <span
                className={clsx(
                  "text-sm font-semibold",
                  item.isNegative && "text-green-500",
                  !item.isNegative && "text-muted-foreground",
                  item.isBold && "text-primary text-xl"
                )}
              >
                {item.label}
              </span>
              <span
                className={clsx(
                  "text-sm",
                  item.isBold
                    ? "font-semibold text-primary text-xl"
                    : "text-gray-800"
                )}
              >
                {item.value}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
      {selectedItems.length > 0 ? (
        <Link href="/checkout" className="w-full">
          <Button className="w-full" variant="success" size="lg">
            Proceed To Checkout
            <ChevronRight />
          </Button>
        </Link>
      ) : (
        <Button variant="success" size="lg" disabled>
          Proceed To Checkout
          <ChevronRight />
        </Button>
      )}
    </div>
  );
};

export default CartSummary;
