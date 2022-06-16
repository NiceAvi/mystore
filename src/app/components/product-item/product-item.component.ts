import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import Product from 'src/app/models/product';
import { Router,NavigationExtras } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product = new Product();
  @Output() cart = new EventEmitter();

  quantities: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private router: Router, private cartService: CartService) {}
  ngOnInit(): void {}
  showProductDetails(product: Product) {
  const navigationExtras: NavigationExtras = {
    state: {
      'selectedProduct': product
    }
  };
    this.router.navigate([`/products/${product.id}`], navigationExtras);
  }

  changeQuantity(event: Event) {
    this.product.quantity = Number(event);
  }
}
