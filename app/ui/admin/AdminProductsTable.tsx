"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteAdminProduct } from "@/app/lib/actions/admin.product.actions";

const PLACEHOLDER = "https://i.ibb.co/gMsLBjDv/terracota-plant-pot.webp";

type Row = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image?: string | null;
  seller_name?: string | null;
};

export default function AdminProductsTable({ products }: { products: Row[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleDelete(id: string) {
    if (!window.confirm("Delete this product from the catalog?")) return;
    const fd = new FormData();
    fd.set("productId", id);
    startTransition(async () => {
      await deleteAdminProduct(fd);
      router.refresh();
    });
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-4">Image</th>
            <th className="p-4">Name</th>
            <th className="p-4">Seller</th>
            <th className="p-4">Category</th>
            <th className="p-4">Price</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="p-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-md bg-gray-100">
                  <Image
                    src={product.image || PLACEHOLDER}
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </td>
              <td className="p-4">{product.name}</td>
              <td className="p-4 text-sm text-gray-700">{product.seller_name ?? "—"}</td>
              <td className="p-4">{product.category}</td>
              <td className="p-4">${Number(product.price).toFixed(2)}</td>
              <td className="p-4">{product.stock}</td>
              <td className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/admin/products/edit/${product.id}`}
                    className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => handleDelete(product.id)}
                    className="rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
