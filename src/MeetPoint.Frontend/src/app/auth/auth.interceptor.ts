import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { SKIP_AUTH } from '../http-context.tokens';
import { AuthService } from './auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const accessToken = localStorage.getItem('access_token');

  console.log('URL', req.url);

  if (req.context.get(SKIP_AUTH)) return next(req);

  req = addToken(req, accessToken);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('/refresh')) {
        console.log('401 AAAA');
        return auth.refreshToken().pipe(
          switchMap((newTokens) => {
            req = addToken(req, newTokens.accessToken);
            return next(req);
          }),
          catchError(() => {
            console.log('TOKEN REFRESH ERROR');
            auth.logout();
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};

function addToken(
  req: HttpRequest<any>,
  token: string | null
): HttpRequest<any> {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}
