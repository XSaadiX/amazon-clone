// App Constants
export const APP_NAME = "Amazon Clone";
export const APP_VERSION = "1.0.0";

// API Constants
export const API_ENDPOINTS = {
  PRODUCTS: "https://fakestoreapi.com/products",
  PAYMENTS: "/payments/create",
} as const;

// Firebase Collection Names
export const FIREBASE_COLLECTIONS = {
  USERS: "users",
  ORDERS: "orders",
} as const;

// Route Constants
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SEARCH: "/search",
  CHECKOUT: "/checkout",
  PAYMENT: "/payment",
  ORDERS: "/orders",
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: "amazon_clone_user_preferences",
  CART_BACKUP: "amazon_clone_cart_backup",
} as const;

// Product Categories
export const PRODUCT_CATEGORIES = {
  ALL: "all",
  ELECTRONICS: "electronics",
  CLOTHING: "clothing",
  JEWELRY: "jewelery",
  MENS_CLOTHING: "men's clothing",
  WOMENS_CLOTHING: "women's clothing",
} as const;

// UI Constants
export const UI_CONSTANTS = {
  HEADER_HEIGHT: 60,
  FOOTER_HEIGHT: 200,
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  PAYMENT_FAILED: "Payment failed. Please try again.",
  LOGIN_REQUIRED: "Please log in to continue.",
  PRODUCT_NOT_FOUND: "Product not found.",
  GENERIC_ERROR: "Something went wrong. Please try again.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  PAYMENT_SUCCESS: "Payment successful!",
  ORDER_PLACED: "Order placed successfully!",
  ITEM_ADDED: "Item added to cart!",
  ITEM_REMOVED: "Item removed from cart!",
} as const;
