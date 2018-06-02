import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {Constants} from '../constants';
import {AuthService} from "../auth/auth.service";
@Injectable()
export class StudentService {
  constants: Constants;
  httpOptions: any;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.constants = new Constants();
  this.httpOptions = {
    headers: new HttpHeaders({
      'Authorization':'Bearer '+ localStorage.getItem('token'),
      'Content-Type':'application/json'
    })
  };
  }
  getSutdent(rollNumber){
    return this.http.get(`${this.constants.base_server_url}/student/${rollNumber}`, this.httpOptions);
  }
}
