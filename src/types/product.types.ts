export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
  category: string;
  thumbnail: string;
  article?: string;
  vendor?: string;
  name?: string;
  grade?: number;
}