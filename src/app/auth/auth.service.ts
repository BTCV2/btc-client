import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Constants} from "../constants";
import {Observable} from "rxjs/Observable";
import * as jwtDecoder from 'jwt-decode';
@Injectable()
export class AuthService {
  private loggedIn: boolean;
  private role: string;
  private userName: string;
  private token: string;
  httpOptions:any;
  constants: Constants;
  constructor(private http: HttpClient) {
    this.constants = new Constants();
    this.loggedIn = false;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
  login(user: any) {
     return this.http.post(`${this.constants.base_server_url}/login`, user, this.httpOptions)
       .map( (res: any) => {
         this.token = res.id_token;
          const decoder = jwtDecoder(res.id_token);
                   if ( decoder ) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('role', decoder.scope);
            localStorage.setItem('userName', decoder.username);
            localStorage.setItem('token',  this.token);
            this.loggedIn = true;
            this.role = decoder.scope;
            this.userName = decoder.username;
          }
          return decoder;
       });
  }
  public isLoggedIn() {
    return this.loggedIn;
  }
  public getRoles() {
    return this.role;
  }
  public getUserName() {
    return this.userName;
  }
  public getToken() {
    return this.token;
  }
  public logout() {
    this.loggedIn = false;
    this.role = '';
    localStorage.setItem('loggedIn','false');
    localStorage.clear();
    this.userName = '';

  }

  sendQuery = (payload) => {
      return this.http.post(`${this.constants.base_server_url}/query`, payload, this.httpOptions);
  }
}
