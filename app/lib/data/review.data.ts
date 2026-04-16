import sql from "@/app/lib/db/postgres";

export async function getLatestReviews() {
    try {
        const reviews = await sql`SELECT r.id, r.rating, r.review AS comment, r.created_at, u.name AS reviewer_name, p.name AS product_name, p.image AS product_image FROM reviews r JOIN users u ON r.user_id = u.id JOIN products p ON r.product_id = p.id ORDER BY r.created_at DESC LIMIT 2; `;
        return reviews;
    } catch (error) {
        console.error('Failed to fetch latest reviews:', error);
        throw new Error('Failed to fetch latest reviews.');

    }
}

export async function getReviewsByProductId(productId: string) {
    try {
        const reviews = await sql`
            SELECT 
                r.id, 
                r.product_id, 
                r.user_id, 
                r.rating, 
                r.review, 
                r.created_at, 
                r.updated_at,
                u.name as user_name
            FROM reviews r
            LEFT JOIN users u ON r.user_id = u.id
            WHERE r.product_id = ${productId}
            ORDER BY r.created_at DESC
        `;
        return reviews;
    } catch (error) {
        console.error('Failed to fetch reviews:', error);
        throw new Error('Failed to fetch reviews.');
    }
}
