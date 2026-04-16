"use client";

import { useState } from "react";
import ReviewForm from "./ReviewForm";
import { deleteReview } from "@/app/lib/actions/review.actions";

type ReviewItemProps = {
  review: {
    id: string;
    product_id: string;
    user_id: string;
    user_name: string;
    rating: number;
    review: string;
    created_at: Date;
    updated_at: Date;
  };
  currentUserSessionId?: string;
  isAdmin?: boolean;
};

export default function ReviewItem({ review, currentUserSessionId, isAdmin }: ReviewItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check if current logged-in user is the author or an admin
  // The database `reviews` table has `user_id`, we need `user_id` here to verify, 
  // wait, the incoming `review` needs `user_id`! Let's assume it is passed in if needed, 
  // or we can just rely on `currentUserSessionId === review.user_id` if we include it.

  const canModify = isAdmin || (currentUserSessionId && review.user_id === currentUserSessionId);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    setIsDeleting(true);

    const formData = new FormData();
    formData.append("reviewId", review.id);
    formData.append("productId", review.product_id);

    await deleteReview(null, formData);
    setIsDeleting(false);
  };

  if (isEditing) {
    return (
      <ReviewForm
        productId={review.product_id}
        initialData={{ id: review.id, rating: review.rating, review: review.review }}
        onCancel={() => setIsEditing(false)}
        onSuccess={() => setIsEditing(false)}
      />
    );
  }

  const isEdited = new Date(review.updated_at).getTime() > new Date(review.created_at).getTime() + 1000;

  return (
    <div className={`flex flex-col gap-2 rounded-xl bg-white p-6 shadow md:mx-0 mx-4 border border-gray-100 ${isDeleting ? "opacity-50" : ""}`}>
      <div className="flex justify-between items-start">
        <div>
          <span className="font-bold">{review.user_name || "Anonymous"}</span>
          <span className="ml-3 text-sm text-gray-500">
            {new Date(review.created_at).toLocaleDateString()}
            {isEdited && " (edited)"}
          </span>
        </div>
        <div className="font-bold text-[#FCB33D]">
          {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
        </div>
      </div>

      <p className="mt-2 whitespace-pre-wrap">{review.review}</p>

      {canModify && (
        <div className="mt-3 flex gap-3 text-sm">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 font-semibold"
            disabled={isDeleting}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 font-semibold"
            disabled={isDeleting}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
