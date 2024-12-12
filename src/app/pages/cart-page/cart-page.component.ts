import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/models/cart-item.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotal();
  }

  updateQuantity(item: CartItem): void {
    this.cartService.updateItemQuantity(item);
    this.calculateTotal();
  }

  removeItem(item: CartItem): void {
    this.cartService.removeFromCart(item);
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  checkout(): void {
    alert('Proceeding to Checkout!');
  }
}
