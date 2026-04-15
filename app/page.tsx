export const dynamic = "force-dynamic"; // Force vercel to update data on every request.

import HhLogo from '@/app/ui/hh-logo';
import { merriweather, roboto } from '@/app/ui/fonts';
import ProductCard from "@/app/ui/components/product-card";
import { getFeaturedProducts } from '@/app/lib/data/product.data';
import { getLatestReviews } from '@/app/lib/data/review.data';
import { StarIcon } from "@heroicons/react/24/solid";
import Image from 'next/image';
import { SessionProvider } from "next-auth/react";

export default async function Page() {
  const featuredProducts = await getFeaturedProducts();
  const latestReviews = await getLatestReviews();

  return (
    <SessionProvider>

    <main className="flex flex-grow flex-col p-0 bg-neutral">

      <section className="flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-hhblue-700 to-hhblue-400 text-white">
        <h1 className={`${merriweather.className} text-5xl font-bold`}>Welcome</h1>
        <p className="mt-4 text-lg">Discover Treasures, Support Artisans.</p>
        <a href="/products" className="mt-6 px-6 py-3 bg-white text-hhblue-500 font-semibold rounded-lg shadow hover:bg-hhorange-300 hover:text-black">
          Shop Now
        </a>
      </section>

      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Products</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 justify-center">
          {featuredProducts.map((product: any) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              seller={product.seller_name}
              price={product.price}
              image={product.image}
              rating={product.rating_average}
            />
          ))}
        </div>
      </section>

      <section className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-10">Latest Reviews</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 justify-center">
          {latestReviews.map((review: any) => (
            <article
              key={review.id}
              className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={review.product_image || "https://placehold.co/100x100"}
                  alt={review.product_name}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover aspect-square"
                />
                <h3 className="text-xl font-semibold">{review.product_name}</h3>
              </div>

              <p className="text-gray-700 italic">"{review.comment}"</p>

              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${i < Math.round(review.rating) ? "text-[#FCB33D]" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">{review.rating}</span>
              </div>

              <p className="text-sm text-gray-500">— {review.reviewer_name}</p>
              <p className="text-xs text-gray-400">{new Date(review.created_at).toLocaleDateString()}</p>
            </article>
          ))}
        </div>
      </section>


    </main>
            </SessionProvider>

  );
}

