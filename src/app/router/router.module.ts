import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminComponent} from '../admin/admin.component';
import {StudentComponent} from '../student/student.component';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {AdminGuard} from "../auth/admin-guard.guard";
import {StudentGuard} from "../auth/student.guard";
import {UnauthorizedComponent} from "../unauthorized/unauthorized.component";
const router: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
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
    CommonModule,
    RouterModule.forRoot(
      router
    )
  ],
  declarations: [],
  exports: [RouterModule]
})
export class BtcRouterModule { }
