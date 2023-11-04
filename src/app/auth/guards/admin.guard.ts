import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const router = inject(Router);
  if (token && role === 'Admin') {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
