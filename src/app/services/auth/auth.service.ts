import { Inject, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import {
  User,
  LoginRequest,
  AuthResponse,
  SignupRequest,
} from 'src/app/types/auth';
import { ENVIRONMENT } from 'src/app/providers/enviroment/enviroment.provider';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);

  public currentUser$ = this.currentUserSubject.asObservable();

  http = inject(HttpClient);
  env = inject(ENVIRONMENT);

  login(credentials: LoginRequest): Observable<AuthResponse> {
    console.log(credentials)
    return this.http
      .post<AuthResponse>(this.env.server + '/auth/login', credentials)
      .pipe(
        tap((response) => {
          this.setToken(response.access_token);
          this.tokenSubject.next(response.access_token);
        })
      );
  }

  signup(userData: SignupRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.env.server + '/auth/register', userData)
      .pipe(
        tap((response) => {
          this.setToken(response.access_token);
          this.tokenSubject.next(response.access_token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  get token$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }
}
