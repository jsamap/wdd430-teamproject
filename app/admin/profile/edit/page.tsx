"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileForm from "../../../../components/profile/ProfileForm";
import { getProfile, saveProfile } from "../../../../lib/profile-storage";

export default function EditProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const profileData = getProfile();
    setProfile(profileData);
  }, []);

  function handleSave(updatedProfile: any) {
    saveProfile(updatedProfile);
    router.push("/admin/profile");
  }

  if (!profile) {
    return <div>Loading form...</div>;
  }

  return (
    <section>
      <ProfileForm
        initialData={profile}
        onSave={handleSave}
      />
    </section>
  );
}