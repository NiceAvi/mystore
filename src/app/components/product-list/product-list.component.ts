import { Component, OnInit } from '@angular/core';
import { Product } from "src/app/models/product";
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})


export class ProductListComponent implements OnInit {
  products_page: Product[] = [];

  constructor(
    private products_service: ProductsService,
    private cart_service: CartService
  ) { }

  ngOnInit(): void {
    this.products_service.getProducts().subscribe((res) => {
      for (let num = 0; num < res.length; num++) {
        const product = res[num];
        product['quantity'] = 1;
      }
      this.products_page = res;
      this.products_service.setProducts(res);
    });
  }


  addToCart(product_item: Product) {
    this.cart_service.addToCart(product_item);
  }
}
