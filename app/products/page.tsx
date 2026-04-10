"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Image from "next/image";
import { addToCartLocal } from "@/app/lib/actions/local.actions";
import { useTransition } from "react";

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
    image: "/images/kitchen4.png",
    description: "Elegant glass cup set for everyday or special occasions.",
  },
  {
    id: "8",
    name: "Beaded Bracelet",
    category: "Jewelry",
    price: 12,
    rating: 4.8,
    image: "/images/jewelry1.png",
    description: "Colorful handmade bracelet designed with care.",
  },
  {
    id: "9",
    name: "Handmade Ring",
    category: "Jewelry",
    price: 15,
    rating: 4.7,
    image: "/images/jewelry2.png",
    description: "A unique handcrafted ring to match your style.",
  },
  {
    id: "10",
    name: "Clay Earrings",
    category: "Jewelry",
    price: 14,
    rating: 4.9,
    image: "/images/jewelry3.png",
    description: "Lightweight clay earrings with modern designs.",
  },
  {
    id: "11",
    name: "Abstract Painting",
    category: "Art",
    price: 40,
    rating: 4.9,
    image: "/images/art1.png",
    description: "A bold abstract painting to brighten any room.",
  },
  {
    id: "12",
    name: "Canvas Artwork",
    category: "Art",
    price: 45,
    rating: 4.8,
    image: "/images/art2.png",
    description: "High-quality canvas artwork with vibrant colors.",
  },
  {
    id: "13",
    name: "Modern Sculpture",
    category: "Art",
    price: 50,
    rating: 4.7,
    image: "/images/art3.png",
    description: "Modern sculpture piece that adds character to any space.",
  },
  {
    id: "14",
    name: "Wall Art Piece",
    category: "Art",
    price: 38,
    rating: 4.6,
    image: "/images/art4.png",
    description: "Beautiful wall art designed to complement any decor.",
  },
  {
    id: "15",
    name: "Wooden Bench",
    category: "Woodworking",
    price: 80,
    rating: 4.9,
    image: "/images/woodbench1.png",
    description: "Durable handcrafted wooden bench built to last.",
  },
  {
    id: "16",
    name: "Wooden Table",
    category: "Woodworking",
    price: 120,
    rating: 4.8,
    image: "/images/woodentable1.png",
    description: "Elegant wooden table made with premium materials.",
  },
  {
    id: "17",
    name: "Wood Toy Set",
    category: "Woodworking",
    price: 30,
    rating: 4.7,
    image: "/images/smallwoodcraft1.png",
    description: "Safe and fun wooden toy set for kids.",
  },
  {
    id: "18",
    name: "Acrylic Paint Set",
    category: "Paints",
    price: 20,
    rating: 4.8,
    image: "/images/paints1.png",
    description: "High-quality acrylic paint set for artists.",
  },
  {
    id: "19",
    name: "Paint Brushes",
    category: "Paints",
    price: 15,
    rating: 4.7,
    image: "/images/paints2.png",
    description: "Durable paint brushes for smooth strokes.",
  },
  {
    id: "20",
    name: "Color Palette Kit",
    category: "Paints",
    price: 18,
    rating: 4.6,
    image: "/images/paints3.png",
    description: "Complete palette kit for mixing colors easily.",
  },
  {
    id: "21",
    name: "Artist Supply Set",
    category: "Paints",
    price: 25,
    rating: 4.9,
    image: "/images/paints4.png",
    description: "All-in-one artist supply kit for beginners and pros.",
  },
  {
    id: "22",
    name: "Hammer & Chisel Set",
    category: "Tools",
    price: 35,
    rating: 4.7,
    image: "/images/tools1.png",
    description: "Essential tools for woodworking and carving.",
  },
  {
    id: "23",
    name: "Carving Tools",
    category: "Tools",
    price: 28,
    rating: 4.8,
    image: "/images/tools2.png",
    description: "Precision carving tools for detailed work.",
  },
  {
    id: "24",
    name: "Brush Tool Kit",
    category: "Tools",
    price: 22,
    rating: 4.6,
    image: "/images/tools3.png",
    description: "Multi-purpose brush kit for crafting.",
  },
  {
    id: "25",
    name: "Craft Sponge Set",
    category: "Tools",
    price: 12,
    rating: 4.5,
    image: "/images/tools4.png",
    description: "Soft sponges ideal for painting and textures.",
  },
  {
    id: "26",
    name: "Clay Vase",
    category: "Pottery",
    price: 26,
    rating: 4.9,
    image: "/images/pottery1.png",
    description: "Elegant clay vase handcrafted by artisans.",
  },
  {
    id: "27",
    name: "Ceramic Jug",
    category: "Pottery",
    price: 30,
    rating: 4.8,
    image: "/images/pottery2.png",
    description: "Traditional ceramic jug with a modern twist.",
  },
  {
    id: "28",
    name: "Decor Pitcher",
    category: "Pottery",
    price: 34,
    rating: 4.7,
    image: "/images/pottery3.png",
    description: "Decorative pitcher perfect for display.",
  },
  {
    id: "29",
    name: "Pottery Plate",
    category: "Pottery",
    price: 20,
    rating: 4.6,
    image: "/images/pottery4.png",
    description: "Handmade pottery plate with unique patterns.",
  },
  {
    id: "30",
    name: "Woven Basket",
    category: "Basketry",
    price: 22,
    rating: 4.8,
    image: "/images/basket1.png",
    description: "Durable woven basket for storage or decor.",
  },
  {
    id: "31",
    name: "Storage Basket",
    category: "Basketry",
    price: 24,
    rating: 4.7,
    image: "/images/basket2.png",
    description: "Stylish storage basket for organizing spaces.",
  },
  {
    id: "32",
    name: "Decor Basket",
    category: "Basketry",
    price: 20,
    rating: 4.6,
    image: "/images/basket3.png",
    description: "Decorative basket that blends style and function.",
  },
  {
    id: "33",
    name: "Gift Basket",
    category: "Basketry",
    price: 18,
    rating: 4.9,
    image: "/images/basket4.png",
    description: "Perfect basket for gifting and special occasions.",
  },
  {
    id: "34",
    name: "Wooden Chair",
    category: "Furniture",
    price: 70,
    rating: 4.8,
    image: "/images/furniture1.png",
    description: "Comfortable wooden chair with a classic design.",
  },
  {
    id: "35",
    name: "Dining Table",
    category: "Furniture",
    price: 150,
    rating: 4.9,
    image: "/images/furniture2.png",
    description: "Spacious dining table for family gatherings.",
  },
  {
    id: "36",
    name: "Coffee Table",
    category: "Furniture",
    price: 90,
    rating: 4.7,
    image: "/images/furniture3.png",
    description: "Modern coffee table with sleek lines.",
  },
  {
    id: "37",
    name: "Accent Chair",
    category: "Furniture",
    price: 85,
    rating: 4.6,
    image: "/images/furniture4.png",
    description: "Stylish accent chair for any room.",
  },
  {
    id: "38",
    name: "Wood Shelf",
    category: "Furniture",
    price: 60,
    rating: 4.8,
    image: "/images/furniture5.png",
    description: "Simple and sturdy wooden shelf.",
  },
  {
    id: "39",
    name: "Storage Bench",
    category: "Furniture",
    price: 95,
    rating: 4.7,
    image: "/images/furniture6.png",
    description: "Functional storage bench with seating.",
  },
  {
    id: "40",
    name: "Modern Table",
    category: "Furniture",
    price: 110,
    rating: 4.9,
    image: "/images/furniture7.png",
    description: "Modern table with a clean aesthetic.",
  },
  {
    id: "41",
    name: "Rustic Shelf",
    category: "Furniture",
    price: 75,
    rating: 4.6,
    image: "/images/furniture8.png",
    description: "Rustic-style shelf for farmhouse decor.",
  },
  {
    id: "42",
    name: "Gift Box Set",
    category: "Gifts",
    price: 20,
    rating: 4.9,
    image: "/images/gift1.png",
    description: "Curated gift box set for special occasions.",
  },
  {
    id: "43",
    name: "Candle Gift Set",
    category: "Gifts",
    price: 22,
    rating: 4.8,
    image: "/images/gift2.png",
    description: "Scented candle set for relaxation.",
  },
  {
    id: "44",
    name: "Handmade Soap Kit",
    category: "Gifts",
    price: 18,
    rating: 4.7,
    image: "/images/gift3.png",
    description: "Natural handmade soap kit.",
  },
  {
    id: "45",
    name: "Crochet Gift",
    category: "Gifts",
    price: 16,
    rating: 4.9,
    image: "/images/gift4.png",
    description: "Soft crochet gift made with love.",
  },
  {
    id: "46",
    name: "Artisan Gift Box",
    category: "Gifts",
    price: 25,
    rating: 4.8,
    image: "/images/gift5.png",
    description: "Premium artisan gift box collection.",
  },
  {
    id: "47",
    name: "Decor Gift Set",
    category: "Gifts",
    price: 28,
    rating: 4.7,
    image: "/images/gift6.png",
    description: "Decor-themed gift set for any occasion.",
  },
];

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
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isPending, startTransition] = useTransition();

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
  }, [searchTerm, priceFilter, selectedCategory]);

 

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
                    onClick={() => {
                      addToCartLocal(product, 1);
                    }}
                    disabled={isPending}
                    className="rounded-md bg-[#FCB33D] px-5 py-3 font-bold text-black"
                  >
                    {isPending ? "Adding..." : "Add to Cart"}
                  </button>
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
