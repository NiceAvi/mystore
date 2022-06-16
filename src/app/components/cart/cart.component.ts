import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Form from 'src/app/models/form';
import Product from 'src/app/models/product';
import { CartService } from 'src/app/services/cart/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Input() product: Product = new Product();
  //product: Product = new Product();

  fullName: string = "";
  address: string = "";
  creditCardNumber: string = "";
  errorMessage: string = "";
  total: number = 0;
  products: Array<Product> = [];
  selectedAmount: number = 1;

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.products = this.cartService.getProducts();
  }

  onSubmit(): void {
    const form: Form = new Form()
    form.fullName = this.fullName;
    form.address = this.address;
    form.creditCardNumber = this.creditCardNumber;

    this.router.navigate([`/confirmation`], { state: { total: this.total } });
  }

  onNumberChanged(event: Event, product: Product): void {
    product.quantity = Number(event);

    if (product.quantity === 0) {
      this.removeProductFromCart(product)
    } else {
      this.updateCart();
    }
  }

  updateCart(): void {
    alert(`Your cart and total has been updated.`)
    this.cartService.calculateCartTotal();
  }

  removeProductFromCart(product: Product): void {
    this.cartService.removeProductFromCart(product);
    this.products = this.cartService.getProducts();
  }

  calculateTotal(): number {
    return this.cartService.calculateCartTotal();
  }

  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

}
