// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import { LoginResponse } from '../interfaces/loginResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'https://api.example.com'; // Cambia esta URL según tu API

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseURL}/login`, request);
  }
}
