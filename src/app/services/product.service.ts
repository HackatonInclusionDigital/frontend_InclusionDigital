//src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ProductResponse } from '../interfaces/productResponse.interface';
import { ProductRequest } from '../interfaces/productRequest.interface';
import { env } from '../env/env';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseURL = env.baseURL;

  constructor(private http: HttpClient) {
    console.log('URL base configurada:', this.baseURL);
  }

  getAllProducts(): Observable<ProductResponse[]> {
    const url = `${this.baseURL}products`;
    console.log('Realizando petición a:', url);
  
    return this.http.get<ProductResponse[]>(url, { responseType: 'json' }).pipe(
      tap(response => {
        console.log('Respuesta del servidor:', response);
      }),
      catchError(this.handleError)
    );
  }

  postRegisterProduct(product: ProductRequest): Observable<ProductResponse> {
    return this.http.post<ProductResponse>(`${this.baseURL}products`, product);
  }
  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseURL}products/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';
  
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}, ` +
                    `mensaje: ${error.message}`;
    }
  
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
