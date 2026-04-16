import sql from "@/app/lib/db/postgres";

export async function getProducts() {
    try {
        const products = await sql`SELECT id, name, description, price, image, rating_average, rating_count, details FROM products`;
        return products;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw new Error('Failed to fetch products.');
    }
}

export async function getFeaturedProducts() {
    try {
        const products = await sql`SELECT id, name, description, price, image, rating_average, rating_count, details FROM products ORDER BY RANDOM() ASC LIMIT 4`;
        return products;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw new Error('Failed to fetch products.');
    }
}

export async function getProduct(id: string) {
    try {
        const product = await sql`SELECT * FROM products WHERE id=${id}`;
        return product[0];
    } catch (error) {
        console.error('Failed to fetch product:', error);
        throw new Error('Failed to fetch product.');
    }
}