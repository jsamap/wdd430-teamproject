import SellerProductForm from "@/app/ui/seller/SellerProductForm";

export default function SellerNewProductPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add a product</h1>
      <SellerProductForm mode="create" />
    </div>
  );
}
