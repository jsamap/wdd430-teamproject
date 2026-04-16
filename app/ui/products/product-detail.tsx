import Link from "next/link";
import AddToCartButton from "../AddToCartButton";
import Image from "next/image";
import ReviewsSection from "../reviews/ReviewsSection";
import ReviewRating from "../reviews/ReviewRating";

export default async function ProductDetail({
  product,
}: {
  product: any;
}) {
  return (
    <main className="min-h-screen bg-[#F7F7F7] px-8 py-8 text-black">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/products"
          className="mb-6 inline-block font-medium text-[#6496FA] hover:underline"
        >
          ← Back to Products
        </Link>

        <section className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          <div className="w-full md:w-1/2">
            <Image
              src={
                product.image ??
                "https://i.ibb.co/gMsLBjDv/terracota-plant-pot.webp"
              }
              alt={product.name}
              width={500}
              height={500}
              unoptimized
              className="h-auto w-full rounded-lg object-cover"
            />
          </div>

          <div className="flex w-full flex-col gap-3 rounded-xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.1)] md:w-1/2">
            <h1 className="font-serif text-4xl font-bold">{product.name}</h1>

            {product.user_id && (
              <p className="text-sm text-gray-600">
                Sold by{" "}
                <Link
                  href={`/sellers/${product.user_id}`}
                  className="font-medium text-[#6496FA] hover:underline"
                >
                  {product.seller_name ?? "this artisan"}
                </Link>
              </p>
            )}

            <div className="font-bold text-[#FCB33D]">
              <ReviewRating rating={product.rating_average} count={product.rating_count} />
            </div>

            <p className="text-xl font-bold text-[#FCB33D]">
              ${Number(product.price).toFixed(2)}
            </p>

            <p>{product.description}</p>
            <p>{product.details}</p>

            <AddToCartButton product={product} />
          </div>
        </section>

        <ReviewsSection productId={product.id} />
      </div>
    </main>
  );

}