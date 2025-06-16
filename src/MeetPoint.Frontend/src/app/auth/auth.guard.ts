import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  console.log('GUARD START', auth.user(), auth.isAuthenticated().subscribe());

  return auth.isAuthenticated().pipe(
    map((user) => {
      console.log('User', user);
      return !!user;
    }),
    catchError(() => {
      console.log('ERROR ON GUARD');
      return router.navigateByUrl('/login');
    })
  );
};
