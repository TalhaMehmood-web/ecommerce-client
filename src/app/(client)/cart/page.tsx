import CartView from "@/components/app/(client)/pages/cart";
import PageWrapper from "@/components/shared/page-wrapper";
import PageTitle from "@/components/shared/page-wrapper/page-title";
import React from "react";

const Cart = () => {
  return (
    <PageWrapper className="flex-col flex  gap-4">
      <PageTitle title="My Carts" />
      <CartView />
    </PageWrapper>
  );
};

export default Cart;
