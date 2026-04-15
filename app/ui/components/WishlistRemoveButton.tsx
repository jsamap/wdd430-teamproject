'use client';

import { TrashIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

type WishlistButtonProps = {
  productId: string;
};

export default function WishlistRemoveButton({ productId }: WishlistButtonProps) {
  const router = useRouter();

  const removeFromWishlist = async () => {
    try {
      const res = await fetch("/api/wishlist/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        router.refresh();
      } else {
        console.error("Remove from wishlist failed:", await res.text());
      }
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={removeFromWishlist}
      className="rounded-md px-3 py-3 font-bold text-white transition bg-gray-400 hover:bg-red-700 flex items-center justify-center"
      aria-label="Remove from Wishlist"
    >
      <TrashIcon className="h-6 w-6" />
    </button>
  );
}
