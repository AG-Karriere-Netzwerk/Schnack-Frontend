import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";
import {catchError, map, Observable, tap} from "rxjs";

export const authGuard: CanActivateFn = (route, state) : any => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.isAuthenticated().pipe(
    map(isAuthenticated => {
      console.log(isAuthenticated);
      if (!isAuthenticated) {
        return router.navigate(['/login']);
      }
      return true;
    })
  )
};
