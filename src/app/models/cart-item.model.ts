import { Product } from './product.model';  // Import the Product model

export interface CartItem {
  product: Product;
  quantity: number;
}