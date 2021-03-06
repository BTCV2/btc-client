import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
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
import {AuthService} from './auth/auth.service';
import {AdminGuard} from './auth/admin-guard.guard';
import {StudentGuard} from './auth/student.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import {FancyImageUploaderModule} from 'ng2-fancy-image-uploader';
import {ImageUploadModule} from 'angular2-image-upload';
import { HomeComponent } from './home/home.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
//import {ImageCropperComponent} from 'ng2-img-cropper';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgxImgModule } from 'ngx-img';
import {NgxCarouselModule} from 'ngx-carousel';
import { JoinnowComponent } from './joinnow/joinnow.component';
import { StudentprofileComponent } from './student/studentprofile/studentprofile.component';
import { LogoutComponent } from './logout/logout.component';
import { ImageCropperModule } from './image-cropper/image-cropper.module';
import {StudentService} from './service/student.service';
import {AttendanceService} from './service/attendance.service';
import { AttendanceComponent } from './admin/attendance/attendance.component';
import { MDBBootstrapModule } from '../assets/angular-bootstrap-md/src/free/index';
import {MDBBootstrapModulePro} from '../assets/angular-bootstrap-md/src/pro/index';
import { TestComponent } from './admin/test/test.component';
import {TestService} from './service/test.service';
import { StudentattendanceComponent } from './student/studentattendance/studentattendance.component';
import { StudenttestComponent } from './student/studenttest/studenttest.component';

import { SyllabusComponent } from './admin/syllabus/syllabus.component';
import{SyllabusService} from './service/syllabus.service';
import {ChatModule} from "./chat/chat.module";
import {ChatDialogComponent} from "./chat/chat-dialog/chat-dialog.component";
import {SetUpAccountComponent} from "./set-up-account/set-up-account.component";
import {SetPasswordService} from "./service/set-password.service";
import {WINDOW_PROVIDERS} from "./service/window.service";
import { StudentChartsComponent } from './student/student-charts/student-charts.component';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FintTheme from 'fusioncharts/themes/fusioncharts.theme.fint';
import { FusionChartsModule } from 'angular4-fusioncharts';
import { StudentAttendanceChartComponent } from './student/student-attendance-chart/student-attendance-chart.component';
import {ROUTER_PROVIDERS} from "@angular/router/src/router_module";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { DataTableCellComponent } from './student/studentsyllabus/data-table-cell/data-table-cell.component';
import { SessionExpiredComponent } from './session-expired/session-expired.component';
import {DeleteStudentComponent} from "./admin/student-admin/delete-student/delete-student.component";
import {ShowStudentComponent} from "./admin/student-admin/show-student/show-student.component";
FusionChartsModule.fcRoot(FusionCharts, Charts, FintTheme);
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
    //ImageCropperComponent,
    JoinnowComponent,
    StudentprofileComponent,
    LogoutComponent,
    AttendanceComponent,
    TestComponent,
    StudentattendanceComponent,
    StudenttestComponent,
    SyllabusComponent,
    ChatDialogComponent,
    SetUpAccountComponent,
    StudentChartsComponent,
    StudentAttendanceChartComponent,
    DataTableCellComponent,
    ShowStudentComponent,
    DeleteStudentComponent,
    SessionExpiredComponent
  ],
  imports: [
    BtcRouterModule,
    FancyImageUploaderModule,
    ImageUploadModule.forRoot(),
    NgxImgModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    MDBBootstrapModulePro.forRoot(),
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    HttpClientXsrfModule,
    BrowserAnimationsModule,
    NgxCarouselModule,
    ScrollToModule.forRoot(),
    ImageCropperModule,
    FormsModule,
    ChatModule,
    LoadingBarHttpClientModule,
    FusionChartsModule,
    NgHttpLoaderModule// RoutesModule
  ],
  providers: [DemoService, AdminStudentService, AuthService, AdminGuard, StudentGuard, StudentService,
    AttendanceService, TestService, SyllabusService,SetUpAccountComponent,SetPasswordService, WINDOW_PROVIDERS ],
  exports: [HttpClientModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
  entryComponents: [
    MatSpinner,
    LoaderComponent,
    LoginComponent,
    JoinnowComponent,
    LogoutComponent,
    SessionExpiredComponent
  ]
})
export class AppModule { }
