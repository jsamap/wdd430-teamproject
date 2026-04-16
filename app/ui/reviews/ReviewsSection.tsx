import { getReviewsByProductId } from "@/app/lib/data/review.data";
import { auth } from "@/auth";
import ReviewItem from "./ReviewItem";
import ReviewForm from "./ReviewForm";

export default async function ReviewsSection({ productId }: { productId: string }) {
  const reviews = await getReviewsByProductId(productId);
  const session = await auth();

  // Sort reviews: newest first (already done in SQL, but just to be safe if caching changes order)
  const sortedReviews = reviews || [];

  return (
    <section className="mt-12 px-8 pb-12 w-full max-w-4xl mx-auto">
      <hr className="my-8 border-gray-300" />
      <h2 className="mb-6 text-3xl font-bold">Reviews and Ratings</h2>

      <div className="">
        {session?.user?.id ? (
          <ReviewForm productId={productId} />
        ) : (
          <div className="rounded-xl bg-white border border-gray-100 shadow p-6 text-center">
            <h3 className="text-lg font-bold mb-2">Leave a Review</h3>
            <p>Please <a href="/auth/login" className="text-[#6496FA] font-semibold hover:underline">log in</a> to leave a review.</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6 mt-8">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review: any) => (
            <ReviewItem
              key={review.id}
              review={review}
              currentUserSessionId={session?.user?.id}
              isAdmin={(session?.user as any)?.role === 'admin'}
            />
          ))
        ) : (
          <p className="text-gray-500 italic">No reviews yet. Be the first to leave one!</p>
        )}
      </div>
    </section>
  );
}
