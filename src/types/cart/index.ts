export interface CartItem {
  _id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  variant: string;
  priceAtAdd: number;
  shippingCost: number;
  estimatedDelivery: string;
  material: string;
  color: string;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  updatedAt: string;
  __v: number;
}
