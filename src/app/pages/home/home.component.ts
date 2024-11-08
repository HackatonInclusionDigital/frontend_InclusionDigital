import { NavbarComponent } from './../nav-bar/nav-bar.component';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './../../services/product.service';
import { ProductResponse } from './../../interfaces/productResponse.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: ProductResponse[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data: ProductResponse[]) => {
      this.products = data;
    });
  }

  viewProductDetails(productId: number): void {
    this.router.navigate(['/product', productId]);
  }
}

