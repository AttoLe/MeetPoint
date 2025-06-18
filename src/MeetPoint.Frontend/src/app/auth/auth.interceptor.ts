import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { SKIP_AUTH } from '../http-context.tokens';
import { AuthTokenService } from './auth-token.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(SKIP_AUTH)) return next(req);

  const tokenService = inject(AuthTokenService);
  const prepare = () => {
    const token = tokenService.getAccessToken;
    return token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;
  };

  if (tokenService.isAccessTokenExpiringSoon()) {
    return tokenService
      .refresh()
      .pipe(switchMap(() => next(prepare())))
      .pipe(
        catchError((err) => {
          console.log(err);
          return throwError(() => err);
        })
      );
  }

  console.log('AAAA');

  return next(prepare());
};
