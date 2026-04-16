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
