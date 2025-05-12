import CartView from "@/components/app/(client)/pages/cart";
import CartTotalWidget from "@/components/app/(client)/pages/cart/cart-total-widget";
import PageWrapper from "@/components/shared/page-wrapper";
import PageTitle from "@/components/shared/page-wrapper/page-title";
import React from "react";

const Cart = () => {
  return (
    <PageWrapper className="flex-col flex  gap-4">
      <PageTitle title="My Carts" />
      <div className="flex items-center gap-2 flex-wrap">
        <CartView />
        <CartTotalWidget />
      </div>
    </PageWrapper>
  );
};

export default Cart;
