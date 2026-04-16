export type Profile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image?: string | null;
  rating_average?: number;
  rating_count?: number;
  details?: string | null;
};

export type ProductFormData = {
  id?: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image?: string | null;
  rating_average?: number;
  rating_count?: number;
  details?: string | null;
};