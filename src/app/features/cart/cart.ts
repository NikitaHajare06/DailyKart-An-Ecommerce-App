import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { CartService } from '../../core/services/services/cart';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
})
export class Cart implements OnInit {
  cartItems :Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.cartItems = this.cartService.getCartItems();
  }

  getTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  goBack() {
    window.history.back();
  }
}
