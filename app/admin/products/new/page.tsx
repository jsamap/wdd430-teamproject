"use client";

import { useRouter } from "next/navigation";
import ProductForm from "../../../ui/components/products/ProductForm";
import { ProductFormData } from "@/app/lib/types";

export default function NewProductPage() {
  const router = useRouter();

  async function handleSave(newProduct: ProductFormData) {
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newProduct.name,
          category: newProduct.category,
          description: newProduct.description,
          price: Number(newProduct.price),
          stock: Number(newProduct.stock),
          image: newProduct.image ?? null,
          details: newProduct.details ?? null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Create product API error:", data);
        throw new Error(data.message || "Failed to create product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error: any) {
      console.error("Create failed:", error);
      alert(error.message || "Failed to create product");
    }
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Add New Product</h2>
      <ProductForm onSave={handleSave} />
    </section>
  );
}