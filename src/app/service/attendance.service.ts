import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { of } from 'rxjs/observable/of';
import {Constants} from '../constants';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class AttendanceService {
  constants: Constants;
  httpOptions: any;
  public NumberOfAbsent: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(private http: HttpClient) {
    this.constants = new Constants();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer '+ localStorage.getItem('token'),
        'Content-Type':'application/json'
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
    return this.http.get<any>(`${this.constants.base_server_url}/attendance/${rollNumber}/.search`, this.httpOptions).pipe(
     tap((attendance)=>{
       this.absentCalculation(attendance);
     })
    );

   }
   absentCalculation = (attendance) => {
     let absentdays = attendance.filter((attendance) => {
       return attendance.type === 'absent';
     })
      this.NumberOfAbsent.next(absentdays.length);
   }
}
