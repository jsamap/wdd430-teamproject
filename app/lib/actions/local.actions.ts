"use client";

//
// Base product type
//
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
};

//
// Cart item extends Product with quantity
//
export type CartItem = Product & { quantity: number };

//
// Cart data shape
//
export type CartData = {
  cart: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  totalItems: number;
  shipping: number;
};

// Deliverable shape

export type Deliverable = {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  shipping: number;
  totalItems: number;
  createdAt: string;
  status: "Pending" | "Shipped" | "Delivered";
};

//
// Add to Cart
//
export function addToCartLocal(
  product: Product,
  quantity: number = 1,
): CartData {
  const existingCart: CartItem[] = JSON.parse(
    localStorage.getItem("cart") || "[]",
  );

  const itemIndex = existingCart.findIndex((item) => item.id === product.id);

  if (itemIndex > -1) {
    existingCart[itemIndex].quantity += quantity;
  } else {
    existingCart.push({ ...product, quantity });
  }

  localStorage.setItem("cart", JSON.stringify(existingCart));

  return getCartTotalLocal();
}

//
// Get Cart (raw items only)
//
export function getCart(): CartItem[] {
  try {
    const storedCart = localStorage.getItem("cart");
    if (!storedCart) return [];
    return JSON.parse(storedCart) as CartItem[];
  } catch (error) {
    console.error("Failed to parse cart:", error);
    return [];
  }
}

//
// Clear Cart
//
export function clearCart(): CartData {
  localStorage.removeItem("cart");
  return {
    cart: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    totalItems: 0,
    shipping: 0,
  };
}

//
// Get Cart with Totals
//
export function getCartTotalLocal(): CartData {
  try {
    const storedCart = localStorage.getItem("cart");
    const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const taxRate = 0.077; // example 7.7% tax
    const tax = subtotal * taxRate;
    const shipping = subtotal * 0.1;
    const total = subtotal + tax + shipping;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return { cart, subtotal, tax, total, totalItems, shipping };
  } catch (error) {
    console.error("Failed to parse cart:", error);
    return {
      cart: [],
      subtotal: 0,
      tax: 0,
      total: 0,
      totalItems: 0,
      shipping: 0,
    };
  }
}

export function removeFromCart(productId: string): CartData {
  try {
    const storedCart = localStorage.getItem("cart");
    let cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    cart = cart.filter((item) => item.id !== productId);

    localStorage.setItem("cart", JSON.stringify(cart));

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const taxRate = 0.077;
    const tax = subtotal * taxRate;
    const shipping = subtotal * 0.1;
    const total = subtotal + tax + shipping;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return { cart, subtotal, tax, total, totalItems, shipping };
  } catch {
    return {
      cart: [],
      subtotal: 0,
      tax: 0,
      total: 0,
      totalItems: 0,
      shipping: 0,
    };
  }
}

export function updateCartQuantity(
  productId: string,
  newQuantity: number,
): CartData {
  try {
    const storedCart = localStorage.getItem("cart");
    let cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    const itemIndex = cart.findIndex((item) => item.id === productId);

    if (itemIndex > -1) {
      if (newQuantity <= 0) {
        cart = cart.filter((item) => item.id !== productId);
      } else {
        cart[itemIndex].quantity = newQuantity;
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const taxRate = 0.077;
    const tax = subtotal * taxRate;
    const shipping = subtotal * 0.1;
    const total = subtotal + tax + shipping;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return { cart, subtotal, tax, total, totalItems, shipping };
  } catch {
    return {
      cart: [],
      subtotal: 0,
      tax: 0,
      total: 0,
      totalItems: 0,
      shipping: 0,
    };
  }
}

export function placeOrderAndSaveDeliverable(): Deliverable[] {
  try {
    const storedCart = localStorage.getItem("cart");
    const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

    if (cart.length === 0) return [];

    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const taxRate = 0.077;
    const tax = subtotal * taxRate;
    const shipping = subtotal * 0.1;
    const total = subtotal + tax + shipping;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const newDeliverable: Deliverable = {
      id: crypto.randomUUID(),
      items: cart,
      subtotal,
      tax,
      total,
      shipping,
      totalItems,
      createdAt: new Date().toISOString(),
      status: "Pending",
    };

    const storedDeliverables = localStorage.getItem("deliverables");
    const deliverables: Deliverable[] = storedDeliverables
      ? JSON.parse(storedDeliverables)
      : [];
    deliverables.push(newDeliverable);
    localStorage.setItem("deliverables", JSON.stringify(deliverables));

    localStorage.removeItem("cart");
    return deliverables;
  } catch (error) {
    console.error("Failed to place order:", error);
    return [];
  }
}

export function getDeliverables(): Deliverable[] {
  try {
    const storedDeliverables = localStorage.getItem("deliverables");
    return storedDeliverables ? JSON.parse(storedDeliverables) : [];
  } catch (error) {
    console.error("Failed to parse deliverables:", error);
    return [];
  }
}
