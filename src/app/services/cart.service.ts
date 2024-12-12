import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];

  constructor() {}

  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity > 0) {
      item.quantity = quantity;
    }
  }

  // updateItemQuantity method
  updateItemQuantity(item: CartItem): void {
    const existingItem = this.cartItems.find(cartItem => cartItem.product.id === item.product.id);
    if (existingItem) {
      existingItem.quantity = item.quantity;
    }
  }

  // removeFromCart method
  removeFromCart(item: CartItem): void {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
