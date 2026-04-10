"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  getCartTotalLocal,
  CartData,
  removeFromCart,
  updateCartQuantity,
} from "../lib/actions/local.actions";

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
              <div
                key={item.id}
                className="flex flex-items-center justify-between border rounded-lg p-4 bg-white shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <div className="flex gap-4">
                      <span className="text-gray-600">
                        ${item.price.toFixed(2)} x
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            setCartData(
                              updateCartQuantity(item.id, item.quantity - 1),
                            )
                          }
                          className="px-2 py-0.1 bg-gray-200 rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              setCartData(
                                updateCartQuantity(item.id, item.quantity + 1),
                              )
                            }
                            className="px-2 py-0.1 bg-gray-200 rounded"
                          >
                            
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <span className="font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setCartData(removeFromCart(item.id))}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ))
          )}
          <button
            className="px-6 py-3 bg-hhblue-400 rounded hover:bg-hhorange-600 transition gap-8 text-white"
            onClick={() => (window.location.href = "/products")}
          >
            Continue Shopping
          </button>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3 border rounded-lg p-6 bg-white shadow-sm">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${cartData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">
                ${cartData.shipping.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${cartData.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total</span>
              <span>${cartData.total.toFixed(2)}</span>
            </div>
          </div>
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

{
  /* <div className="border-t border-gray-200 pt-4 space-y-2">
  {cartData.cart.map((item) => (
    <div key={item.id}>
      {item.name} - {item.price} x {item.quantity}
    </div>
  ))}
  <p>Subtotal: ${cartData.subtotal.toFixed(2)}</p>
  <p>Tax: ${cartData.tax.toFixed(2)}</p>
  <p>Total: ${cartData.total.toFixed(2)}</p>
</div>; */
}
