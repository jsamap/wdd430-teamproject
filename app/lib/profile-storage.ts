"use client";

import type { Profile } from "./types";

const defaultProfile: Profile = {
  id: "1",
  firstName: "Arujan",
  lastName: "Abilmajin",
  email: "arujan@example.com",
  phone: "+7 777 123 4567",
  avatar: "/images/profile-placeholder.png",
  bio: "Creator and seller of handmade products.",
};

export const getProfile = (): Profile | null => {
    console.log("PROFILE STORAGE WORKS");
  if (typeof window === "undefined") return null;

  const savedProfile = localStorage.getItem("profile");

  if (savedProfile) {
    return JSON.parse(savedProfile);
  }

  localStorage.setItem("profile", JSON.stringify(defaultProfile));
  return defaultProfile;
};

export const saveProfile = (profile: Profile): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("profile", JSON.stringify(profile));
};