// src/app/pages/product-detail/product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductResponse } from './../../interfaces/productResponse.interface';
import { ProductService } from './../../services/product.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../nav-bar/nav-bar.component';
import { BasketProductComponent } from '../basket-product/basket-product.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent, BasketProductComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: ProductResponse | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  addToBasket(): void {
    if (this.product) {
      this.productService.addProductToBasket(this.product);
    }
  }

  ngOnInit(): void {
    // Obtener el ID del producto desde localStorage
    const productId = localStorage.getItem('productId');
    
    if (productId) {
      // Hacer la solicitud para obtener el producto por ID
      this.productService.getProductById(productId).subscribe({
        next: (data: ProductResponse) => {
          console.log('Producto encontrado:', data);
          this.product = data;  // Asigna el producto si se encuentra
        },
        error: (err) => {
          console.error('Producto no encontrado o error:', err.message);
          this.product = null;  // Producto no encontrado, `product` es null
        }
      });
    } else {
      console.log('No se proporcionó un ID de producto');
      this.product = null;  // No hay ID, `product` es null
    }
  }
}
