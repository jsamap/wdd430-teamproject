"use client";

import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { useState } from "react";

const products = [
  {
    id: "1",
    name: "Wooden Bowl",
    category: "Kitchen",
    description: "A handcrafted wooden bowl perfect for home décor or serving.",
    price: 25,
    rating: 4.8,
    image: "/product1.jpg",
  },
  {
    id: "2",
    name: "Ceramic Mug",
    category: "Pottery",
    description: "A beautifully made ceramic mug for your favorite hot drink.",
    price: 18,
    rating: 4.7,
    image: "/product2.jpg",
  },
  {
    id: "3",
    name: "Handwoven Basket",
    category: "Home Decor",
    description: "A natural woven basket great for storage and decoration.",
    price: 30,
    rating: 4.9,
    image: "/product3.jpg",
  },
  {
    id: "4",
    name: "Handmade Necklace",
    category: "Jewelry",
    description: "A unique handmade necklace crafted to add charm to any outfit.",
    price: 35,
    rating: 4.6,
    image: "/product4.jpg",
  },
  {
    id: "5",
    name: "Canvas Wall Art",
    category: "Art",
    description: "A handcrafted art piece designed to brighten your living space.",
    price: 40,
    rating: 4.9,
    image: "/product5.jpg",
  },
  {
    id: "6",
    name: "Woodworking Project",
    category: "Woodworking",
    description: "Custom handcrafted woodwork pieces made with precision.",
    price: 60,
    rating: 4.9,
    image: "/product6.jpg",
  },
  {
    id: "7",
    name: "Pottery Vase",
    category: "Pottery",
    description: "Hand-thrown pottery with beautiful natural finishes.",
    price: 45,
    rating: 4.8,
    image: "/product7.jpg",
  },
];

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [darkMode, setDarkMode] = useState(false);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <main
        className={
          darkMode
            ? "min-h-screen bg-black p-6 text-white"
            : "min-h-screen bg-[#F7F7F7] p-6 text-black"
        }
      >
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
      <header
        className={
          darkMode
            ? "sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 bg-black px-8 py-4 text-white shadow-md"
            : "sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 bg-[#6496FA] px-8 py-4 text-white shadow-md"
        }
      >
        <Image
          src="/hh-logo.png"
          alt="Handcrafted Haven Logo"
          width={180}
          height={50}
        />

        <div className="flex items-center gap-4">
          <Link href="/products" className="font-bold hover:underline">
            ← Back to Products
          </Link>

          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            className="rounded-md bg-[#FCB33D] px-4 py-2 font-bold text-black"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </header>

      <section className="flex flex-col gap-8 px-8 py-8 md:flex-row">
        <div className="w-full md:w-1/2">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="h-auto w-full rounded-lg object-cover"
          />
        </div>

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

          <button
            type="button"
            className="rounded-md bg-[#FCB33D] px-6 py-3 font-bold text-black"
          >
            Add to Cart
          </button>
        </div>
      </section>

      <footer
        className={
          darkMode
            ? "mt-8 bg-black px-4 py-4 text-center text-white"
            : "mt-8 bg-[#6496FA] px-4 py-4 text-center text-white"
        }
      >
        <p>&copy; 2026 Handcrafted Haven | All Rights Reserved</p>
      </footer>
    </main>
  );
}