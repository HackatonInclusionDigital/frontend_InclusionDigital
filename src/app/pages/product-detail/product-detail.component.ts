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
  isProductLoaded: boolean = false;

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
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data: ProductResponse) => {
          console.log('Producto encontrado:', data);
          this.product = data;
          this.isProductLoaded = true;  // Carga completa en caso de éxito
        },
        error: () => {
          console.log('Producto no encontrado o error');
          this.product = null;  // Producto no encontrado
          this.isProductLoaded = true;  // Carga completa en caso de error
        }
      });
    } else {
      console.log('No se proporcionó un ID de producto');
      this.product = null;
      this.isProductLoaded = true;  // Carga completa si no hay ID
    }
  }
}
