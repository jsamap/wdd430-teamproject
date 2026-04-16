import sql from "@/app/lib/db/postgres";

export async function getProducts() {
  try {
    const products = await sql`
      SELECT
        p.id,
        p.user_id,
        p.name,
        p.category,
        p.description,
        p.price,
        p.stock,
        p.image,
        p.rating_average,
        p.rating_count,
        p.details,
        u.name AS seller_name
      FROM products p
      LEFT JOIN users u ON p.user_id = u.id
      ORDER BY p.name ASC
    `;
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products.");
  }
}

export async function getFeaturedProducts() {
  try {
    const products = await sql`
      SELECT
        p.id,
        p.user_id,
        p.name,
        p.category,
        p.description,
        p.price,
        p.stock,
        p.image,
        p.rating_average,
        p.rating_count,
        p.details,
        u.name AS seller_name
      FROM products p
      LEFT JOIN users u ON p.user_id = u.id
      ORDER BY RANDOM() ASC
      LIMIT 4
    `;
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products.");
  }
}

export async function getProduct(id: string) {
  try {
    const rows = await sql`
      SELECT
        p.id,
        p.user_id,
        p.name,
        p.category,
        p.description,
        p.price,
        p.stock,
        p.image,
        p.rating_average,
        p.rating_count,
        p.details,
        u.name AS seller_name
      FROM products p
      LEFT JOIN users u ON p.user_id = u.id
      WHERE p.id = ${id}
    `;
    return rows[0];
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw new Error("Failed to fetch product.");
  }
}

/** Products listed by one seller (dashboard and public storefront). */
export async function getProductsByUserId(userId: string) {
  try {
    const products = await sql`
      SELECT
        p.id,
        p.user_id,
        p.name,
        p.category,
        p.description,
        p.price,
        p.stock,
        p.image,
        p.rating_average,
        p.rating_count,
        p.details,
        u.name AS seller_name
      FROM products p
      LEFT JOIN users u ON p.user_id = u.id
      WHERE p.user_id = ${userId}
      ORDER BY p.name ASC
    `;
    return products;
  } catch (error) {
    console.error("Failed to fetch seller products:", error);
    throw new Error("Failed to fetch seller products.");
  }
}
