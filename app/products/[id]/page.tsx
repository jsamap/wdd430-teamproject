"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { addToCartLocal } from "@/app/lib/actions/local.actions";
import { flyToCart } from "@/app/ui/animation/animation";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
};

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
  {
    id: "8",
    name: "Beaded Bracelet",
    category: "Jewelry",
    price: 12,
    rating: 4.8,
    image: "/images/jewelry4.png",
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
    name: "Village Sculpture",
    category: "Art",
    price: 45,
    rating: 4.8,
    image: "/images/art2.png",
    description: "Modern sculpture piece that adds character to any space",
  },
  {
    id: "13",
    name: "Canvas painting",
    category: "Art",
    price: 50,
    rating: 4.7,
    image: "/images/art3.png",
    description: "High-quality canvas artwork with vibrant colors.",
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
    name: "Key to the town rack",
    category: "Woodworking",
    price: 30,
    rating: 4.7,
    image: "/images/smallwoodcraft1.png",
    description: "Safe place to keep your keys.",
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
    name: "Brush and sponge Tool Kit",
    category: "Tools",
    price: 22,
    rating: 4.6,
    image: "/images/tools3.png",
    description: "Multi-purpose brush and sponge kit for crafting.",
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
    name: "Pottery jug",
    category: "Pottery",
    price: 20,
    rating: 4.6,
    image: "/images/pottery4.png",
    description: "Handmade pottery jug with unique patterns.",
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
    name: "Modern Coffee Table",
    category: "Furniture",
    price: 85,
    rating: 4.6,
    image: "/images/furniture4.png",
    description: "Stylish modern coffee Table.",
  },
  {
    id: "38",
    name: "White Modern furniture set",
    category: "Furniture",
    price: 60,
    rating: 4.8,
    image: "/images/furniture5.png",
    description: "White Modern furniture set.",
  },
  {
    id: "39",
    name: "Charcocal Love seat",
    category: "Furniture",
    price: 95,
    rating: 4.7,
    image: "/images/furniture6.png",
    description: "Bueatiful love seat.",
  },
  {
    id: "40",
    name: "Twin chair set",
    category: "Furniture",
    price: 110,
    rating: 4.9,
    image: "/images/furniture7.png",
    description: "Modern and clean twin chairs.",
  },
  {
    id: "41",
    name: "Matching chair set",
    category: "Furniture",
    price: 75,
    rating: 4.6,
    image: "/images/furniture8.png",
    description: "matching chair set.",
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
    name: "Ocean sented candel",
    category: "Gifts",
    price: 18,
    rating: 4.7,
    image: "/images/gift3.png",
    description: "Ocean sented candel.",
  },
  {
    id: "45",
    name: "Cozy Candle",
    category: "Gifts",
    price: 16,
    rating: 4.9,
    image: "/images/gift4.png",
    description: "Cozy Candle.",
  },
  {
    id: "46",
    name: "Wood sented candle",
    category: "Gifts",
    price: 25,
    rating: 4.8,
    image: "/images/gift5.png",
    description: "Wood sented candle.",
  },
  {
    id: "47",
    name: "Crotche toy goat",
    category: "Gifts",
    price: 28,
    rating: 4.7,
    image: "/images/gift6.png",
    description: "Crotche toy goat.",
  },
];

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
          <div className="flex gap-4">
            {" "}
            <Link
              href="/products"
              className="rounded-md bg-[#FCB33D] px-6 py-3 font-bold text-black inline-block"
            >
              Back to Products
            </Link>
            <button
              type="button"
              onClick={() => {
                const imageEl = document.getElementById(
                  `product-image-${product.id}`,
                ) as HTMLImageElement;
                const cartIconEl = document.getElementById("cart-icon");

                if (imageEl && cartIconEl) {
                  flyToCart(imageEl, cartIconEl);
                }
                addToCartLocal(product, 1);
              }}
              className="rounded-md bg-[#FCB33D] px-6 py-3 font-bold text-black"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
