import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const doctorGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role')
  const router = inject(Router);
  if (token && role === 'Doctor') {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};
