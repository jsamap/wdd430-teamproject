"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "../../../../ui/components/products/ProductForm";
import { Product, ProductFormData } from "@/app/lib/types";

export default function EditProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);

        const response = await fetch(`/api/products/${params.id}`, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadProduct();
    }
  }, [params.id]);

  async function handleSave(updatedProduct: ProductFormData) {
    try {
      const response = await fetch(`/api/products/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedProduct.name,
          category: updatedProduct.category,
          description: updatedProduct.description,
          price: Number(updatedProduct.price),
          stock: Number(updatedProduct.stock),
          image: updatedProduct.image ?? null,
          details: updatedProduct.details ?? null,
          rating_average: updatedProduct.rating_average ?? 0,
          rating_count: updatedProduct.rating_count ?? 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update product");
    }
  }

  if (loading) {
    return <div>Loading product...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Edit Product</h2>
      <ProductForm
        initialData={{
          id: product.id,
          name: product.name,
          category: product.category,
          description: product.description,
          price: product.price,
          stock: product.stock,
          image: product.image ?? null,
          details: product.details ?? null,
          rating_average: product.rating_average ?? 0,
          rating_count: product.rating_count ?? 0,
        }}
        onSave={handleSave}
      />
    </section>
  );
}