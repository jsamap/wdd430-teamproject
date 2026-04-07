"use client";

import { useState } from "react";

export default function ProductForm({ initialData, onSave }: any) {
  const [formData, setFormData] = useState(
    initialData || {
      id: crypto.randomUUID(),
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: "",
      status: "active",
    }
  );

  function handleChange(e: any) {
    const { name, value } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageChange(e: any) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image is too large. Please choose a file under 2MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev: any) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    onSave({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
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
          value={formData.name || ""}
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
          value={formData.category || ""}
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
          value={formData.price || ""}
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
          value={formData.stock || ""}
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
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Status</label>
        <select
          name="status"
          value={formData.status || "active"}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
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