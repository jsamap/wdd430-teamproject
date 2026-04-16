'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function WishlistItems({ initialItems }: { initialItems: any[] }) {
  const [items, setItems] = useState(initialItems);
  const [removing, setRemoving] = useState<string | null>(null);

  const handleRemove = async (id: string) => {
    setRemoving(id);
    await fetch("/api/wishlist/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: id }),
    });
    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setRemoving(null);
    }, 400);
  };

  return (
    <section className="flex flex-col gap-6 px-8 pb-8">
      {items.length > 0 ? (
        items.map((item) => (
          <article
            key={item.id}
            className={`flex flex-col items-center gap-4 rounded-xl bg-white p-4 shadow-md md:flex-row md:items-center ${
              removing === item.id ? "vanish" : ""
            }`}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={180}
              height={180}
              className="rounded-lg object-cover aspect-square"
            />
            <div className="w-full">
              <h2 className="mb-1 text-2xl font-bold">{item.name}</h2>
              <p className="mb-1 text-sm italic">{item.category}</p>
              <div className="mb-1 flex items-center">
                {[...Array(5)].map((_, i) =>
                  i < Math.round(item.rating_average) ? (
                    <StarIcon key={i} className="h-5 w-5 text-[#FCB33D]" />
                  ) : (
                    <StarOutline key={i} className="h-5 w-5 text-gray-300" />
                  )
                )}
              </div>
              <p className="my-2 text-xl">${item.price.toFixed(2)}</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <Link
                  href={`/products/${item.id}`}
                  className="rounded-md bg-hhorange-300 hover:bg-hhorange-400 px-5 py-3 font-bold text-black"
                >
                  View Details
                </Link>
                <button
                  type="button"
                  className="rounded-md text-white bg-gray-400 px-3 py-3 hover:bg-hhblue-500 flex items-center justify-center"
                >
                  <ShoppingCartIcon className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="rounded-md text-white bg-gray-400 px-3 py-3 hover:bg-red-700 flex items-center justify-center"
                  aria-label="Remove from Wishlist"
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </article>
        ))
      ) : (
        <h1 className="text-center font-bold py-10">
          You don't have any items in your wishlist.
        </h1>
      )}
    </section>
  );
}
