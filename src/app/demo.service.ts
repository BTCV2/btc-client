import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class DemoService {

  constructor(private http: HttpClient) {
  }

  getDemo(): Observable<any> {
    return this.http.get<any>('http://localhost:8088/demo');
  }

}
