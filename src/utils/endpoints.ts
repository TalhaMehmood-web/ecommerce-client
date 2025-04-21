const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "user/register",
    LOGIN: "user/login",
  },
  PRODUCT: {
    ADD_PRODUCT: "product/add-product",
    GELL_PAGINATED_PRODUCTS: "product",
    EDIT_PRODUCT: "product",
    GET_PRODUCTS_FOR_CLIENT: "product/get-products-for-client",
  },
  SUBSCRIPTION: {
    SAVE_BEFORE_PAYMENT: "subscription/save-before-payment",
    CREATE_STRIPE_PAYMENT_SESSION: "subscription/create-stripe-session",
    VERIFY_PAYMENT_BY_SESSION_ID: "subscription/verify-payment",
    GET_SUBSCRIPTION_BY_USER_AND_ACTIVE_STATUS:
      "subscription/by-user-and-active",
  },
  CATEGORIES: {
    GET_ALL_PAGINATED_CATEGORIES: "category/paginated-categories",
    GET_ALL: "category/all",
  },
};

export { API_ENDPOINTS };
