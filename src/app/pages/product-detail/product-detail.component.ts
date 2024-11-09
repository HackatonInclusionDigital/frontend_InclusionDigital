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
    const productId = "672ed4a82c538afd89360832";

    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data: ProductResponse) => {
          console.log('Producto encontrado:', data);
          this.product = data;  // Si se encuentra el producto, se asigna
        },
        error: () => {
          console.log('Producto no encontrado o error');
          this.product = null;  // Producto no encontrado, `product` es null
        }
      });
    } else {
      console.log('No se proporcionó un ID de producto');
      this.product = null;  // No hay ID, `product` es null
    }
  }
}
