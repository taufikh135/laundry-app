import { CanActivateFn } from '@angular/router';

export const isNotLoginGuard: CanActivateFn = (route, state) => {
  return true;
};
