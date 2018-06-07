import { Component, OnInit } from '@angular/core';
import {LessonsService} from '../../service/lessons.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SyllabusService} from "../../service/syllabus.service";
import {ActivatedRoute} from "@angular/router";

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
  standard: string;
  rollNumber: string;
  formGroup: FormGroup;
  editing= {};
  constructor(private lessonservice: LessonsService, private formBuilder: FormBuilder,
              private syllabusService:SyllabusService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      completeStatus : ['']
    })
    this.role = localStorage.getItem('role');
    this.datarows = [];
    this.route.params.subscribe(
      params => {
        this.standard = params['standard'];
        this.rollNumber = params['rollNumber']
      }
    )
    const lessonParams = {
      standard: '12',
      subject: 'physics'
    };
    this.getMarks(lessonParams);
    this.marks = [{prop: 'Lessons'}];
    this.marksdemo = ['Lessons'];

  }

  getMarks = (lessonParams) => {
    this.lessonservice.getMarks(lessonParams).subscribe(
      (res:any) => {
       const mark =  res[0].marks;
        mark.forEach((val, key) => {
          if( val === '1'){
            this.marks.push({prop: 'One'});
            this.marksdemo.push('One');
          } else if (val === '2') {
            this.marks.push({prop: 'Two'});
            this.marksdemo.push('Two');
          }
          else if (val === '3') {
            this.marks.push({prop: 'Three'});
            this.marksdemo.push('Three');
          }
          else if (val === '5') {
            this.marks.push({prop: 'Five'});
            this.marksdemo.push('Five');
          }
          else if (val === '10') {
            this.marks.push({prop: 'Ten'});
            this.marksdemo.push('Ten');
          }
        })
      },
      (err) => {

      },

      () => {
        this.getStudentSyllabusCompletion();
      }
    )
  }

  getStudentSyllabusCompletion = () => {
    this.syllabusService.getStudentSyllabus(this.standard,'physics',this.rollNumber).subscribe(
      (res) => {
      console.log(res);
      },
      (err) => {

      },
      () => {
        this.getLessonAndUpdate();
      }
    );
  }

  getLessonAndUpdate = () => {
    const lessonParams = {
      standard: '12',
      subject: 'physics'
    };
    this.lessonservice.getLessons(lessonParams).subscribe(data => {
        data.forEach((value, index) => {
          this.temprows.push({
            'Lessons': value.lessonName,
            'One': 'INCOMPLETE',
            'Two': 'INCOMPLETE',
            'Three': 'INCOMPLETE',
            'Five': 'INCOMPLETE'
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
