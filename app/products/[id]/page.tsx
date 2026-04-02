import { notFound } from "next/navigation";
import { getProduct } from "@/app/lib/data/product.data";
import ProductDetail from "@/app/ui/products/product-detail";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}