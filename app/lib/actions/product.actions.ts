"use server";

import { z } from "zod";
import sql from "@/app/lib/db/postgres";

// Create/update catalog products through seller server actions:
// @/app/lib/actions/seller.actions (logged-in sellers only).

export async function deleteProduct(prevState: any, productId: string) {
  const result = await sql`
    DELETE FROM products
    WHERE id = ${productId}
    RETURNING *;
  `;

  if (result.length === 0) {
    return {
      message: "Product not found. Failed to Delete.",
    };
  }

  return { product: result[0] };
}

export async function getProducts() {
  const result = await sql`
    SELECT
      id,
      name,
      description,
      price,
      image,
      category
    FROM products
    ORDER BY name ASC;
  `;

  return result;
}

const CartSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  quantity: z.number().int().positive("Quantity must be positive"),
});

export async function addToCart(prevState: any, formData: FormData) {
  const validatedFields = CartSchema.safeParse({
    productId: formData.get("productId"),
    quantity: parseInt(formData.get("quantity") as string, 10),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or Invalid Fields. Failed to Add to Cart.",
    };
  }

  const { productId, quantity } = validatedFields.data;

  const result = await sql`
    INSERT INTO cart_items (product_id, quantity)
    VALUES (${productId}, ${quantity})
    RETURNING *;
  `;

  return { cartItem: result[0], message: "Item added to cart successfully." };
}

export async function getProductById(productId: string) {
  const result = await sql`
    SELECT
      id,
      name,
      description,
      price,
      image,
      category
    FROM products
    WHERE id = ${productId}
    LIMIT 1;
  `;

  return result[0] || null;
}