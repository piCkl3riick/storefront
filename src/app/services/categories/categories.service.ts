import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesUrl = 'https://fakestoreapi.com/products/categories';  // API endpoint for categories

  constructor(private http: HttpClient) { }

  // Fetch categories from the API
  getCategories(): Observable<any[]> {
    return this.http.get<string[]>(this.categoriesUrl).pipe(
      map((categories: string[]) =>
        categories.map((category, index) => ({
          id: index + 1,
          name: category
        }))
      )
    );
  }
}
