import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Constants} from '../constants';
import {Observable} from 'rxjs/Observable';
import {AuthService} from "../auth/auth.service";
import {Lesson} from '../Models/lesson';
@Injectable()
export class SyllabusService {
  constants: Constants;
  httpOptions: any;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.constants = new Constants();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer '+ localStorage.getItem('token'),
        'Content-Type':'application/json'
      })
    }
   }

   getSyllabus = (standard,subject)  => {
    return this.http.get(`${this.constants.base_server_url}/${standard}/${subject}/lesson`, this.httpOptions)
   }

   updateLessons = (standard,subject,payload) =>{
    return this.http.put(`${this.constants.base_server_url}/${standard}/${subject}/lesson`, payload,this.httpOptions)

   }

   getMarks = (standard,subject)  => {
    return this.http.get(`${this.constants.base_server_url}/${standard}/${subject}/mark`, this.httpOptions)
   }

   updateMarks = (standard,subject,payload) =>{
    return this.http.put(`${this.constants.base_server_url}/${standard}/${subject}/mark`, payload,this.httpOptions)

   }

   getStudentSyllabus = (standard, subject, rollNumber) => {
     return this.http.get(`${this.constants.base_server_url}/${standard}/${rollNumber}/${subject}/syllabus`, this.httpOptions)

   }


}
