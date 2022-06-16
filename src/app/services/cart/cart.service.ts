import { Injectable } from '@angular/core';
import Product from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  products: Array<Product> = [];
  productTotal: number = 0;
  grandTotal: number = 0;



  constructor() { }

  getProducts(): Array<Product> {
    return this.products;
  }

  getCartTotal(): number {
    return this.grandTotal;
  }

  addProductToCart(product: Product): void {
    this.products.push(product);
    this.calculateCartTotal();
  }

  removeProductFromCart(product: Product): void {
    let filteredArray = this.products.filter(p => p.id !== product.id);
    this.products = filteredArray;

    if (this.products.length === 0) {
      this.resetTotal();
    }

    alert(`${product.name} has been removed from the cart.`);
  }

  calculateCartTotal(): number {
    if (this.products.length === 0) {
      return this.productTotal;
    } else {
      this.products.forEach(product => {
        this.productTotal = product.quantity * product.price;
      });

      this.grandTotal += this.productTotal

      return this.grandTotal;
    }
  }

  resetTotal(): void {
    this.productTotal = 0;
  }
}
