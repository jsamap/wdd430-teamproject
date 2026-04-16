"use server";

import { z } from "zod";
import sql from "@/app/lib/db/postgres";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

const ReviewSchema = z.object({
  id: z.string().optional(),
  productId: z.string().min(1, "Product ID is missing"),
  rating: z.coerce.number().min(1, "Rating must be at least 1").max(5, "Rating cannot exceed 5"),
  review: z.string().min(3, "Review must be at least 3 characters").max(500, "Review is too long"),
});

export async function addReview(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      message: "You must be logged in to leave a review.",
    };
  }

  const validatedFields = ReviewSchema.safeParse({
    productId: formData.get("productId"),
    rating: formData.get("rating"),
    review: formData.get("review"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or Invalid Fields. Failed to Create Review.",
    };
  }

  const { productId, rating, review } = validatedFields.data;

  try {
    await sql`
      INSERT INTO reviews (product_id, user_id, rating, review)
      VALUES (${productId}, ${session.user.id}, ${rating}, ${review});
    `;

    // Update the product's average rating if it's stored in the DB as an actual UUID product. 
    // Usually mock id '1' will not exist here, so we wrap it in a safe update
    await updateProductAverageRating(productId);

    revalidatePath(`/products/${productId}`);
    return { message: "Review added successfully!" };
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Database Error: Failed to Create Review.",
    };
  }
}

export async function updateReview(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      message: "You must be logged in to update a review.",
    };
  }

  const validatedFields = ReviewSchema.safeParse({
    id: formData.get("reviewId"),
    productId: formData.get("productId"),
    rating: formData.get("rating"),
    review: formData.get("review"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or Invalid Fields. Failed to Update Review.",
    };
  }

  const { id: reviewId, productId, rating, review } = validatedFields.data;

  if (!reviewId) {
    return { message: "Review ID is missing." };
  }

  const isAdmin = (session.user as any).role === 'admin';

  try {
    const existingReview = await sql`SELECT user_id FROM reviews WHERE id = ${reviewId}`;

    if (existingReview.length === 0) {
      return { message: "Review not found." };
    }

    if (existingReview[0].user_id !== session.user.id && !isAdmin) {
      return { message: "Unauthorized. You can only edit your own reviews." };
    }

    await sql`
            UPDATE reviews 
            SET rating = ${rating}, review = ${review}, updated_at = CURRENT_TIMESTAMP
            WHERE id = ${reviewId}
        `;

    await updateProductAverageRating(productId);

    revalidatePath(`/products/${productId}`);
    return { message: "Review updated successfully!" };
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to Update Review." };
  }
}

export async function deleteReview(prevState: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      message: "You must be logged in to delete a review.",
    };
  }

  const reviewId = formData.get("reviewId")?.toString();
  const productId = formData.get("productId")?.toString();

  if (!reviewId || !productId) {
    return { message: "Review ID or Product ID missing." };
  }

  const isAdmin = (session.user as any).role === 'admin';

  try {
    const existingReview = await sql`SELECT user_id FROM reviews WHERE id = ${reviewId}`;

    if (existingReview.length === 0) {
      return { message: "Review not found." };
    }

    if (existingReview[0].user_id !== session.user.id && !isAdmin) {
      return { message: "Unauthorized. You can only delete your own reviews." };
    }

    await sql`DELETE FROM reviews WHERE id = ${reviewId}`;

    await updateProductAverageRating(productId);

    revalidatePath(`/products/${productId}`);
    return { message: "Review deleted successfully!" };
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to Delete Review." };
  }
}

async function updateProductAverageRating(productId: string) {
  try {
    // Calculate the new average and count
    const result = await sql`
            SELECT COUNT(*) as count, AVG(rating) as average 
            FROM reviews 
            WHERE product_id = ${productId}
        `;

    const count = parseInt(result[0].count, 10);
    const average = count > 0 ? parseFloat(result[0].average).toFixed(1) : 0;

    // Try to update the products table. Since productId could be a UUID OR '1', '2' mock ID,
    // we use a safe approach. If it's the mock ID, it just updates 0 rows in actual DB.
    await sql`
            UPDATE products 
            SET rating_average = ${average}, rating_count = ${count}
            WHERE id::text = ${productId}
        `;
  } catch (error) {
    console.error("Error updating product average rating:", error);
  }
}
