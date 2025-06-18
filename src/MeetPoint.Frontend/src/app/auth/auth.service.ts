import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ignoreElements, map, Observable, of, switchMap, tap } from 'rxjs';
import { skipAuth } from '../http-context.tokens';
import { AuthResponse, AuthTokenService } from './auth-token.service';

export interface AuthDto {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authTokenService = inject(AuthTokenService);
  private _http = inject(HttpClient);
  private _router = inject(Router);
  private userId = signal<string | null>(null);

  isAuthenticated(): Observable<boolean> {
    if (this.userId()) return of(true);
    return this.getUserId().pipe(map((res) => res?.id != null));
  }

  constructor() {
    if (this._authTokenService.getAccessToken)
      effect(() => this.getUserId().subscribe());
  }

  login(dto: AuthDto): Observable<void> {
    console.log(dto, this.userId());
    return this._http
      .post<AuthResponse>('/api/account/login', dto, { context: skipAuth() })
      .pipe(
        tap((res) => this._authTokenService.set(res)),
        switchMap(() => this.getUserId()),
        tap(() => this._router.navigate(['/home'])),
        ignoreElements()
      );
  }

  register(dto: AuthDto): Observable<void> {
    return this._http
      .post<void>('/api/account/register', dto, { context: skipAuth() })
      .pipe(
        tap(() => this.login(dto)),
        ignoreElements()
      );
  }

  logout(): void {
    this._authTokenService.clear();
    this.userId.set(null);
    this._router.navigate(['/login']);
  }

  private getUserId(): Observable<{ id: string } | null> {
    return this._http
      .get<{ id: string }>('api/account/meid')
      .pipe(tap((res) => this.userId.set(res.id)));
  }
}
