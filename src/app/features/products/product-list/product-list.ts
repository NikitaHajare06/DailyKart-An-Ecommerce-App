import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../core/services/services/product';
import { CartService } from '../../../core/services/services/cart';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductList implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  allProducts: Product[] = [];
  searchControl = new FormControl('');

  currentPage = 1;
  itemsPerPage = 6;


  constructor(private productService: ProductService, private cartService: CartService) { }


  ngOnInit(): void {
    this.loadProducts();

    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      this.searchProduct(value || '' );
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe((res: Product[]) => {
      this.allProducts = res;
      this.filteredProducts = res;
      this.products = res;
    });
  }

  searchProduct(searchText: string) {
    const normalized = searchText.trim().toLowerCase();
    this.filteredProducts = normalized
      ? this.allProducts.filter(product =>
          product.title.toLowerCase().includes(normalized)
        )
      : [...this.allProducts];
    this.currentPage = 1; // Reset to first page on search
  }
  
  sortProducts() {
    this.filteredProducts.sort((a, b) => a.price - b.price);
  }

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  nextPage() {
    if ((this.currentPage * this.itemsPerPage) < this.filteredProducts.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.title} added to cart!`);   
}

}



