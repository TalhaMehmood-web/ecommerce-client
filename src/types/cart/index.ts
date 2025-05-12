export interface CartItem {
  id: string; // previously _id
  productId: string;
  productName: string;
  category: string;
  subcategory: string;
  brand: string;
  basePrice: number;
  discountedPrice: number;
  discountPercentage: number;
  stockQuantity: number;
  stockStatus: string;
  productImage: string;
  createdAt: string;
  quantity: number;
  variant: string;
  priceAtAdd: number;
  shippingCost: number;
  estimatedDelivery: string;
  material: string;
  color: string;
  tax: number;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  updatedAt: string;
  __v: number;
}
