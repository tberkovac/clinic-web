import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable, tap } from 'rxjs';
import { TokenResponse } from '../models/tokenResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  getStoredToken(): string | null {
    return localStorage.getItem('token');
  }

  login(loginCreds: Login) : Observable<TokenResponse> {
    const body = {
      username: loginCreds.username,
      password: loginCreds.password
    };
    return this.http.post<TokenResponse>('https://localhost:7125/Auth/login', body)
      .pipe(tap((token: TokenResponse) => {
        if (token) {
          localStorage.setItem('token', token.token);
          localStorage.setItem('role', token.role);
        }
      }))
  }

}
