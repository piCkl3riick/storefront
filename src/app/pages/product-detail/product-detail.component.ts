import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private router: Router

  ) {}

  ngOnInit(): void {
    // Gets the product id from the route
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.loadProductDetails(productId);
    }
  }

  loadProductDetails(id: string): void {
    this.productService.getAllProducts().subscribe(products => {
      this.product = products.find(product => product.id === Number(id)) || null;
    });
  }

  getStars(rate: number | undefined): any[] {
    return rate ? new Array(Math.floor(rate)) : [];  // Returns an array with full stars, or an empty array if no rating
  }
  
  getEmptyStars(rate: number | undefined): any[] {
    return rate ? new Array(5 - Math.floor(rate)) : [];
  }
  

  addToCart(product: Product): void {
    const cartItem = { ...product, quantity: 1 };  // Adds a quantity field to the product
    this.cartService.addToCart(cartItem);  // Passes CartItem (with quantity) to the CartService
    
    const snackBarRef = this.snackBar.open(
      `${product.title} added to cart!`,
      'Go to Cart',
      { duration: 5000. , verticalPosition: 'top'  } // keep the snack bar open (5 seconds)
    );
    
    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/cart']);
    });
  }
  
}
