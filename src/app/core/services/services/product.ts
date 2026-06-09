import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

   apiUrl = 'https://fakestoreapi.com/products';

   constructor( private http: HttpClient ) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductsById(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/${id}`);
  }

  
}
