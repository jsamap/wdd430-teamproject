"use server";

import { auth } from "@/auth";
import sql from "@/app/lib/db/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";

async function requireSellerId(): Promise<string | null> {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role;
  if (!session?.user?.id || role !== "seller") return null;
  return session.user.id;
}

const ProfileSchema = z.object({
  seller_tagline: z.string().max(200).optional(),
  seller_bio: z.string().max(2000).optional(),
  seller_story: z.string().max(5000).optional(),
});

export async function updateSellerProfile(formData: FormData) {
  const sellerId = await requireSellerId();
  if (!sellerId) {
    return { message: "You must be logged in as a seller." };
  }

  const parsed = ProfileSchema.safeParse({
    seller_tagline: (formData.get("seller_tagline") as string) ?? "",
    seller_bio: (formData.get("seller_bio") as string) ?? "",
    seller_story: (formData.get("seller_story") as string) ?? "",
  });

  if (!parsed.success) {
    return { message: "Please check your input and try again." };
  }

  const { seller_tagline, seller_bio, seller_story } = parsed.data;

  try {
    await sql`
      UPDATE users
      SET
        seller_tagline = ${seller_tagline || null},
        seller_bio = ${seller_bio || null},
        seller_story = ${seller_story || null}
      WHERE id = ${sellerId}
    `;
  } catch (error) {
    console.error("updateSellerProfile", error);
    return { message: "Could not save profile. Did you run the database seed?" };
  }

  revalidatePath("/seller/profile");
  revalidatePath(`/sellers/${sellerId}`);
  return { message: "Profile saved." };
}

const ProductSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description should be at least 10 characters"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  image: z.string().max(2000).optional().nullable(),
  details: z.string().max(5000).optional().nullable(),
});

export async function createSellerProduct(formData: FormData) {
  const sellerId = await requireSellerId();
  if (!sellerId) {
    return { message: "You must be logged in as a seller." };
  }

  const parsed = ProductSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    image: formData.get("image") || null,
    details: formData.get("details") || null,
  });

  if (!parsed.success) {
    return {
      message: "Please fix the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, category, description, price, stock, image, details } = parsed.data;
  const imageValue = image?.trim() ? image.trim() : null;

  try {
    await sql`
      INSERT INTO products (
        user_id,
        name,
        category,
        description,
        price,
        stock,
        image,
        details
      )
      VALUES (
        ${sellerId},
        ${name},
        ${category},
        ${description},
        ${price},
        ${stock},
        ${imageValue},
        ${details?.trim() ? details.trim() : null}
      )
    `;
  } catch (error) {
    console.error("createSellerProduct", error);
    return { message: "Could not create product." };
  }

  revalidatePath("/seller/products");
  revalidatePath("/products");
  revalidatePath("/");
  revalidatePath(`/sellers/${sellerId}`);
  return { message: "Product created." };
}

export async function updateSellerProduct(formData: FormData) {
  const sellerId = await requireSellerId();
  if (!sellerId) {
    return { message: "You must be logged in as a seller." };
  }

  const productId = formData.get("productId") as string;
  if (!productId) {
    return { message: "Missing product id." };
  }

  const parsed = ProductSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    image: formData.get("image") || null,
    details: formData.get("details") || null,
  });

  if (!parsed.success) {
    return {
      message: "Please fix the highlighted fields.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { name, category, description, price, stock, image, details } = parsed.data;
  const imageValue = image?.trim() ? image.trim() : null;

  try {
    const result = await sql`
      UPDATE products
      SET
        name = ${name},
        category = ${category},
        description = ${description},
        price = ${price},
        stock = ${stock},
        image = ${imageValue},
        details = ${details?.trim() ? details.trim() : null}
      WHERE id = ${productId} AND user_id = ${sellerId}
      RETURNING id
    `;
    if (result.length === 0) {
      return { message: "Product not found or you do not own it." };
    }
  } catch (error) {
    console.error("updateSellerProduct", error);
    return { message: "Could not update product." };
  }

  revalidatePath("/seller/products");
  revalidatePath(`/seller/products/edit/${productId}`);
  revalidatePath("/products");
  revalidatePath(`/products/${productId}`);
  revalidatePath(`/sellers/${sellerId}`);
  revalidatePath("/");
  return { message: "Product updated." };
}

/** Used as a <form action>; return type must be void for Next.js types. */
export async function deleteSellerProduct(formData: FormData): Promise<void> {
  const sellerId = await requireSellerId();
  if (!sellerId) {
    return;
  }

  const productId = formData.get("productId") as string;
  if (!productId) {
    return;
  }

  try {
    const result = await sql`
      DELETE FROM products
      WHERE id = ${productId} AND user_id = ${sellerId}
      RETURNING id
    `;
    if (result.length === 0) {
      return;
    }
  } catch (error) {
    console.error("deleteSellerProduct", error);
    return;
  }

  revalidatePath("/seller/products");
  revalidatePath("/products");
  revalidatePath(`/sellers/${sellerId}`);
  revalidatePath("/");
}
