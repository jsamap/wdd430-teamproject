"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useState, useEffect } from "react";
import { addToCartLocal } from "@/app/lib/actions/local.actions";
import { flyToCart } from "@/app/ui/animation/animation";
import { toggleWishlist, isInWishlist } from "@/app/lib/wishlist";

const products = [
  {
    id: "1",
    name: "Rustic Wall Sign",
    category: "Home Decor",
    price: 28,
    rating: 4.9,
    image: "/images/homedecor1.png",
    description:
      "A handcrafted rustic wooden wall sign perfect for cozy spaces.",
  },
  {
    id: "2",
    name: "Decor Shelf",
    category: "Home Decor",
    price: 32,
    rating: 4.8,
    image: "/images/homedecor2.png",
    description: "Minimalist wooden shelf ideal for modern home styling.",
  },
  {
    id: "3",
    name: "Cozy Decor Set",
    category: "Home Decor",
    price: 35,
    rating: 4.7,
    image: "/images/homedecor3.png",
    description: "A complete cozy decor set to elevate your living space.",
  },
  {
    id: "4",
    name: "Ceramic Plate",
    category: "Kitchen",
    price: 20,
    rating: 4.7,
    image: "/images/kitchen1.png",
    description: "Handmade ceramic plate crafted with attention to detail.",
  },
  {
    id: "5",
    name: "Handmade Mug",
    category: "Kitchen",
    price: 18,
    rating: 4.8,
    image: "/images/kitchen2.png",
    description: "A cozy handmade mug perfect for your morning coffee.",
  },
  {
    id: "6",
    name: "Wooden Bowl",
    category: "Kitchen",
    price: 22,
    rating: 4.9,
    image: "/images/kitchen3.png",
    description: "Natural wooden bowl with a smooth handcrafted finish.",
  },
  {
    id: "7",
    name: "Glass Cup Set",
    category: "Kitchen",
    price: 25,
    rating: 4.6,
    image: "/images/glass1.png",
    description: "Elegant glass cup set for everyday or special occasions.",
  },
  // (you can keep the rest of your products here)
];

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [darkMode, setDarkMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const product = products.find((p) => p.id === id);

  // ✅ Sync wishlist
  useEffect(() => {
    if (product?.id) {
      setSaved(isInWishlist(product.id));
    }
  }, [product]);

  // ✅ Toggle wishlist
  const handleWishlistClick = () => {
    if (!product) return;

    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    setSaved(isInWishlist(product.id));
  };

  if (!product) {
    return (
      <main className="min-h-screen bg-black p-6 text-white">
        <p className="text-xl">Product not found</p>
      </main>
    );
  }

  return (
    <main
      className={
        darkMode
          ? "min-h-screen bg-black text-white"
          : "min-h-screen bg-[#F7F7F7] text-black"
      }
    >
      <section className="flex flex-col gap-8 px-8 py-8 md:flex-row">
        {/* IMAGE */}
        <div className="w-full md:w-1/2">
          <Image
            id={`product-image-${product.id}`}
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="h-auto w-full rounded-lg object-cover"
          />
        </div>

        {/* DETAILS */}
        <div className="w-full md:w-1/2">
          <h1 className="mb-2 text-4xl font-bold">{product.name}</h1>
          <p className="mb-2 text-lg italic">{product.category}</p>

          <div className="mb-4 font-bold text-[#FCB33D]">
            ★★★★★{" "}
            <span className={darkMode ? "text-white" : "text-black"}>
              {product.rating}
            </span>
          </div>

          <p className="mb-6 text-lg">{product.description}</p>

          <p className="mb-6 text-2xl font-bold text-[#FCB33D]">
            ${product.price.toFixed(2)}
          </p>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/products"
              className="inline-block rounded-md bg-[#FCB33D] px-6 py-3 font-bold text-black"
            >
              Back to Products
            </Link>

            <button
              type="button"
              onClick={() => {
                const imageEl = document.getElementById(
                  `product-image-${product.id}`
                ) as HTMLImageElement;
                const cartIconEl = document.getElementById("cart-icon");

                if (imageEl && cartIconEl) {
                  flyToCart(imageEl, cartIconEl);
                }

                addToCartLocal(product as any, 1);
              }}
              className="rounded-md bg-[#FCB33D] px-6 py-3 font-bold text-black"
            >
              Add to Cart
            </button>

            {/* ✅ WISHLIST BUTTON */}
            <button
              type="button"
              onClick={handleWishlistClick}
              className={
                saved
                  ? "rounded-md bg-pink-600 px-6 py-3 font-bold text-white"
                  : darkMode
                    ? "rounded-md bg-gray-700 px-6 py-3 font-bold text-white"
                    : "rounded-md bg-gray-200 px-6 py-3 font-bold text-black"
              }
            >
              {saved ? "♥ Saved" : "♡ Add to Wishlist"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}