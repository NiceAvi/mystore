import { Component, Input, OnInit } from '@angular/core';
import { Form } from 'src/app/models/form';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})


export class ConfirmationComponent implements OnInit {
  order_info!: Form;

  constructor(private cart_service: CartService) {}

  ngOnInit(): void {
    this.order_info = this.cart_service.getOrderInfo();
  }

  ngOnDestroy(): void {
    this.cart_service.setOrderInfo(new Form());
  }
}
