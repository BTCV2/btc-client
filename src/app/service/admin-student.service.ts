import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IStudent} from '../Models/Student';
import {Constants} from '../constants';
@Injectable()
export class AdminStudentService {
  constants: Constants;
  /*baseUrl = 'http://localhost:8088';*/
  constructor(private http: HttpClient) {
    this.constants = new Constants();
  }
  addStudent(student: any) {
    console.log(this.constants.base_server_url + '/student/create', student);
    return this.http.post(this.constants.base_server_url + '/student/create', student);
  }
  getRollNumber(standard) {
    return this.http.get(this.constants.base_server_url + '/student/' + standard + '/getRollNumber');
  }
}
