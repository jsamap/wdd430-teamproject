import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getProduct } from "@/app/lib/data/product.data";
import SellerProductForm from "@/app/ui/seller/SellerProductForm";

export default async function SellerEditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const product = await getProduct(id);

  if (!product || product.user_id !== session?.user?.id) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit product</h1>
      <SellerProductForm mode="edit" initial={product} />
    </div>
  );
}
