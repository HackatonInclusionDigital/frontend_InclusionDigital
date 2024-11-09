import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import { LoginResponse } from '../interfaces/loginResponse.interface';
import { env } from '../env/env';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = env.baseURL;

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseURL}login`, data);
  }
}
