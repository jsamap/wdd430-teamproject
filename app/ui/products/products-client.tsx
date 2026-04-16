"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Image from "next/image";
import ReviewRating from "../reviews/ReviewRating";
import AddToCartButton from "../AddToCartButton";

const categories = [
  "All",
  "Home Decor",
  "Kitchen",
  "Jewelry",
  "Art",
  "Furniture",
  "Gifts",
  "Woodworking",
  "Paints",
  "Tools",
  "Pottery",
  "Basketry",
];

const PLACEHOLDER_IMAGE =
  "https://i.ibb.co/gMsLBjDv/terracota-plant-pot.webp";

function categoryFromUrlParam(param?: string | null) {
  if (!param) return "All";
  const decoded = decodeURIComponent(param.trim());
  const found = categories.find((c) => c.toLowerCase() === decoded.toLowerCase());
  return found ?? "All";
}

export default function ProductsClient({
  products,
  initialCategory,
}: {
  products: any[];
  initialCategory?: string | null;
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(() =>
    categoryFromUrlParam(initialCategory),
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description &&
          product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.category &&
          product.category.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" ||
        (product.category &&
          product.category.toLowerCase() === selectedCategory.toLowerCase());

      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "under20" && product.price < 20) ||
        (priceFilter === "under30" && product.price < 30) ||
        (priceFilter === "30andup" && product.price >= 30);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [products, searchTerm, priceFilter, selectedCategory]);

  return (
    <main
      className={
        darkMode
          ? "min-h-screen bg-black text-white"
          : "min-h-screen bg-[#F7F7F7] text-black"
      }
    >
      <section className="px-8 py-6 text-center">
        <input
          type="text"
          placeholder="Search products..."
          aria-label="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
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

      <section className="px-8 pb-6">
        <h2 className="mb-4 text-center text-2xl font-medium">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-2xl border-2 px-8 py-6 text-lg font-bold transition ${
                selectedCategory === category
                  ? "border-[#6496FA] bg-[#FCB33D] text-black"
                  : darkMode
                    ? "border-[#6496FA] bg-gray-800 text-white"
                    : "border-[#6496FA] bg-white text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="px-8 pb-4">
        <h1 className="text-4xl font-bold">Our Products</h1>
      </section>

      <section className="flex flex-col gap-6 px-8 pb-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <article
              key={`${product.id}-${product.name}`}
              className={
                darkMode
                  ? "flex flex-col items-center gap-4 rounded-xl bg-gray-800 p-4 shadow-md md:flex-row md:items-center"
                  : "flex flex-col items-center gap-4 rounded-xl bg-white p-4 shadow-md md:flex-row md:items-center"
              }
            >
              <Image
                src={product.image || PLACEHOLDER_IMAGE}
                alt={product.name}
                width={180}
                height={180}
                style={{ width: "180px", height: "auto" }}
                className="rounded-lg object-cover"
                unoptimized
              />

              <div className="w-full">
                <h2 className="mb-2 text-2xl font-bold">{product.name}</h2>
                <p className="mb-1 text-sm italic">{product.category}</p>
                <p className="mb-2">{product.description}</p>

                <div className="mb-2 font-bold text-[#FCB33D]">
                  <ReviewRating rating={product.rating_average} count={product.rating_count} />
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

                  <AddToCartButton product={product} />
                </div>
              </div>
            </article>
          ))
        ) : (
          <p className="px-2 text-lg">No products match your filters.</p>
        )}
      </section>
    </main>
  );
}
