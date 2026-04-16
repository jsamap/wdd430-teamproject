import React from "react";
import { CartItem as CartItemType } from "@/app/lib/actions/local.actions";

type CartItemProps = {
  item: CartItemType;
  updateCartQuantity: (id: string, quantity: number) => any;
  removeFromCart: (id: string) => any;
  setCartData: (data: any) => void;
};

export default function CartItem({
  item,
  updateCartQuantity,
  removeFromCart,
  setCartData,
}: CartItemProps) {
  return (
    <div
      key={item.id}
      className="flex items-center justify-between border rounded-lg p-4 bg-white shadow-sm"
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
            <span className="text-gray-600">${item.price.toFixed(2)} x</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setCartData(updateCartQuantity(item.id, item.quantity - 1))
                }
                className="px-2 py-0.5 bg-gray-200 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  setCartData(updateCartQuantity(item.id, item.quantity + 1))
                }
                className="px-2 py-0.5 bg-gray-200 rounded"
              >
                +
              </button>
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
  );
}
