import { getProduct } from "@/app/lib/data/product.data";
import ProductDetail from "@/app/ui/products/product-detail";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <main className="min-h-screen bg-black p-6 text-white">
        <p className="text-xl">Loading or Product not found...</p>
      </main>
    );
  }

  return (
    <ProductDetail product={product} />
  );
}