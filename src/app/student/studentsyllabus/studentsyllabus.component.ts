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
  columns = [
    { prop: 'Name' },
    { prop: 'Gender' },
    { prop: 'Company', sortable: false }
  ];
  rows = [{Name: 'Goutham', Gender: 'Male', Company: 'HID'}, {Name: 'Goutham', Gender: 'Male', Company: 'HID' }]
  constructor(private lessonservice: LessonsService) { }
  ngOnInit() {
    this.datarows = [];
    const lessonParams = {
      standard: '12',
      subject: 'physics'
    };
    this.marks = [{prop: 'Lessons'}, {prop: 'One'}, {prop: 'Three'}, {prop: 'Five'}, {prop: 'Ten', sortable: false}];
   // this.datarows = [{Lessons: 'Electromagnetic Induction', One: 'INCOMPLETE', Three: "INCOMPLETE", Five: "INCOMPLETE", Ten: "COMPLETE"}];
    this.lessonservice.getLessons(lessonParams).subscribe(res => {
      if (res) {
         this.lessons =  res[0].lessons;
         const rowHeader = [];
        const dummyObject = {};
         for ( let i = 0; i < this.marks.length; i++) {
           rowHeader.push(this.marks[i].prop);
         }
         for ( let i = 0; i < this.lessons.length; i++) {
           for ( let j = 0; j < rowHeader.length; j++) {
             if (j === 0) {
               dummyObject[rowHeader[j]] = this.lessons[i].lessonName;
             } else {
               dummyObject[rowHeader[j]] = 'INCOMPLETE';
             }
           }
           this.datarows.push(dummyObject);
         }
      }
    });
  }
}
