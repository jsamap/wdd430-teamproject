import React from "react";
import type { CartData } from "@/app/lib/actions/local.actions"; // type-only import

type OrderSummaryProps = {
  cartData: CartData;
};

export default function OrderSummary({ cartData }: OrderSummaryProps) {
  return (
    <div className="space-y-2 text-gray-700">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>${cartData.subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping</span>
        <span className="text-green-600">${cartData.shipping.toFixed(2)}</span>
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
  );
}
