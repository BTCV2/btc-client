import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "./auth.service";
import {AppComponent} from "../app.component";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    AppComponent.showMenu = false;
    if (localStorage.getItem('loggedIn')) {
      if (localStorage.getItem('role') === next.data.role) {
        return true;
      }
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
