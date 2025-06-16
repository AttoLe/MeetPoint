import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { skipAuth } from '../http-context.tokens';

export interface AuthDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserDto {
  id: string;
  userName: string;
  email: string;
  phoneNumber: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';
  private readonly rememberMe = 'remember_me';

  user = signal<UserDto | null>(null);

  isAuthenticated(): Observable<UserDto | null> {
    if (this.user()) return of(this.user());
    return this.updateUser();
  }

  constructor() {
    effect(() => this.updateUser().subscribe());
  }

  login(dto: AuthDto): Observable<void> {
    return this.http
      .post<AuthResponse>('/api/account/login', dto, { context: skipAuth() })
      .pipe(
        switchMap(async (res) => {
          this.updateTokens(res);
          this.user();
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  register(dto: AuthDto): Observable<void> {
    return this.http
      .post<void>('/api/account/register', dto, { context: skipAuth() })
      .pipe(
        switchMap(() => this.login(dto)),
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  checkPassword(password: string): Observable<void> {
    return this.http
      .post<void>('/api/account/check-password', password)
      .pipe(catchError((error) => throwError(() => error)));
  }

  logout(): void {
    console.log('LOGOUT');
    this.clearTokens();
    this.user.set(null);
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<AuthResponse> {
    const refresh = localStorage.getItem(this.refreshTokenKey);
    if (!refresh) return throwError(() => new Error('No refresh token'));

    return this.http
      .post<AuthResponse>(
        '/api/account/refresh',
        { refresh },
        { context: skipAuth() }
      )
      .pipe(tap((res) => this.updateTokens(res)));
  }

  private updateUser(): Observable<UserDto | null> {
    return this.http.get<UserDto>('api/account/me').pipe(
      tap((res) => this.user.set(res)),
      catchError(() => of(null))
    );
  }

  private updateTokens(res: AuthResponse): void {
    localStorage.setItem(this.accessTokenKey, res.accessToken);
    localStorage.setItem(this.refreshTokenKey, res.refreshToken);
  }

  private clearTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }
}
