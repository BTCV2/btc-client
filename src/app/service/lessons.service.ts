import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Constants} from '../constants';
import {Observable} from 'rxjs/Observable';
import {Lesson} from '../Models/lesson';
import {AuthService} from "../auth/auth.service";
@Injectable()
export class LessonsService {
  constants: Constants;
  httpOptions: any;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.constants = new Constants();
    this.httpOptions = {
      headers: new HttpHeaders({
        'Authorization':'Bearer '+ localStorage.getItem('token')
      })
    };
  }
  getLessons(lessonParams): Observable<Lesson[]> {
    console.log('this.httpOptions', this.httpOptions);
    return this.http.get(`${this.constants.base_server_url}/${lessonParams.standard}/${lessonParams.subject}/lesson`, this.httpOptions)
      .map((res) => {
          return res.map(item => {
            return new Lesson(item.lessonNumber, item.lessonName);
          });
        });
  }
}
