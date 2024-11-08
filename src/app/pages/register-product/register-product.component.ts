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
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent {
  productForm: FormGroup;
  id = "1";

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      precio: [0, [Validators.required, Validators.min(10)]], // Precio mínimo de 10
      stock: [0, [Validators.required, Validators.min(10)]],  // Stock mínimo de 10 unidades
      categoria: ['', [Validators.required]], // Select de categoría
      usuario_id: [this.id]
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
