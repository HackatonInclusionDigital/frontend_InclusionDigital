import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { LoginRequest } from './../../interfaces/loginRequest.interface';
import { LoginResponse } from './../../interfaces/loginResponse.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: `./login.component.html`,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  showModal: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData: LoginRequest = this.loginForm.value;
      this.userService.login(loginData).subscribe({
        next: (response: LoginResponse) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.showModal = true;
          setTimeout(() => {
            this.showModal = false;
            this.router.navigate(['/home']);
          }, 2000);
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
          alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        }
      });
    }
  }
}
