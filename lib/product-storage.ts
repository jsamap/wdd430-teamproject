"use client";

export const getProducts = () => {
  if (typeof window === "undefined") return [];

  const savedProducts = localStorage.getItem("products");
  return savedProducts ? JSON.parse(savedProducts) : [];
};

export const saveProducts = (products: any[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("products", JSON.stringify(products));
};

export const getProductById = (id: string) => {
  const products = getProducts();
  return products.find((product: any) => product.id === id);
};