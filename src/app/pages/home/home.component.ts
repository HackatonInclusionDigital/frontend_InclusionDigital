import { NavbarComponent } from './../nav-bar/nav-bar.component';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { ProductResponse } from './../../interfaces/productResponse.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: ProductResponse[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;
  
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getAllProducts().pipe(
      catchError((error) => {
        // Manejo de errores de la API o problemas de conexión
        this.errorMessage = 'Ocurrió un error al obtener los productos. Inténtalo más tarde.';
        this.isLoading = false;
        return of([]); // Retorna un array vacío en caso de error
      })
    ).subscribe((data: ProductResponse[]) => {
      this.isLoading = false;
      if (data.length === 0) {
        this.errorMessage = 'No hay productos disponibles.';
      } else {
        this.products = data;
      }
    });
  }

  viewProductDetails(productId: string): void {
    this.router.navigate(['/product', productId]);
  }
}

