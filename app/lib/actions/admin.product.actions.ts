"use server";

import { auth } from "@/auth";
import sql from "@/app/lib/db/postgres";
import { revalidatePath } from "next/cache";

function isAdmin(session: { user?: unknown } | null) {
  return (session?.user as { role?: string } | undefined)?.role === "admin";
}

export async function deleteAdminProduct(formData: FormData): Promise<void> {
  const session = await auth();
  if (!isAdmin(session)) {
    return;
  }

  const productId = formData.get("productId") as string;
  if (!productId) {
    return;
  }

  try {
    const owner = await sql`
      SELECT user_id FROM products WHERE id = ${productId} LIMIT 1
    `;
    const sellerId = owner[0]?.user_id as string | undefined;

    await sql`
      DELETE FROM products
      WHERE id = ${productId}
    `;

    if (sellerId) {
      revalidatePath(`/sellers/${sellerId}`);
    }
    revalidatePath(`/products/${productId}`);
  } catch (error) {
    console.error("deleteAdminProduct", error);
    return;
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}
