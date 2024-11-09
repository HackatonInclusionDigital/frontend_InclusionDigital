import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { UserRequest } from './../../interfaces/userRequest.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      rol: ['', [Validators.required]],
      documento: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser: UserRequest = this.registerForm.value;
      this.userService.registerUser(newUser).subscribe({
        next: (response) => {
          console.log('Usuario registrado exitosamente:', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          alert('Error al registrar el usuario:',);
        }
      });
    }
  }
}
