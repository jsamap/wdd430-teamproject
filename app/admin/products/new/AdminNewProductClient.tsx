"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ProductForm from "@/app/ui/components/products/ProductForm";
import type { ProductFormData } from "@/app/lib/types";

type SellerRow = { id: string; name: string; email: string };

export default function AdminNewProductClient({ sellers }: { sellers: SellerRow[] }) {
  const router = useRouter();
  const [sellerId, setSellerId] = useState(sellers[0]?.id ?? "");

  async function handleSave(newProduct: ProductFormData) {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newProduct.name,
        category: newProduct.category,
        description: newProduct.description,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        image: newProduct.image ?? null,
        details: newProduct.details ?? null,
        rating_average: newProduct.rating_average ?? 0,
        rating_count: newProduct.rating_count ?? 0,
        sellerUserId: sellerId || undefined,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to create product");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  if (sellers.length === 0) {
    return (
      <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
        There are no seller accounts yet. Register a user with the seller role (or run seed), then try
        again.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="max-w-xl rounded-lg border bg-white p-4 shadow-sm">
        <label htmlFor="admin-seller" className="mb-2 block font-medium">
          Assign product to seller
        </label>
        <select
          id="admin-seller"
          className="w-full rounded-lg border p-3"
          value={sellerId}
          onChange={(e) => setSellerId(e.target.value)}
        >
          {sellers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.email})
            </option>
          ))}
        </select>
      </div>
      <ProductForm onSave={handleSave} />
    </div>
  );
}
