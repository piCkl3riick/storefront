// src/app/models/product.model.ts
export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category?: string;
    rating: { rate: number | undefined; count: number };
  }
  