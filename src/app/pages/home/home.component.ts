import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { ActivatedRoute, Router } from '@angular/router';


// Define Product Interface
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: { rate: number | undefined; count: number };
}

// Define Category Interface
interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];  // Store category list
  selectedCategory: string = ''; // Store selected category
  products: Product[] = []; // Store filtered products

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private cartService: CartService,
    private productService: ProductService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Load all categories and products initially
    this.loadCategories();
    this.loadProducts();  
  }

  // Load categories from CategoriesService
  private loadCategories(): void {
    this.categoriesService.getCategories().subscribe(
      (data: Category[]) => {
        // Capitalize the first letter of each category name
        this.categories = data.map(category => ({
          ...category,
          name: this.capitalizeFirstLetter(category.name)
        }));
        console.log('Categories: ', this.categories);
      },
      (error) => {
        console.error('Error fetching categories: ', error);
      }
    );
  }
  
  // Helper method to capitalize the first letter of a string
  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

// Method called when a category is selected
selectCategory(category: Category): void {
  this.selectedCategory = this.lowercaseFirstLetter(category.name);  // Convert category name to lowercase
  this.loadProducts(this.selectedCategory);  // Load products for the selected category
}

// Helper method to lowercase the first letter of a string
private lowercaseFirstLetter(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}


  selectAll(): void {
    this.loadProducts();

  }
  
  // Load products from the ProductService
  loadProducts(category?: string): void {
    if (category) {
      this.productService.getProductsByCategory(category).subscribe(data => {
        console.log('if category',data)
        this.products = data;

      });
    } else {
      this.productService.getAllProducts().subscribe(data => {
        this.products = data;
        console.log(this.products)
      });
    }
  }

  // Add product to the cart and show snack bar notification
  addToCart(product: Product): void {
    const cartItem = { ...product, quantity: 1 };  // Adds a quantity field to the product
    this.cartService.addToCart(cartItem);  // Passes CartItem (with quantity) to the CartService
    // this.snackBar.open(`${product.title} added to cart`, 'Close', { duration: 2000 });

       // Display a longer snack bar message with a 'Go to Cart' button
       const snackBarRef = this.snackBar.open(
        `${product.title} added to cart!`,  // Message
        'Go to Cart',  // Action text
        { duration: 5000, verticalPosition: 'top' }  // Duration to keep the snack bar open (5 seconds)
      );
      
      // Handle the 'Go to Cart' button click
      snackBarRef.onAction().subscribe(() => {
        // Navigate to the cart page
        this.router.navigate(['/cart']);
      });

  }
}
