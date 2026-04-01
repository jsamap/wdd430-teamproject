"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProfileCard from "@/components/profile/ProfileCard";
import { getProfile } from "@/lib/profile-storage";
import type { Profile } from "@/lib/types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const profileData = getProfile();
    setProfile(profileData);
  }, []);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <section className="space-y-6">
      <div className="flex justify-end">
        <Link
          href="/admin/profile/edit"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Edit Profile
        </Link>
      </div>

      <ProfileCard profile={profile} />
    </section>
  );
}