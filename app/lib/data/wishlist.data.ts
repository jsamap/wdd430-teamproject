
import sql from "@/app/lib/db/postgres";

export async function getProductsInWishlist(id: string) {
    try {
        const products = await sql`
            SELECT 
                p.id,
                p.name,
                p.category,
                p.price,
                p.image,
                p.rating_average,
                p.rating_count,
                p.details
            FROM wishlist w
            INNER JOIN users u 
                ON w.user_id = u.id
            INNER JOIN products p 
                ON w.product_id = p.id
            WHERE u.id = ${id};
        `;
        return products;
    } catch (error) {
        console.error('Failed to fetch products in wishlist:', error);
        throw new Error('Failed to fetch products in wishlist.');
    }
}

export async function checkIfProductIsWishlisted(userId: string, productId: string) {
    try {
        const result = await sql`
            SELECT COUNT(*) AS count
            FROM wishlist
            WHERE user_id = ${userId} AND product_id = ${productId};
        `;
        return result[0].count > 0;
    } catch (error) {
        console.error('Failed to check wishlist status:', error);
        throw new Error('Failed to check wishlist status.');
    }
}

export async function removeProductFromWishlist(userId: string, productId: string) {
    try {
        const result = await sql`
            DELETE FROM wishlist
            WHERE user_id = ${userId} AND product_id = ${productId};
        `;
        return result;
    } catch (error) {
        console.error('Failed to remove product from wishlist:', error);
        throw new Error('Failed to remove product from wishlist.');
    }
}

export async function addProductToWishlist(userId: string, productId: string) {
    try {
        const result = await sql`
            INSERT INTO wishlist (user_id, product_id)
            VALUES (${userId}, ${productId});
        `;
        return result;
    } catch (error) {
        console.error('Failed to add product to wishlist:', error);
        throw new Error('Failed to add product to wishlist.');
    }
}