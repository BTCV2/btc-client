import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { of } from 'rxjs/observable/of';
import {Constants} from '../constants';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class TestService {
  public NumberOfTest: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public NumberOfTestPassed: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constants: Constants;
  httpOptions: any;
  constructor(private http: HttpClient) {
    this.constants = new Constants();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer '+ localStorage.getItem('token'),
        'Content-Type':'application/json'
      })
    };
   }

   addTest = (test) => {
    return this.http.post(`${this.constants.base_server_url}/test/${test.rollNumber}`, test, this.httpOptions);
   }

   getTest = (rollNumber) => {
    return this.http.get<any>(`${this.constants.base_server_url}/test/${rollNumber}`, this.httpOptions).pipe(
      tap((res) =>{
          this.getTestStatistics(res);
      })
    );
   }

   getTestStatistics = (test) => {
      this.NumberOfTest.next(test.length);
      let passedtest = test.filter((test) => {
        return test.percentage >= 40;
      })
      this.NumberOfTestPassed.next(passedtest.length)
   }

}
