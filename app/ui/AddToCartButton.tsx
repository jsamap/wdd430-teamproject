"use client";

import { addToCartLocal } from "@/app/lib/actions/local.actions";
import { useTransition } from "react";

export default function AddToCartButton({ product }: { product: any }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => {
        startTransition(() => {
          addToCartLocal(product, 1);
        });
      }}
      disabled={isPending}
      className="rounded-md bg-[#FCB33D] px-6 py-3 font-bold text-black hover:bg-orange-400"
    >
      {isPending ? "Adding..." : "Add to Cart"}
    </button>
  );
}
