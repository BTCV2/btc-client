import { Component, OnInit } from '@angular/core';
import {LessonsService} from '../../service/lessons.service';
import {FormBuilder, FormGroup} from "@angular/forms";

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
  formGroup: FormGroup;
  editing= {};
  constructor(private lessonservice: LessonsService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      completeStatus : ['']
    })
    this.role = localStorage.getItem('role');
    this.datarows = [];
    const lessonParams = {
      standard: '12',
      subject: 'physics'
    };
    this.marks = [{prop: 'Lessons'}, {prop: 'One'}, {prop: 'Three'}, {prop: 'Five'}, {prop: 'Ten', sortable: false}];
    this.marksdemo = ['Lessons', 'One', 'Three', 'Five', 'Ten'];
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
    },
    err => {
      console.log(err);
    },
      () => {
      this.datarows = this.temprows;
        if ( this.role === 'admin' ) {
          this.marksdemo.push('edit');
        }
      });
  }
  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex, cell)
    this.editing[rowIndex + '-' + cell] = false;
    console.log(' event.target.value',  event.target.textContent);
    this.datarows[rowIndex][cell] = event.target.textContent;
    this.datarows = [...this.datarows];
    console.log('this.datarows',this.datarows);
    console.log('UPDATED!', this.datarows[rowIndex][cell]);
  }
}
