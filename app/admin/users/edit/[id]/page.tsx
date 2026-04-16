"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type UserFormData = {
  name: string;
  email: string;
  role: string;
};

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch(`/api/users/${params.id}`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const user = await res.json();

        setFormData({
          name: user.name ?? "",
          email: user.email ?? "",
          role: user.role ?? "",
        });
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadUser();
    }
  }, [params.id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(`/api/users/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update user");
      }

      router.push("/admin/users");
      router.refresh();
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update user");
    }
  }

  if (loading) {
    return <div className="p-6">Loading user...</div>;
  }

  return (
    <section className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold">Edit User</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl space-y-4 rounded-2xl border bg-white p-6 shadow-sm"
      >
        <div>
          <label className="mb-1 block font-medium">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-black px-5 py-3 text-white"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
}