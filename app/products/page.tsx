import { getProducts } from "@/app/lib/data/product.data";
import ProductsClient from "@/app/ui/products/products-client";

export default async function ProductsPage() {
  const products = await getProducts();
  console.log("Fetched products:", products);
  
  return <ProductsClient products={products} />;
}