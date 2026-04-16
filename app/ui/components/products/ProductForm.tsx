"use client";

import { useEffect, useState } from "react";
import { ProductFormData } from "@/lib/types";

type ProductFormProps = {
  initialData?: ProductFormData | null;
  onSave: (product: ProductFormData) => void | Promise<void>;
};

type ProductFormState = {
  id?: string;
  name: string;
  category: string;
  price: string;
  stock: string;
  description: string;
  image?: string | null;
  details?: string | null;
};

export default function ProductForm({
  initialData,
  onSave,
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormState>({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    details: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        name: initialData.name ?? "",
        category: initialData.category ?? "",
        price: String(initialData.price ?? ""),
        stock: String(initialData.stock ?? ""),
        description: initialData.description ?? "",
        image: initialData.image ?? "",
        details: initialData.details ?? "",
      });
    }
  }, [initialData]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image is too large. Please choose a file under 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: typeof reader.result === "string" ? reader.result : "",
      }));
    };

    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await onSave({
      id: formData.id,
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      description: formData.description,
      image: formData.image ?? "",
      details: formData.details ?? "",
      rating_average: initialData?.rating_average ?? 0,
      rating_count: initialData?.rating_count ?? 0,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-4 rounded-2xl border bg-white p-6 shadow-sm"
    >
      <div>
        <label className="mb-1 block font-medium">Product Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Category</label>
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Price</label>
        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Stock Quantity</label>
        <input
          name="stock"
          type="number"
          min="0"
          step="1"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock Quantity"
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Upload Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full rounded-lg border p-3"
        />
      </div>

      {formData.image && (
        <div>
          <p className="mb-2 font-medium">Image Preview</p>
          <img
            src={formData.image}
            alt="Product Preview"
            className="h-24 w-24 rounded-lg border object-cover"
          />
        </div>
      )}

      <div>
        <label className="mb-1 block font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Details</label>
        <textarea
          name="details"
          value={formData.details ?? ""}
          onChange={handleChange}
          placeholder="Additional product details"
          rows={4}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-black px-5 py-3 text-white"
      >
        Save Product
      </button>
    </form>
  );
}