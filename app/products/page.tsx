"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Image from "next/image";

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
    category: "Kitchen",
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
];

const categories = ["All", "Kitchen", "Home Decor", "Jewelry", "Art"];

export default function ProductsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "under20" && product.price < 20) ||
        (priceFilter === "under30" && product.price < 30) ||
        (priceFilter === "30andup" && product.price >= 30);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, priceFilter, selectedCategory]);

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

      <section className="px-8 pb-4">
        <h2 className="mb-2 font-medium">Filter by category:</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-md px-4 py-2 font-bold ${
                selectedCategory === category
                  ? "bg-[#FCB33D] text-black"
                  : darkMode
                  ? "bg-gray-700 text-white"
                  : "bg-gray-200 text-black"
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
                width={300}
                height={180}
                className="h-auto w-full max-w-[300px] rounded-lg object-cover md:h-[180px] md:w-[180px]"
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