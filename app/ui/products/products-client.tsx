"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProductsClient({ products }: { products: any[] }) {
  const [darkMode, setDarkMode] = useState(false);

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
        <div className="text-2xl font-bold">Handcrafted Haven</div>

        <nav className="flex flex-wrap gap-4 font-bold">
          <Link href="/" className="hover:text-[#FCB33D] hover:underline">
            Home
          </Link>
          <Link href="/products" className="hover:text-[#FCB33D] hover:underline">
            Products
          </Link>
          <Link href="/cart" className="hover:text-[#FCB33D] hover:underline">
            Cart
          </Link>
          <Link href="/contact" className="hover:text-[#FCB33D] hover:underline">
            Contact
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setDarkMode((prev) => !prev)}
          className="rounded-md bg-[#FCB33D] px-4 py-2 font-bold text-black"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      <section className="px-8 py-6 text-center">
        <input
          type="text"
          placeholder="Search products..."
          aria-label="Search products"
          className={
            darkMode
              ? "w-full max-w-xl rounded-md border border-gray-600 bg-gray-900 px-4 py-3 text-white shadow-sm"
              : "w-full max-w-xl rounded-md border border-gray-300 bg-white px-4 py-3 text-black shadow-sm"
          }
        />
      </section>

      <section className="px-8 pb-4">
        <label htmlFor="priceFilter" className="font-medium">
          Filter by price:
        </label>
        <select
          id="priceFilter"
          className={
            darkMode
              ? "ml-2 rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-white"
              : "ml-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-black"
          }
        >
          <option value="all">All</option>
          <option value="under20">Under $20</option>
          <option value="under30">Under $30</option>
          <option value="30andup">$30 and up</option>
        </select>
      </section>

      <section className="px-8 pb-4">
        <h1 className="text-4xl font-bold">Our Products</h1>
      </section>

      <section className="flex flex-col gap-6 px-8 pb-8">
        {products.map((product) => {
          return (
            <article
              key={product.id}
              className={
                darkMode
                  ? "flex flex-col items-center gap-4 rounded-xl bg-gray-800 p-4 shadow-md md:flex-row md:items-center"
                  : "flex flex-col items-center gap-4 rounded-xl bg-white p-4 shadow-md md:flex-row md:items-center"
              }
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-auto w-full max-w-[300px] rounded-lg object-cover md:h-[180px] md:w-[180px]"
              />

              <div className="w-full">
                <h2 className="mb-2 text-2xl font-bold">{product.name}</h2>
                <p className="mb-2">{product.description}</p>

                <div className="mb-2 font-bold text-[#FCB33D]">
                  ★★★★★{" "}
                  <span className={darkMode ? "text-white" : "text-black"}>
                    {product.rating_average}/5 ({product.rating_count} reviews)
                  </span>
                </div>

                <p className="my-3 text-xl font-bold text-[#FCB33D]">
                  ${Number(product.price).toFixed(2)}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/products/${product.id}`}
                    className="rounded-md bg-[#FCB33D] px-5 py-3 font-bold text-black"
                  >
                    View Details
                  </Link>

                  <button
                    type="button"
                    className="rounded-md bg-[#FCB33D] px-5 py-3 font-bold text-black"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          );
        })}
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
