import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

export const actorRoleGuard:
  | CanActivateFn
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree
  | undefined = (route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const expectedRole = route?.data['expectedRole'];

  const user = userService.getSession();
  if (user === undefined) {
    router.navigate(['/home'])
    return false;
  } else {
    if (user.role === expectedRole) {
      return true;
    } else {
      router.navigate(['/home'])
      return false;
    }
  }
};
