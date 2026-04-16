"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/app/lib/types";
import { getProducts, deleteProduct } from "@/app/lib/product-storage";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      router.refresh();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete product");
    }
  }

  if (loading) {
    return <div className="p-6">Loading products...</div>;
  }

  return (
    <section className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Products Administration</h2>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-4">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-14 w-14 rounded-md object-cover"
                      />
                    ) : (
                      <div className="h-14 w-14 rounded-md bg-gray-200" />
                    )}
                  </td>
                  <td className="p-4">{product.name}</td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">${Number(product.price).toFixed(2)}</td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
  href={`/admin/products/edit/${product.id}`}
  className="rounded-md border px-3 py-1"
>
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="rounded-md bg-red-600 px-3 py-1 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}