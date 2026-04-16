import { Profile } from "@/app/lib/types";

export const getUsers = async (): Promise<Profile[]> => {
  const res = await fetch("/api/users", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
};