import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from "../../models/product";

@Injectable({
  providedIn: 'root',
})

/**
 * Product Service that handles endpoint calls to retrieve products.
 */
export class ProductsService {
  product_data!: Product;

  product_list!: Product[];

  constructor(private http: HttpClient) {}


  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('../assets/data.json');
  }


  setProducts(product_list: Product[]) {
    this.product_list = product_list;
  }
  
  getSingleProduct() {}
}
