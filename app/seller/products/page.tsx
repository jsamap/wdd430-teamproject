import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getProductsByUserId } from "@/app/lib/data/product.data";
import { deleteSellerProduct } from "@/app/lib/actions/seller.actions";

export default async function SellerProductsPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/login");
  }
  const products = await getProductsByUserId(session.user.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">My products</h1>
        <Link
          href="/seller/products/new"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Add product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-600">
          You have no products yet.{" "}
          <Link className="text-[#6496FA] hover:underline" href="/seller/products/new">
            Create your first one
          </Link>
          .
        </p>
      ) : (
        <ul className="space-y-4">
          {products.map((p: Record<string, unknown>) => (
            <li
              key={String(p.id)}
              className="flex flex-wrap items-center gap-4 rounded-xl border bg-white p-4 shadow-sm"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded bg-gray-100">
                {p.image ? (
                  <Image src={String(p.image)} alt="" fill className="object-cover" unoptimized />
                ) : (
                  <span className="flex h-full items-center justify-center text-xs text-gray-400">No img</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{String(p.name)}</p>
                <p className="text-sm text-gray-500">
                  {String(p.category)} · ${Number(p.price).toFixed(2)} · stock {String(p.stock)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/seller/products/edit/${p.id}`}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
                >
                  Edit
                </Link>
                <form action={deleteSellerProduct}>
                  <input type="hidden" name="productId" value={String(p.id)} />
                  <button
                    type="submit"
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-800 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
