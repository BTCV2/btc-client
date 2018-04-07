import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Constants} from '../constants';
@Injectable()
export class AttendanceService {
  constants: Constants;
  httpOptions: any;
  constructor(private http: HttpClient) {
    this.constants = new Constants();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer '+ localStorage.getItem('token')
      })
    };
   }

   addAttendance = (attendance) => {
    return this.http.post(`${this.constants.base_server_url}/attendance/${attendance.rollNumber}`, attendance, this.httpOptions);
  
   }

   updateAttendance(attendance) {
    return this.http.put(`${this.constants.base_server_url}/attendance/${attendance.rollNumber}`, attendance, this.httpOptions);
  
   }
   getAttendance = (rollNumber) => {
    return this.http.get(`${this.constants.base_server_url}/attendance/${rollNumber}`, this.httpOptions);
  
   }
   getAllAttendance = (rollNumber) => {
    return this.http.get(`${this.constants.base_server_url}/attendance/${rollNumber}/.search`, this.httpOptions);
  
   }
}
