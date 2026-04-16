import { getProducts } from "@/app/lib/data/product.data";
import ProductsClient from "@/app/ui/products/products-client";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const products = await getProducts();
  const { category: categoryParam } = await searchParams;

  return (
    <ProductsClient
      key={categoryParam ?? "all"}
      products={products}
      initialCategory={categoryParam}
    />
  );
}
