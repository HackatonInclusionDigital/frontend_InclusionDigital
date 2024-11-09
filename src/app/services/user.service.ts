import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import { LoginResponse } from '../interfaces/loginResponse.interface';
import { env } from '../env/env';
import { UserRequest } from '../interfaces/userRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = env.baseURL;

  constructor(private http: HttpClient) {}

  loginUser(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseURL}users/login`, credentials);
  }
  registerUser(request: UserRequest): Observable<any> {
    return this.http.post(`${this.baseURL}users/register`, request);
  }
}
