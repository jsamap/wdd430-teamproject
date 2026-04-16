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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Billing Details
          </h2>

          <input
            {...register("name")}
            placeholder="Full Name"
            className="w-full border p-2 rounded-md"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            {...register("email")}
            placeholder="Email Address"
            className="w-full border p-2 rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            {...register("address")}
            placeholder="Shipping Address"
            className="w-full border p-2 rounded-md"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}

          <div className="grid grid-cols-3 gap-2">
            <input
              {...register("city")}
              placeholder="City"
              className="border p-2 rounded-md"
            />
            <input
              {...register("state")}
              placeholder="State"
              className="border p-2 rounded-md"
            />
            <input
              {...register("zip")}
              placeholder="ZIP"
              className="border p-2 rounded-md"
            />
          </div>
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state.message}</p>
          )}
          {errors.zip && (
            <p className="text-red-500 text-sm">{errors.zip.message}</p>
          )}

          <h3 className="text-lg font-medium text-gray-700 mt-6">
            Payment Method
          </h3>
          <input
            {...register("cardNumber")}
            placeholder="Card Number(must be atleast 16 digits) "
            className="w-full border p-2 rounded-md"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>
          )}

          <div className="grid grid-cols-2 gap-2">
            <input
              {...register("expiry")}
              placeholder="MM / YY"
              className="border p-2 rounded-md"
            />
            <input
              {...register("cvv")}
              placeholder="CVV"
              className="border p-2 rounded-md"
            />
          </div>
          {errors.expiry && (
            <p className="text-red-500 text-sm">{errors.expiry.message}</p>
          )}
          {errors.cvv && (
            <p className="text-red-500 text-sm">{errors.cvv.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </form>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Order Summary
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
          </h2>

          <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
            <span>🔒 Secure Checkout</span>
            <span>VISA • Mastercard • PayPal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
