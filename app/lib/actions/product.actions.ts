"use server";

import { z } from "zod";
import sql from "@/app/lib/db/postgres";

const FormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be a positive number"),
  imageUrl: z.string().url("Invalid image URL"),
});

export async function createProduct(prevState: any, formData: FormData) {
  const validatedFields = FormSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price") as string),
    imageUrl: formData.get("imageUrl"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or Invalid Fields. Failed to Create Product.",
    };
  }

  const { name, description, price, imageUrl } = validatedFields.data;

  const result = await sql`
      INSERT INTO products (name, description, price, image_url)
      VALUES (${name}, ${description}, ${price}, ${imageUrl})
      RETURNING *;
    `;

  return { product: result[0] };
}

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

