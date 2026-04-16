"use client";

import { useState } from "react";
import { addReview, updateReview } from "@/app/lib/actions/review.actions";

type ReviewFormProps = {
  productId: string;
  initialData?: {
    id: string;
    rating: number;
    review: string;
  };
  onCancel?: () => void;
  onSuccess?: () => void;
};

export default function ReviewForm({ productId, initialData, onCancel, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(initialData?.rating || 5);
  const [reviewText, setReviewText] = useState<string>(initialData?.review || "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("rating", rating.toString());
    formData.append("review", reviewText);
    
    if (initialData?.id) {
        formData.append("reviewId", initialData.id);
    }

    const action = initialData ? updateReview : addReview;
    const result = await action(null, formData);

    setIsPending(false);

    if (result.errors || result.message?.includes("Failed") || result.message?.includes("Error")) {
        setError(result.message || "An error occurred");
    } else {
        if (!initialData) {
            setRating(5);
            setReviewText("");
        }
        if (onSuccess) onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md border border-gray-100">
      <h3 className="text-xl font-bold">{initialData ? "Edit Review" : "Leave a Review"}</h3>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex flex-col gap-2">
        <label htmlFor="rating" className="font-semibold">Rating</label>
        <select
          id="rating"
          name="rating"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value, 10))}
          className="rounded-md border border-gray-300 bg-white p-2 text-black focus:border-[#6496FA] focus:ring-[#6496FA]"
        >
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>
              {num} Stars
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="review" className="font-semibold">Review</label>
        <textarea
          id="review"
          name="review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          required
          placeholder="Write your review here..."
          className="rounded-md border border-gray-300 bg-white p-2 text-black focus:border-[#6496FA] focus:ring-[#6496FA]"
        />
      </div>

      <div className="flex gap-4 mt-2">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-[#FCB33D] px-6 py-2 font-bold text-black hover:bg-orange-400 disabled:opacity-50"
        >
          {isPending ? "Submitting..." : (initialData ? "Update Review" : "Submit Review")}
        </button>
        {onCancel && (
            <button
                type="button"
                onClick={onCancel}
                className="rounded-md bg-gray-300 px-6 py-2 font-bold text-black hover:bg-gray-400"
            >
                Cancel
            </button>
        )}
      </div>
    </form>
  );
}
