import Link from "next/link";
import { getProducts } from "@/app/lib/data/product.data";
import AdminProductsTable from "@/app/ui/admin/AdminProductsTable";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold">Products administration</h2>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          Add product
        </Link>
      </div>

      <p className="text-sm text-gray-600">
        This list is loaded from the database (same catalog as the public shop). Deleting or editing
        here updates what buyers see on the site.
      </p>

      {products.length === 0 ? (
        <p>No products in the database yet. Use Add product or run the seed endpoint.</p>
      ) : (
        <AdminProductsTable products={products as any[]} />
      )}
    </section>
  );
}
