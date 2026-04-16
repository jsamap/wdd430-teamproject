import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPublicSellerById } from "@/app/lib/data/user.data";
import { getProductsByUserId } from "@/app/lib/data/product.data";
import ReviewRating from "@/app/ui/reviews/ReviewRating";

export default async function PublicSellerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const seller = await getPublicSellerById(id);
  if (!seller) {
    notFound();
  }

  const products = await getProductsByUserId(id);

  return (
    <main className="min-h-screen bg-[#F7F7F7] px-6 py-10 text-black">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="font-serif text-4xl font-bold">{seller.name}</h1>
          {seller.seller_tagline && (
            <p className="mt-2 text-lg text-gray-700">{seller.seller_tagline}</p>
          )}
        </div>

        {seller.seller_bio && (
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">About</h2>
            <p className="whitespace-pre-wrap text-gray-800">{seller.seller_bio}</p>
          </section>
        )}

        {seller.seller_story && (
          <section className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold">Story</h2>
            <p className="whitespace-pre-wrap text-gray-800">{seller.seller_story}</p>
          </section>
        )}

        <section>
          <h2 className="mb-4 text-2xl font-bold">Handcrafted items</h2>
          {products.length === 0 ? (
            <p className="text-gray-600">This seller has not listed any products yet.</p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2">
              {products.map((p: Record<string, unknown>) => (
                <li key={String(p.id)} className="overflow-hidden rounded-xl border bg-white shadow-sm">
                  <Link href={`/products/${p.id}`} className="block">
                    <div className="relative aspect-square w-full bg-gray-100">
                      {p.image ? (
                        <Image
                          src={String(p.image)}
                          alt={String(p.name)}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : null}
                    </div>
                    <div className="p-4">
                      <p className="font-semibold">{String(p.name)}</p>
                      <p className="text-sm text-gray-600">${Number(p.price).toFixed(2)}</p>
                      <div className="mt-1 text-sm">
                        <ReviewRating
                          rating={Number(p.rating_average) || 0}
                          count={Number(p.rating_count) || 0}
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <Link href="/products" className="inline-block text-[#6496FA] hover:underline">
          ← Back to all products
        </Link>
      </div>
    </main>
  );
}
