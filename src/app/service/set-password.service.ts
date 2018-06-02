import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Constants} from '../constants';

@Injectable()
export class SetPasswordService {

  constants: Constants;
  httpOptions: any;
  constructor(private http: HttpClient, ) {
    this.constants = new Constants();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer '+ localStorage.getItem('token'),
        'Content-Type':'application/json'
      })
    };
  }

  setPassword(userName:any, payload:any){
   return this.http.put(this.constants.base_server_url+'/user/'+userName+'', payload, this.httpOptions);

  }
}
