import { Component, Input, OnInit } from '@angular/core';
import { Product } from "src/app/models/product";
import { Form } from 'src/app/models/form';
import { CartService } from 'src/app/services/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})


export class CartComponent implements OnInit {
  @Input() products_cart: Product[] = [];

  full_name!: string;
  address!: string;
  credit_card_number!: string;
  total_price: number = 0;
  order_info!: Form;

  constructor(private cart_service: CartService, private router: Router) {}

  ngOnInit(): void {
    this.products_cart = this.cart_service.getCart();

    for (let i = 0; i < this.products_cart.length; i++) {
      let quantity = this.products_cart[i].quantity;
      if (!quantity) {
        quantity = 1;
      }
      this.total_price += this.products_cart[i].price * quantity;
    }
    console.log(this.total_price);
  }


  updateCart(cart_item: Product) {
    if (cart_item.quantity == 0) {
      this.removeFromCart(cart_item);
    }

    this.total_price = 0;
    for (let i = 0; i < this.products_cart.length; i++) {
      let quantity = this.products_cart[i].quantity;
      if (!quantity) {
        quantity = 1;
      }
      this.total_price += this.products_cart[i].price * quantity;
    }
  }

  removeFromCart(cart_item: Product) {
    this.products_cart = this.products_cart.filter(
      (item) => item.id != cart_item.id
    );
    this.cart_service.setCart(this.products_cart);
    alert(`${cart_item.name} removed from your cart.`);
  }


  onSubmitOrder() {
    const order_info: Form = {
      full_name: this.full_name,
      total_price: this.total_price,
      credit_card_number: this.credit_card_number,
    };

    this.cart_service.setOrderInfo(order_info);
    this.router.navigate(['/confirmation']);

    this.products_cart = this.cart_service.setCartToEmpty();
    this.full_name = '';
    this.address = '';
    this.credit_card_number = '';
    this.total_price = 0;
  }
}
