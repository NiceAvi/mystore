import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from "src/app/models/product";
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})

export class ProductItemComponent implements OnInit {
  quantity: any = 1;
  quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  @Input() product_item!: Product;
  @Output() addToCart: EventEmitter<Product> = new EventEmitter();

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {}

  
  submitAddToCart(item: Product): void {
    item.quantity = this.quantity;
    this.addToCart.emit(item);
    alert(
      `Added to your cart: ${this.product_item.name} X ${this.product_item.quantity}`
    );
    this.quantity = 1;
  }
}
