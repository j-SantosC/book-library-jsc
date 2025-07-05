import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

interface AuthResponse {
  token: string;
  username: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5080/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials);
  }

  register(data: { username: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = jwtDecode<JwtPayload>(token);
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Token inválido:', error);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
