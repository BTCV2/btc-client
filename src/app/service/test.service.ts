import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Constants} from '../constants';
@Injectable()
export class TestService {
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

   addTest = (test) => {
    return this.http.post(`${this.constants.base_server_url}/test/${test.rollNumber}`, test, this.httpOptions);
   }

   getTest = (rollNumber) => {
    return this.http.get(`${this.constants.base_server_url}/test/${rollNumber}`, this.httpOptions);
   }

}
