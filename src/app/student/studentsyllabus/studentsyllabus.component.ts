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
  marksdemo = [];
  role: string;
  editing= {};
  columns = [
    {prop: 'Name'},
    {prop: 'Gender'},
    {prop: 'Company', sortable: false}
  ];
  rows = [{Name: 'Goutham', Gender: 'Male', Company: 'HID'}, {Name: 'Goutham', Gender: 'Male', Company: 'HID'}]

  constructor(private lessonservice: LessonsService) {
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.datarows = [];
    const lessonParams = {
      standard: '12',
      subject: 'physics'
    };
    this.marks = [{prop: 'Lessons'}, {prop: 'One'}, {prop: 'Three'}, {prop: 'Five'}, {prop: 'Ten', sortable: false}];
    this.marksdemo = ['Lessons', 'One', 'Three', 'Five', 'Ten'];
   /* this.lessonservice.getLessons(lessonParams).subscribe(data => {
      data.forEach((value, index) => {
        this.temprows.push({
          'Lessons': value.lessonName,
          'One': 'INCOMPLETE',
          'Three': 'INCOMPLETE',
          'Five': 'INCOMPLETE',
          'Ten': 'INCOMPLETE'
        });
      });
    },
    err => {
      console.log(err);
    },
      () => {
      this.datarows = this.temprows;
        if ( this.role === 'admin' ) {
          this.marksdemo.push('edit');
        }
      });*/
  }
  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex)
    this.editing[rowIndex + '-' + cell] = false;
    this.datarows[rowIndex][cell] = event.target.value;
    this.datarows = [...this.datarows];
    console.log('UPDATED!', this.datarows[rowIndex][cell]);
  }
}
