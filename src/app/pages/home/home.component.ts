//src/app/pages/home/home.component.ts
import { NavbarComponent } from './../nav-bar/nav-bar.component';
import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { ProductResponse } from './../../interfaces/productResponse.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CheckListComponent } from '../check-list/check-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CheckListComponent], 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: ProductResponse[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  private productService = inject(ProductService);
  private router = inject(Router);

  constructor() {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  private obtenerProductos(): void {
    this.productService.getAllProducts().subscribe({
      next: (response) => {
        console.log('Respuesta completa:', response);
        console.log('Tipo de respuesta:', typeof response);
        console.log('Es array?:', Array.isArray(response));
        
        if (Array.isArray(response)) {
          this.products = response;
          this.errorMessage = this.products.length === 0 ? 'No hay productos disponibles.' : '';
        } else {
          console.error('La respuesta no es un array:', response);
          this.errorMessage = 'Error en el formato de datos recibidos';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error detallado:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error
        });
        this.errorMessage = `Error al obtener los productos: ${error.message || 'Error desconocido'}`;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
  navigateToRegister() : void{
    this.router.navigate(['/register-user']);
  }
  viewProductDetails(productId: string): void {
    localStorage.setItem('productId', productId);
    this.router.navigate(['/product', productId]);
  }
}
