"use client";

import { useState } from "react";

export default function ProfileForm({ initialData, onSave }: any) {
  const [formData, setFormData] = useState(initialData);

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
        avatar: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    onSave(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-4 rounded-2xl border bg-white p-6 shadow-sm"
    >
      <div>
        <label className="mb-1 block font-medium">First Name</label>
        <input
          name="firstName"
          value={formData.firstName || ""}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Last Name</label>
        <input
          name="lastName"
          value={formData.lastName || ""}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email || ""}
          onChange={handleChange}
          placeholder="Email"
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Phone Number</label>
        <input
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Upload Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full rounded-lg border p-3"
        />
      </div>

      {formData.avatar && (
        <div>
          <p className="mb-2 font-medium">Image Preview</p>
          <img
            src={formData.avatar}
            alt="Profile Preview"
            className="h-24 w-24 rounded-full border object-cover"
          />
        </div>
      )}

      <div>
        <label className="mb-1 block font-medium">Bio</label>
        <textarea
          name="bio"
          value={formData.bio || ""}
          onChange={handleChange}
          placeholder="Bio"
          rows={4}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-black px-5 py-3 text-white"
      >
        Save Changes
      </button>
    </form>
  );
}