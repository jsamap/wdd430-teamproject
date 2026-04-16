"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type ProfileFormData = {
  name: string;
  email: string;
};

export default function EditProfilePage() {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/users/me", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const user = await res.json();

        setFormData({
          name: user.name ?? "",
          email: user.email ?? "",
        });
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      router.push("/admin/profile");
      router.refresh();
    } catch (error) {
      console.error("Failed to save profile:", error);
      alert("Failed to update profile");
    }
  }

  if (loading) {
    return <div className="p-6">Loading form...</div>;
  }

  return (
    <section className="space-y-6 p-6">
      <h2 className="text-2xl font-semibold">Edit Profile</h2>

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