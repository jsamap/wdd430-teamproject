"use client";

import { useState } from "react";
import { updateSellerProfile } from "@/app/lib/actions/seller.actions";

type Props = {
  initial: {
    seller_tagline: string | null;
    seller_bio: string | null;
    seller_story: string | null;
  } | null;
  sellerId: string;
};

export default function SellerProfileForm({ initial, sellerId }: Props) {
  const [tagline, setTagline] = useState(initial?.seller_tagline ?? "");
  const [bio, setBio] = useState(initial?.seller_bio ?? "");
  const [story, setStory] = useState(initial?.seller_story ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setMessage(null);
    const fd = new FormData();
    fd.set("seller_tagline", tagline);
    fd.set("seller_bio", bio);
    fd.set("seller_story", story);
    const result = await updateSellerProfile(fd);
    setPending(false);
    setMessage(result.message ?? null);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <p className="text-gray-600">
        Shoppers can open your public page:{" "}
        <a className="font-medium text-[#6496FA] hover:underline" href={`/sellers/${sellerId}`}>
          View public seller page
        </a>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
        <div>
          <label className="mb-1 block font-medium">Short tagline</label>
          <input
            className="w-full rounded-lg border p-3"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            name="seller_tagline"
            placeholder="e.g. Hand-thrown pottery from Utah"
            maxLength={200}
          />
        </div>
        <div>
          <label className="mb-1 block font-medium">Bio</label>
          <textarea
            className="w-full rounded-lg border p-3"
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            name="seller_bio"
            placeholder="A few sentences about you and your craft."
          />
        </div>
        <div>
          <label className="mb-1 block font-medium">Your story (optional)</label>
          <textarea
            className="w-full rounded-lg border p-3"
            rows={6}
            value={story}
            onChange={(e) => setStory(e.target.value)}
            name="seller_story"
            placeholder="Longer story: how you started, your process, what makes your work special."
          />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-black px-5 py-2 text-white disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save profile"}
        </button>
        {message && <p className="text-sm text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
