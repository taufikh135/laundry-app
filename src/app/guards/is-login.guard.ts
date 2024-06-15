import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const isLoginGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const token: string = await authService.getToken();

  if (!token) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  return true;
};
