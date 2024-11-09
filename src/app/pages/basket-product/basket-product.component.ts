import { Component, OnInit } from '@angular/core';
import { ProductResponse } from '../../interfaces/productResponse.interface';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-basket-product',
  templateUrl: './basket-product.component.html',
  imports: [CommonModule],
  styleUrls: ['./basket-product.component.css']
})
export class BasketProductComponent implements OnInit {
  basketItems: ProductResponse[] = [];
  isCollapsed = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.basketItems$.subscribe((items) => {
      this.basketItems = items;
    });
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
