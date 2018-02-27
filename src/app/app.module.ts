import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {DemoService} from './demo.service';
import {AdminStudentService} from './service/admin-student.service';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import {MaterialModule} from './material/material.module';
import { AdminComponent } from './admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentAdminComponent } from './admin/student-admin/student-admin.component';
import { AddStudentComponent } from './admin/student-admin/add-student/add-student.component';
import { EditStudentComponent } from './admin/student-admin/edit-student/edit-student.component';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import {MatSpinner} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoaderComponent } from './loader/loader.component';
import {StudentComponent} from './student/student.component';
import { StudentsyllabusComponent } from './student/studentsyllabus/studentsyllabus.component';
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'student/:standard/:rollNumber',
    component: StudentComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    StudentComponent,
    StudentAdminComponent,
    AddStudentComponent,
    EditStudentComponent,
    LoaderComponent,
    StudentsyllabusComponent
  ],
  imports: [
    RouterModule.forRoot(
      routes,
     /* { enableTracing: true }*/ // <-- debugging purposes only
    ),
    BrowserModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    HttpClientXsrfModule,
    BrowserAnimationsModule,
    NgHttpLoaderModule// RoutesModule
  ],
  providers: [DemoService, AdminStudentService],
  exports: [HttpClientModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
  entryComponents: [
    MatSpinner,
    LoaderComponent
  ]
})
export class AppModule { }
