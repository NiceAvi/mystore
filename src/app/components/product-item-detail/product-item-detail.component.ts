import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from "src/app/models/product";
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css'],
})


export class ProductItemDetailComponent implements OnInit {
  product_item!: Product;
  quantity: any = 1;
  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private route: ActivatedRoute,
    private products_service: ProductsService,
    private cart_service: CartService
  ) {}

  ngOnInit(): void {
    try {
      this.route.params.subscribe((params) => {console.log(params)
        this.products_service.getProducts().subscribe((res) => {
          this.product_item = res.find(
            (item) => item.id == params['id']
          ) as Product;
          if (this.product_item) {
            this.product_item.quantity = 1;
          }
        });
      });
    } catch (error) {
      throw new Error('Product not found!');
    }
  }


  submitAddToCart(item: Product): void {
    item.quantity = this.quantity;
    this.cart_service.addToCart(item);
    alert(
      `Added to your cart: ${this.product_item.name} x ${this.product_item.quantity}`
    );
    this.quantity = 1;
  }
}
