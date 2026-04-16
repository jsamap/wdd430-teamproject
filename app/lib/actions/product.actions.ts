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
  INSERT INTO products (name, description, price, image)
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