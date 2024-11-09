import { Component, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from './../../services/product.service';
// import { ProductRequest } from './../../interfaces/productRequest.interface';
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
  selectedFiles: File[] = [];
  imageError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef // Inyectar ChangeDetectorRef
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

  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
        this.selectedFiles = Array.from(event.target.files);

        // Validación opcional: Verificar que todos los archivos sean imágenes
        const validFiles = this.selectedFiles.every(file => file.type.startsWith('image/'));
        if (!validFiles) {
            this.imageError = 'Solo se permiten archivos de imagen.';
            this.selectedFiles = [];
        } else {
            this.imageError = null;
        }
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
        const formData = new FormData();
        Object.keys(this.productForm.controls).forEach(key => {
            formData.append(key, this.productForm.get(key)?.value);
        });

        // Agregar las imágenes al FormData
        this.selectedFiles.forEach(file => {
            formData.append('imagenes', file);
        });

        this.productService.postRegisterProduct(formData).subscribe({
            next: () => {
                alert('Producto registrado exitosamente');
                // this.router.navigate(['/home']);
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
