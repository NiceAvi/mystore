import { Injectable } from '@angular/core';
import { Form } from '../../models/form';
import { Product } from "../../models/product";

@Injectable({
  providedIn: 'root',
})

/**
 * Service that handles information related to a User's cart and their order_data.
 */
export class CartService {
  products_cart: Product[] = [];
  order_data!: Form;

  constructor() {}

  /**
   * Adds an item to a user's cart. Updates quantity if item already exists.
   * @param productItem
   */
  addToCart(productItem: Product) {
    const cartProduct = this.products_cart.find(
      (item) => item.id == productItem.id
    );
    if (cartProduct?.quantity && productItem?.quantity) {
      cartProduct.quantity += productItem.quantity;
    } else {
      this.products_cart.push(productItem);
    }
  }

  /**
   * Return user's cart
   * @returns List of products in cart
   */
  getCart(): Product[] {
    return this.products_cart;
  }

  /**
   * Empties a user's cart, generally after an order is submitted.
   * @returns the newly emptied cart.
   */
  setCart(products_cart: Product[]) {
    this.products_cart = products_cart;
  }

  /**
   * Empties a user's cart, generally after an order is submitted.
   * @returns the newly emptied cart.
   */
  setCartToEmpty(): Product[] {
    this.products_cart = [];
    return this.products_cart;
  }

  /**
   * Stores a user's order info after an order has been submitted.
   * @param order_data -
   */
  setOrderInfo(order_data: Form): void {
    this.order_data = order_data;
  }

  /**
   * Retrieves a user's order_data
   * @returns Form object containing user info.
   */
  getOrderInfo(): Form {
    return this.order_data;
  }
}
