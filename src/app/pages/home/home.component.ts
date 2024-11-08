import { NavbarComponent } from './../nav-bar/nav-bar.component';
import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { ProductResponse } from './../../interfaces/productResponse.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HttpClientModule], 
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
        console.log(response);
        this.isLoading = false;
        if (response.length === 0) {
          this.errorMessage = 'No hay productos disponibles.';
        } else {
          this.products = response;
        }
      },
      error: (error) => {
        console.error('Error al obtener los productos', error);
        this.errorMessage = 'Ocurrió un error al obtener los productos. Inténtalo más tarde.';
        this.isLoading = false;
      }
    });
  }

  viewProductDetails(productId: string): void {
    this.router.navigate(['/product', productId]);
  }
}
