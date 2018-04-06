import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {IStudent} from '../Models/Student';
import {Constants} from '../constants';
import {AuthService} from "../auth/auth.service";
@Injectable()
export class AdminStudentService {
  constants: Constants;
  httpOptions: any;
  /*baseUrl = 'http://localhost:8088';*/
  constructor(private http: HttpClient, private authService: AuthService) {
    this.constants = new Constants();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer '+ localStorage.getItem('token')
      })
    };
  }
  addStudent(student: any) {
    return this.http.post(this.constants.base_server_url + '/student/create', student, this.httpOptions);
  }
  getRollNumber(standard) {
     return this.http.get(this.constants.base_server_url + '/student/' + standard + '/getRollNumber', this.httpOptions);
  }
  getStudent(rollNumber){
    return this.http.get(`${this.constants.base_server_url}/student/${rollNumber}`, this.httpOptions);
  }
  updateStudent(student: any){
    return this.http.put(this.constants.base_server_url + '/student/'+student.rollNumber+'/update', student, this.httpOptions);
  
  }
}
