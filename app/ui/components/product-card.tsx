'use client';

import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react"; // ✅ import session hook

interface ProductCardProps {
  id: string;
  name: string;
  seller: string;
  price: number;
  image: string;
  rating: number;
}

export default function ProductCard({ id, name, seller, price, image, rating }: ProductCardProps) {
  const { data: session } = useSession();
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    if (!session?.user) return;

    const checkStatus = async () => {
      try {
        const res = await fetch("/api/wishlist/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: id }),
        });

        if (res.ok) {
          const data = await res.json();
          setWishlisted(data.isWishlisted);
        } else {
          console.error("Failed to check wishlist status");
        }
      } catch (err) {
        console.error("Error checking wishlist status:", err);
      }
    };

    checkStatus();
  }, [id, session]);

  const toggleWishlist = async () => {
    try {
      const endpoint = wishlisted ? "/api/wishlist/remove" : "/api/wishlist/add";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
      });

      if (res.ok) {
        setWishlisted(!wishlisted);
      } else {
        const error = await res.text();
        console.error("Wishlist request failed:", error);
      }
    } catch (err) {
      console.error("Error toggling wishlist:", err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 text-center max-w-[250px] mx-auto 
                    transform transition duration-300 hover:scale-105 hover:shadow-lg flex flex-col">
      <div className="w-full aspect-square relative">
        <Image
          src={image || "https://placehold.co/200x200"}
          alt={name}
          width={400}
          height={400}
          className="object-cover w-full h-full rounded transition duration-300 hover:opacity-90 aspect-square"
        />

        {/* Wishlist toggle button only if logged in */}
        {session?.user && (
          <button
            onClick={toggleWishlist}
            className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow 
             hover:bg-hhorange-300 transition"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <HeartIcon
              className={`h-6 w-6 transition-colors duration-300 
              ${wishlisted ? "text-red-500 animate-pop" : "text-gray-400"}`}
            />
          </button>
        )}
      </div>

      <div className="flex-grow flex flex-col items-center justify-center mt-4">
        <h3 className="font-semibold">{name}</h3>
        <p>{seller}</p>
        <p className="text-gray-600">${price.toFixed(2)}</p>
      </div>
      <div className="mb-2 flex justify-center">
        {[...Array(5)].map((_, i) =>
          i < Math.round(rating) ? (
            <StarIcon key={i} className="h-5 w-5 text-[#FCB33D]" />
          ) : (
            <StarOutline key={i} className="h-5 w-5 text-gray-300" />
          )
        )}
      </div>

      <div className="mt-4">
        <Link
          href={`/products/${id}`}
          className="block w-full px-4 py-2 bg-hhblue-400 text-white rounded 
                     hover:bg-hhorange-600 transition duration-300"
        >
          See details
        </Link>
      </div>
    </div>
  );
}
