import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from './../../services/product.service';
import { ProductRequest } from './../../interfaces/productRequest.interface';
import { Router } from '@angular/router';
import { NavbarComponent } from './../nav-bar/nav-bar.component';

@Component({
  selector: 'app-register-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent], 
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']  // Cambiado a 'styleUrls' en plural
})
export class RegisterProductComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: [0, [Validators.required, Validators.min(5)]],
      stock: [0, [Validators.required, Validators.min(5)]],
      categoria: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const product: ProductRequest = this.productForm.value;
      this.productService.postRegisterProduct(product).subscribe({
        next: () => {
          alert('Producto registrado exitosamente');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error al registrar el producto', err);
        }
      });
    } else {
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
}