import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';
import type { Product } from '../types/product.types';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  sortConfig: {
    key: keyof Product | null;
    direction: 'asc' | 'desc';
  };
  
  fetchProducts: () => Promise<void>;
  setSearchQuery: (query: string) => void;
  searchProducts: (query: string) => Promise<void>;
  setSortConfig: (key: keyof Product) => void;
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'thumbnail' | 'description' | 'category'>) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  isLoading: false,
  error: null,
  searchQuery: '',
  sortConfig: {
    key: null,
    direction: 'asc',
  },

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('https://dummyjson.com/products?limit=120');
      const products = response.data.products.map((p: any) => ({
        ...p,
        article: `ART-${p.id}`,
        vendor: p.brand,
        name: p.title,
        grade: p.rating,
      }));
      console.log(products)
      set({ products, filteredProducts: products, isLoading: false });
    } catch (error) {
      set({ error: 'Ошибка загрузки товаров', isLoading: false });
      toast.error('Ошибка загрузки товаров');
    }
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  searchProducts: async (query: string) => {
    if (!query.trim()) {
      set({ filteredProducts: get().products });
      return;
    }

    set({ isLoading: true });
    try {
      const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
      const products = response.data.products.map((p: any) => ({
        ...p,
        article: `ART-${p.id}`,
        vendor: p.brand,
        name: p.title,
        grade: p.rating,
      }));
      set({ filteredProducts: products, isLoading: false });
    } catch (error) {
      set({ error: 'Ошибка поиска', isLoading: false });
      toast.error('Ошибка поиска');
    }
  },

  setSortConfig: (key: keyof Product) => {
    const { sortConfig, filteredProducts } = get();
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...filteredProducts].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    set({
      filteredProducts: sorted,
      sortConfig: { key, direction },
    });
  },

  addProduct: (product) => {
    const { products, searchQuery } = get();
    const newProduct: Product = {
      ...product,
      id: Date.now(),
      rating: 0,
      thumbnail: '',
      description: '',
      category: 'new',
      grade: 0,
      name: product.title,
      vendor: product.brand,
    };

    const updatedProducts = [newProduct, ...products];
    set({ products: updatedProducts });

    if (searchQuery) {
      const filtered = updatedProducts.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      set({ filteredProducts: filtered });
    } else {
      set({ filteredProducts: updatedProducts });
    }

    toast.success('Товар успешно добавлен!');
  },
}));