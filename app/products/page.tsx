"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  rating?: number;
};

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

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
          priority
          style={{ width: "180px", height: "auto" }}
        />

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
        <h2 className="mb-4 text-center text-2xl font-medium">Shop by Category</h2>

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
        {loading ? (
          <p className="px-2 text-lg">Loading products...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <article
              key={product.id}
              className={
                darkMode
                  ? "flex flex-col items-center gap-4 rounded-xl bg-gray-800 p-4 shadow-md md:flex-row md:items-center"
                  : "flex flex-col items-center gap-4 rounded-xl bg-white p-4 shadow-md md:flex-row md:items-center"
              }
            >
              <Image
                src={product.image}
                alt={product.name}
                width={180}
                height={180}
                style={{ width: "180px", height: "auto" }}
                className="rounded-lg object-cover"
              />

              <div className="w-full">
                <h2 className="mb-2 text-2xl font-bold">{product.name}</h2>
                <p className="mb-1 text-sm italic">{product.category}</p>
                <p className="mb-2">{product.description}</p>

                <div className="mb-2 font-bold text-[#FCB33D]">
                  ★★★★★{" "}
                  <span className={darkMode ? "text-white" : "text-black"}>
                    {product.rating}
                  </span>
                </div>

                <p className="my-3 text-xl font-bold text-[#FCB33D]">
                  ${product.price.toFixed(2)}
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
          ))
        ) : (
          <p className="px-2 text-lg">No products match your filters.</p>
        )}
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