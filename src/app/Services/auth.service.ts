import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environment/environment';
import { WINDOW } from '../Components/tokens/window.token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, @Inject(WINDOW) private window: Window | undefined) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Auth/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}Auth/login`, credentials);
  }

  isLoggedIn(): boolean {
    return !!this.window?.localStorage?.getItem('token');
  }

  logout(): void {
    this.window?.localStorage?.removeItem('token');
  }

  getToken(): string | null {
    return this.window?.localStorage?.getItem('token') || null;
  }
}
