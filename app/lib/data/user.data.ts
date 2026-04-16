import sql from "@/app/lib/db/postgres";

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

/** Public seller page: no password. Returns undefined if user is missing or not a seller. */
export async function getPublicSellerById(id: string) {
  try {
    const rows = await sql`
      SELECT
        id,
        name,
        role,
        seller_tagline,
        seller_bio,
        seller_story
      FROM users
      WHERE id = ${id}
    `;
    const row = rows[0];
    if (!row || row.role !== "seller") return undefined;
    return row;
  } catch (error) {
    console.error("Failed to fetch seller:", error);
    throw new Error("Failed to fetch seller.");
  }
}

export type SellerProfileFields = {
  seller_tagline: string | null;
  seller_bio: string | null;
  seller_story: string | null;
};

/** For the logged-in seller editing their own profile (no password). */
/** For admin: assign new products to a seller account. */
export async function getSellerUsersForAdmin() {
  const rows = await sql`
    SELECT id, name, email
    FROM users
    WHERE role = 'seller'
    ORDER BY name ASC
  `;
  return rows;
}

export async function getSellerProfileFields(
  userId: string,
): Promise<SellerProfileFields | null> {
  try {
    const rows = await sql`
      SELECT seller_tagline, seller_bio, seller_story
      FROM users
      WHERE id = ${userId}
    `;
    const row = rows[0];
    if (!row) return null;
    return row as SellerProfileFields;
  } catch (error) {
    console.error("getSellerProfileFields", error);
    return null;
  }
}
