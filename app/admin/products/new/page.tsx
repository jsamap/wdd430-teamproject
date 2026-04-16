"use client";

import { useRouter } from "next/navigation";
import ProductForm from "../../../ui/components/products/ProductForm";
import { ProductFormData } from "@/lib/types";

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
          rating_average: Number(newProduct.rating_average),
          rating_count: Number(newProduct.rating_count),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Create failed:", error);
      alert("Failed to create product");
    }
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Add New Product</h2>
      <ProductForm onSave={handleSave} />
    </section>
  );
}