import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductResponse } from './../../interfaces/productResponse.interface';
import { ProductService } from './../../services/product.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  @Input() product!: ProductResponse;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  addToCart(): void {
    this.productService.addProductToBasket(this.product);
  }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    if (productId) {
      this.productService.getProductById(productId).subscribe((data: ProductResponse) => {
        this.product = data;
      });
    }
  }
}