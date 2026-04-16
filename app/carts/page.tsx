"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  getCartTotalLocal,
  CartData,
  removeFromCart,
  updateCartQuantity,
  getDeliverables,
} from "../lib/actions/local.actions";
import CartItem from "../ui/components/cart/CartItem";
import DeliverableComponent from "../ui/components/cart/Deliverables";
import OrderSummary from "../ui/components/cart/OrderSummary";

export default function CartPage() {
  const [cartData, setCartData] = useState<CartData>({
    cart: [],
    subtotal: 0,
    tax: 0,
    total: 0,
    totalItems: 0,
    shipping: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = getCartTotalLocal();
      console.log("Loaded cart:", data); // 🔍 Debugging
      setCartData(data);
    }
  }, []);

  const deliverables = getDeliverables();

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex flex-col md:flex-row p-6 gap-8">
        {/* Cart Item Summary */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold">Your Shopping Cart</h1>

          {cartData.cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartData.cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateCartQuantity={updateCartQuantity}
                removeFromCart={removeFromCart}
                setCartData={setCartData}
              />
            ))
          )}

          <button
            className="px-6 py-3 bg-hhblue-400 rounded hover:bg-hhorange-600 transition gap-8 text-white"
            onClick={() => (window.location.href = "/products")}
          >
            Continue Shopping
          </button>

          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Deliverables</h1>
            {deliverables.length === 0 ? (
              <p>No deliverables found.</p>
            ) : (
              deliverables.map((order) => (
                <DeliverableComponent key={order.id} order={order} />
              ))
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3 border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <OrderSummary cartData={cartData} />
          <Link href="carts/checkout">
            <button className="mt-6 w-full px-6 py-3 bg-hhblue-400 text-white rounded hover:bg-hhorange-700 transition">
              Proceed to Checkout
            </button>
          </Link>

          <p className="mt-3 text-sm text-gray-500 text-center">
            Secure Payment with VISA, Mastercard, PayPal
          </p>
        </div>
      </div>
    </main>
  );
}
