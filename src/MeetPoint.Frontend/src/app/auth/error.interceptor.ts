import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthTokenService } from './auth-token.service';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(AuthTokenService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !req.headers.has('x-retry')) {
        return tokenService.refresh().pipe(
          switchMap(() => next(req)),
          catchError(() => {
            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${tokenService.getAccessToken || ''}`,
                'x-retry': 'true',
              },
            });
            return next(retryReq);
          })
        );
      }
      return throwError(() => err);
    })
  );
};
