"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { addToCartLocal } from "@/app/lib/actions/local.actions";
import { toggleWishlist } from "@/app/lib/wishlist";

type WishlistProduct = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistProduct[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("wishlist");
    const parsed = stored ? JSON.parse(stored) : [];
    setWishlistItems(parsed);
  }, []);

  const handleRemove = (product: WishlistProduct) => {
    const updated = toggleWishlist(product);
    setWishlistItems(updated);
  };

  const handleAddToCart = (product: WishlistProduct) => {
    addToCartLocal(product as any, 1);
  };

  return (
    <main className="min-h-screen bg-[#F7F7F7] px-8 py-8 text-black">
      <h1 className="text-4xl font-bold px-2 py-6">Your Wishlist ❤️🛍️</h1>

      <div className="mb-6 px-2">
        <Link
          href="/products"
          className="rounded-md bg-[#6496FA] px-5 py-3 font-bold text-white"
        >
          ← Back to Products
        </Link>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="rounded-xl bg-white p-6 shadow-md">
          <p className="text-lg">Your wishlist is empty.</p>
        </div>
      ) : (
        <section className="flex flex-col gap-6">
          {wishlistItems.map((product) => (
            <article
              key={product.id}
              className="flex flex-col items-center gap-4 rounded-xl bg-white p-4 shadow-md md:flex-row"
            >
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={180}
                  height={180}
                  style={{ width: "180px", height: "auto" }}
                  className="rounded-lg object-cover"
                />
              )}

              <div className="w-full">
                <h2 className="mb-2 text-2xl font-bold">{product.name}</h2>

                <p className="my-3 text-xl font-bold text-[#FCB33D]">
                  ${product.price.toFixed(2)}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/products/${product.id}`}
                    className="rounded-md bg-[#6496FA] px-5 py-3 font-bold text-white"
                  >
                    View Details
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="rounded-md bg-[#FCB33D] px-5 py-3 font-bold text-black"
                  >
                    Add to Cart
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRemove(product)}
                    className="rounded-md bg-pink-600 px-5 py-3 font-bold text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
