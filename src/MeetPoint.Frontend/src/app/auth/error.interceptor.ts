import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      console.log('ITERCEPTOR ERROR:', { REQUEST: req, ERROR: err });
      if (err.status === 401) {
        inject(AuthService).logout();
        console.log('INTERCEPTOR ERROR - 401 - LOGOUT');
      }
      return throwError(() => err);
    })
  );
};
