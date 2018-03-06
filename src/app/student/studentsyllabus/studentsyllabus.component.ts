import { Component, OnInit } from '@angular/core';
import {LessonsService} from '../../service/lessons.service';

@Component({
  selector: 'app-studentsyllabus',
  templateUrl: './studentsyllabus.component.html',
  styleUrls: ['./studentsyllabus.component.css'],
  providers: [LessonsService]
})
export class StudentsyllabusComponent implements OnInit {
  lessons: Array<any>;
  marks: Array<any>;
  datarows = [];
  temprows = [];
  columns = [
    {prop: 'Name'},
    {prop: 'Gender'},
    {prop: 'Company', sortable: false}
  ];
  rows = [{Name: 'Goutham', Gender: 'Male', Company: 'HID'}, {Name: 'Goutham', Gender: 'Male', Company: 'HID'}]

  constructor(private lessonservice: LessonsService) {
  }

  ngOnInit() {
    this.datarows = [];
    const lessonParams = {
      standard: '12',
      subject: 'physics'
    };
    this.marks = [{prop: 'Lessons'}, {prop: 'One'}, {prop: 'Three'}, {prop: 'Five'}, {prop: 'Ten', sortable: false}];

    this.lessonservice.getLessons(lessonParams).subscribe(data => {
      data.forEach((value, index) => {
        this.temprows.push({
          'Lessons': value.lessonName,
          'One': 'INCOMPLETE',
          'Three': 'INCOMPLETE',
          'Five': 'INCOMPLETE',
          'Ten': 'INCOMPLETE'
        });
      });
      console.log(data);
    },
    err => {
      console.log(err);
    },
      () => {
      this.datarows = this.temprows;
        console.log('DONE');
      });
  }
}
