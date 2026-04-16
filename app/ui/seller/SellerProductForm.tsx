"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSellerProduct, updateSellerProduct } from "@/app/lib/actions/seller.actions";

type ProductShape = {
  id?: string;
  name?: string;
  category?: string;
  description?: string;
  price?: number;
  stock?: number;
  image?: string | null;
  details?: string | null;
};

type Props = {
  mode: "create" | "edit";
  initial?: ProductShape | null;
};

export default function SellerProductForm({ mode, initial }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? "");
  const [category, setCategory] = useState(initial?.category ?? "");
  const [price, setPrice] = useState(initial?.price != null ? String(initial.price) : "");
  const [stock, setStock] = useState(initial?.stock != null ? String(initial.stock) : "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [details, setDetails] = useState(initial?.details ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setMessage(null);

    const fd = new FormData();
    fd.set("name", name);
    fd.set("category", category);
    fd.set("price", price);
    fd.set("stock", stock);
    fd.set("description", description);
    fd.set("details", details);
    fd.set("image", image);

    const action = mode === "create" ? createSellerProduct : updateSellerProduct;
    if (mode === "edit" && initial?.id) {
      fd.set("productId", initial.id);
    }

    const result = await action(fd);
    setPending(false);

    const fieldErrors = (result as { errors?: Record<string, string[] | undefined> }).errors;
    const hasFieldErrors =
      fieldErrors && Object.values(fieldErrors).some((arr) => Array.isArray(arr) && arr.length > 0);

    setMessage(result.message ?? null);

    if (hasFieldErrors) {
      return;
    }

    if (mode === "create" && result.message === "Product created.") {
      router.push("/seller/products");
      router.refresh();
      return;
    }

    if (mode === "edit" && result.message === "Product updated.") {
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4 rounded-xl border bg-white p-6 shadow-sm">
      <div>
        <label className="mb-1 block font-medium">Product name</label>
        <input
          className="w-full rounded-lg border p-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="mb-1 block font-medium">Category</label>
        <input
          className="w-full rounded-lg border p-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Pottery"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block font-medium">Price (USD)</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            className="w-full rounded-lg border p-3"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-1 block font-medium">Stock</label>
          <input
            type="number"
            min="0"
            step="1"
            className="w-full rounded-lg border p-3"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block font-medium">Image URL</label>
        <input
          className="w-full rounded-lg border p-3"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="/images/your-photo.jpg or https://…"
        />
        <p className="mt-1 text-xs text-gray-500">
          Use a path under the <code className="rounded bg-gray-100 px-1">public</code> folder or a full image URL.
        </p>
      </div>
      <div>
        <label className="mb-1 block font-medium">Description</label>
        <textarea
          className="w-full rounded-lg border p-3"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="mb-1 block font-medium">Extra details (optional)</label>
        <textarea
          className="w-full rounded-lg border p-3"
          rows={3}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-black px-5 py-2 text-white disabled:opacity-50"
        >
          {pending ? "Saving…" : mode === "create" ? "Create product" : "Update product"}
        </button>
        <button
          type="button"
          className="rounded-lg border border-gray-300 px-5 py-2"
          onClick={() => router.push("/seller/products")}
        >
          Cancel
        </button>
      </div>
      {message && <p className="text-sm text-gray-800">{message}</p>}
    </form>
  );
}
