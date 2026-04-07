"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductTable from "../../../components/products/ProductTable";
import { getProducts, saveProducts } from "../../../lib/product-storage";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  function handleDelete(id: string) {
    const updatedProducts = products.filter((product: any) => product.id !== id);
    setProducts(updatedProducts);
    saveProducts(updatedProducts);
  }

  const filteredProducts = products.filter((product: any) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Products</h2>

        <Link
          href="/admin/products/new"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Add Product
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md rounded-lg border p-3"
      />

      <ProductTable products={filteredProducts} onDelete={handleDelete} />
    </section>
  );
}