"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
};

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [darkMode, setDarkMode] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <main className="min-h-screen bg-black p-6 text-white">
        <p className="text-xl">Loading or Product not found...</p>
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
          src="/images/hh-logo.png"
          alt="Handcrafted Haven Logo"
          width={180}
          height={50}
          style={{ width: "180px", height: "auto" }}
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

          <button className="rounded-md bg-[#FCB33D] px-6 py-3 font-bold text-black">
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