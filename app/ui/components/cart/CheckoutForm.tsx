import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";

const checkoutSchema = z.object({
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

type CheckoutFormValues = {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

type CheckoutFormProps = {
  onSubmit: SubmitHandler<CheckoutFormValues>;
};

export default function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Billing Details</h2>

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

      <h3 className="text-lg font-medium text-gray-700 mt-6">Payment Method</h3>
      <input
        {...register("cardNumber")}
        placeholder="Card Number (16 digits)"
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
  );
}
