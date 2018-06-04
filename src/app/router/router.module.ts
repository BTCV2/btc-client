import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from '../admin/admin.component';
import {StudentComponent} from '../student/student.component';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {AdminGuard} from "../auth/admin-guard.guard";
import {StudentGuard} from "../auth/student.guard";
import {UnauthorizedComponent} from "../unauthorized/unauthorized.component";
import {HomeComponent} from "../home/home.component";
import {SetUpAccountComponent} from "../set-up-account/set-up-account.component";
/*import {HomeComponent} from "../home/home.component";*/
const router: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
   component: HomeComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate : [AdminGuard],
    data: {role: 'admin'}
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'setUpAccount/:username/:scope',
    component: SetUpAccountComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: 'student/:standard/:rollNumber',
    component: StudentComponent,
    canActivate: [StudentGuard]
  }
]
@NgModule({
  imports: [
    RouterModule.forRoot(
      router, {useHash: true}
    )
  ],
  declarations: [],
  exports: [RouterModule]
})
export class BtcRouterModule { }
