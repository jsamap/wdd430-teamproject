"use client";

import { useRouter } from "next/navigation";
import ProductForm from "../../../ui/components/products/ProductForm";
import { getProducts, saveProducts } from "../../../../lib/product-storage";

export default function NewProductPage() {
  const router = useRouter();

  function handleSave(newProduct: any) {
    const products = getProducts();
    saveProducts([...products, newProduct]);
    router.push("/admin/products");
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Add New Product</h2>
      <ProductForm onSave={handleSave} />
    </section>
  );
}