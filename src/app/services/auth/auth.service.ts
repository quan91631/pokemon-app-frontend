import { inject, Injectable } from '@angular/core';
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
  public token$ = this.tokenSubject.asObservable();

  env = inject(ENVIRONMENT);
  http = inject(HttpClient);

  constructor() {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      this.tokenSubject.next(token);
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.env.server + '/auth/login', credentials)
      .pipe(
        tap((response) => {
          this.setAuthData(response);
        })
      );
  }

  signup(userData: SignupRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(this.env.server + '/auth/signup', userData)
      .pipe(
        tap((response) => {
          this.setAuthData(response);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.tokenSubject.next(null);
    this.currentUserSubject.next(null);
  }

  private setAuthData(response: AuthResponse): void {
    localStorage.setItem('token', response.access_token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.tokenSubject.next(response.access_token);
    this.currentUserSubject.next(response.user);
  }

  get isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
