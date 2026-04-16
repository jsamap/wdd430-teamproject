"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CartData,
  placeOrderAndSaveDeliverable,
  getCartTotalLocal,
} from "../../lib/actions/local.actions";
import OrderSummary from "../../ui/components/cart/OrderSummary";
import CheckoutForm from "../../ui/components/cart/CheckoutForm";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().regex(/^\d{4}$/, "ZIP must be 5 digits"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format MM/YY"),
  cvv: z.string().regex(/^\d{3}$/, "CVV must be 3 digits"),
});

type FormData = z.infer<typeof schema>;

export default function CheckoutPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Order placed:", data);
    const deliverable = placeOrderAndSaveDeliverable();
    console.log("Deliverable created:", deliverable);
    router.push("/carts/success");
  };

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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8 grid md:grid-cols-2 gap-8">
       <CheckoutForm onSubmit={onSubmit} />

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Order Summary

           
          </h2>
          <OrderSummary cartData={cartData} />

          <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
            <span>🔒 Secure Checkout</span>
            <span>VISA • Mastercard • PayPal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
