import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivateChild {
  constructor(private store: Store, private router: Router) { }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.store.selectSnapshot(state => state.auth);
    if (currentUser && currentUser.accessToken) {
      return true;
    }

    this.router.navigate(['/welcome']);

    return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.store.selectSnapshot(state => state.auth);
    if (currentUser && currentUser.accessToken) {
      return true;
    }

    this.router.navigate(['/welcome']);

    return false;
  }
}
