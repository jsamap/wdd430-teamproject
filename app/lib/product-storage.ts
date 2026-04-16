import { Product, ProductFormData } from "@/app/lib/types";

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch("/api/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
};

export const getProductById = async (id: string): Promise<Product> => {
  const res = await fetch(`/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
};

export const createProduct = async (
  product: ProductFormData
): Promise<Product> => {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("Failed to create product");
  }

  return res.json();
};

export const updateProduct = async (
  id: string,
  product: ProductFormData
): Promise<Product> => {
  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("Failed to update product");
  }

  return res.json();
};

export const deleteProduct = async (
  id: string
): Promise<{ message: string }> => {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete product");
  }

  return res.json();
};