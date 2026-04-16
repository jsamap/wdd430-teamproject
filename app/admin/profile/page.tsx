"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/users/me", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Profile load error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return <div className="p-6">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="p-6">Profile not found</div>;
  }

  return (
    <section className="space-y-6 p-6">
      <div className="flex justify-end">
        <Link
          href="/admin/profile/edit"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Edit Profile
        </Link>
      </div>

      <div className="max-w-xl rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold">{profile.name}</h2>
        <p className="mt-2 text-gray-600">{profile.email}</p>

        <div className="mt-4">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
            {profile.role}
          </span>
        </div>
      </div>
    </section>
  );
}