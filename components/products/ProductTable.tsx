"use client";

import Link from "next/link";

export default function ProductTable({ products, onDelete }: any) {
  if (!products || products.length === 0) {
    return (
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        No products yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-4">Image</th>
            <th className="p-4">Name</th>
            <th className="p-4">Category</th>
            <th className="p-4">Price</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product: any) => (
            <tr key={product.id} className="border-t">
              <td className="p-4">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg bg-gray-100" />
                )}
              </td>

              <td className="p-4">{product.name}</td>
              <td className="p-4">{product.category}</td>
              <td className="p-4">${product.price}</td>
              <td className="p-4">{product.stock}</td>
              <td className="p-4">{product.status}</td>
              <td className="p-4">
                <div className="flex gap-3">
                  <Link
                    href={`/admin/products/edit/${product.id}`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => onDelete(product.id)}
                    className="text-red-600"
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