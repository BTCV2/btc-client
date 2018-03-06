import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ParamMap,
  ActivatedRoute
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "./auth.service";
import 'rxjs/add/operator/switchMap';
@Injectable()
export class StudentGuard implements CanActivate {
  rollNumber = '';
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (localStorage.getItem('loggedIn')) {
        this.rollNumber = next.params.rollNumber;
        if (localStorage.getItem('role') === 'admin' || localStorage.getItem('userName') ===  this.rollNumber ) {
          return true;
        }else {
          const standard = localStorage.getItem('userName').slice(4, 6);
          const userName = localStorage.getItem('userName');
          console.log(standard, userName);
          this.router.navigate(['/student', standard , userName]);
          /*return false;*/
        }
      }else {
        this.router.navigate(['/login']);
        /*return false;*/
      }
  }
}
