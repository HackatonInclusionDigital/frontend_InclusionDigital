import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponse } from '../interfaces/productResponse.interface';
import { ProductRequest } from '../interfaces/productRequest.interface';
import { env } from '../env/env';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL = env.baseURL;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<ProductResponse[]> {
    console.log(`Fetching products from: ${this.baseURL}products`);
    return this.http.get<ProductResponse[]>(`${this.baseURL}products`);
  }

  postRegisterProduct(product: ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(`${this.baseURL}products`, product);
  }
  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseURL}products/${id}`);
  }
}
