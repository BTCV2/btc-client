import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {DemoService} from './demo.service';
import {AdminStudentService} from './service/admin-student.service';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import {MaterialModule} from './material/material.module';
import { AdminComponent } from './admin/admin.component';
/*import { RouterModule, Routes } from '@angular/router';*/
import { StudentAdminComponent } from './admin/student-admin/student-admin.component';
import { AddStudentComponent } from './admin/student-admin/add-student/add-student.component';
import { EditStudentComponent } from './admin/student-admin/edit-student/edit-student.component';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import {MatSpinner} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './loader/loader.component';
import {StudentComponent} from './student/student.component';
import { StudentsyllabusComponent } from './student/studentsyllabus/studentsyllabus.component';
import {BtcRouterModule} from './router/router.module';
import { LoginComponent } from './login/login.component';
import {AuthService} from "./auth/auth.service";
import {AdminGuard} from "./auth/admin-guard.guard";
import {StudentGuard} from "./auth/student.guard";
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import {FancyImageUploaderModule} from "ng2-fancy-image-uploader";
import {ImageUploadModule} from "angular2-image-upload";
import { HomeComponent } from './home/home.component';
import {ImageCropperComponent} from "ng2-img-cropper";
/*import { OwlModule } from 'ngx-owl-carousel';*/

import {NgxCarouselModule} from "ngx-carousel";
import { JoinnowComponent } from './joinnow/joinnow.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    StudentComponent,
    StudentAdminComponent,
    AddStudentComponent,
    EditStudentComponent,
    LoaderComponent,
    StudentsyllabusComponent,
    LoginComponent,
    UnauthorizedComponent,
    HomeComponent,
    ImageCropperComponent,
    JoinnowComponent
  ],
  imports: [
    BtcRouterModule,
    FancyImageUploaderModule,
    ImageUploadModule.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    HttpClientXsrfModule,
    BrowserAnimationsModule,
    NgxCarouselModule,
    /*OwlModule,*/
    NgHttpLoaderModule// RoutesModule
  ],
  providers: [DemoService, AdminStudentService, AuthService, AdminGuard, StudentGuard],
  exports: [HttpClientModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
  entryComponents: [
    MatSpinner,
    LoaderComponent,
    LoginComponent,
    JoinnowComponent
  ]
})
export class AppModule { }
