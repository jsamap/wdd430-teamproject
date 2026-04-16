export type WishlistProduct = {
  id: string;
  name: string;
  price: number;
  image?: string;
};

const WISHLIST_KEY = "wishlist";

export function getWishlist(): WishlistProduct[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(WISHLIST_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function isInWishlist(productId: string): boolean {
  const wishlist = getWishlist();
  return wishlist.some((item) => item.id === productId);
}

export function toggleWishlist(product: WishlistProduct): WishlistProduct[] {
  const wishlist = getWishlist();

  const exists = wishlist.some((item) => item.id === product.id);

  const updated = exists
    ? wishlist.filter((item) => item.id !== product.id)
    : [...wishlist, product];

  localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  return updated;
}