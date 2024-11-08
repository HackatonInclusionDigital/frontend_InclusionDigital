import { Injectable } from '@angular/core';
import { env } from '../env/env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponse } from '../interfaces/productResponse.interface';
import { ProductRequest } from '../interfaces/productRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL = env.baseURL;

  constructor(private http: HttpClient) { }
  
  getAllProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(`${this.baseURL}products`);
  }
  getProductById(productId: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseURL}products/${productId}`);
  }
  postRegisterProduct(product: ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(`${this.baseURL}products`, product);
  }
}