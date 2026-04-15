"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "../../../../ui/components/products/ProductForm";
import {
  getProducts,
  getProductById,
  saveProducts,
} from "../../../../../lib/product-storage";

export default function EditProductPage() {
  const [product, setProduct] = useState<any>(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    const foundProduct = getProductById(params.id as string);
    setProduct(foundProduct);
  }, [params.id]);

  function handleSave(updatedProduct: any) {
    const products = getProducts();

    const updatedProducts = products.map((item: any) =>
      item.id === params.id ? updatedProduct : item
    );

    saveProducts(updatedProducts);
    router.push("/admin/products");
  }

  if (!product) {
    return <div>Loading product...</div>;
  }

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold">Edit Product</h2>
      <ProductForm initialData={product} onSave={handleSave} />
    </section>
  );
}