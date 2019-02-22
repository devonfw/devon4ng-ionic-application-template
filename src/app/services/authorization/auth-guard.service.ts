import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { AuthServiceProvider } from '../security/auth-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private auth: AuthServiceProvider,
    ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const authInfo = {
      authenticated: this.auth.getAuthenticated(),
    };

    if (!authInfo.authenticated) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
