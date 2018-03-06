import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Constants} from '../constants';
import {Observable} from 'rxjs/Observable';
import {Lesson} from '../Models/lesson';
@Injectable()
export class LessonsService {
  constants: Constants;
  constructor(private http: HttpClient) {
    this.constants = new Constants();
  }
  getLessons(lessonParams): Observable<Lesson[]> {
    return this.http.get(`${this.constants.base_server_url}/${lessonParams.standard}/${lessonParams.subject}/lesson`)
      .map((res) => {
          return res.map(item => {
            return new Lesson(item.lessonNumber, item.lessonName);
          });
        });
  }
}
