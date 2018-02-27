import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Constants} from '../constants';
@Injectable()
export class LessonsService {
  constants: Constants;
  constructor(private http: HttpClient) {
    this.constants = new Constants();
  }
  getLessons = (lessonParams):any => {
    return this.http.get(`${this.constants.base_server_url}/${lessonParams.standard}/${lessonParams.subject}/lesson`);
  }
}
