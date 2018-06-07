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
  studentCompletedSyllabus = [];
  role: string;
  standard: string;
  rollNumber: string;
  formGroup: FormGroup;
  showSyllabusTable: boolean;
  subjectForm: FormGroup;
  editing= {};
  constructor(private lessonservice: LessonsService, private formBuilder: FormBuilder,
              private syllabusService:SyllabusService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.showSyllabusTable = false;
    this.subjectForm = this.formBuilder.group({
      subject: ['']
    })

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
    this.marks = [];
    this.marksdemo = ['Lesson'];

  }

  getMarks = (lessonParams) => {
    let mark = [];
    this.lessonservice.getMarks(lessonParams).subscribe(
      (res:any) => {
        mark =  res[0].marks;
      },
      (err) => {
      },
      () => {
        let marks = [];
        let marksdemo = [];
        marks.push({prop: 'Lesson'});
        marksdemo.push('Lesson')
        mark.forEach((val, key) => {
          if( val === '1'){
            marks.push({prop: 'One'});
            marksdemo.push('One');
          } else if (val === '2') {
            marks.push({prop: 'Two'});
            marksdemo.push('Two');
          }
          else if (val === '3') {
            marks.push({prop: 'Three'});
            marksdemo.push('Three');
          }
          else if (val === '5') {
            marks.push({prop: 'Five'});
            marksdemo.push('Five');
          }
          else if (val === '10') {
            marks.push({prop: 'Ten'});
            marksdemo.push('Ten');
          } });
        this.marks = marks;
        this.marksdemo = marksdemo;
        this.getLessonAndUpdate();
      }
    )
  }

  getStudentSyllabusCompletion = () => {
    this.syllabusService.getStudentSyllabus(this.standard,this.subjectForm.value.subject,this.rollNumber).subscribe(
      (res:any) => {
        this.studentCompletedSyllabus = res.lessonName;
      console.log(res);
      },
      (err) => {
        this.studentCompletedSyllabus = [];
        this.getLessonAndUpdate();
      },
      () => {

      }
    );
  }

  getLessonAndUpdate = () => {
    console.log('this.subjectForm.value.subject',this.subjectForm.value.subject);
    const lessonParams = {
      standard: this.standard,
      subject: this.subjectForm.value.subject
    };
    this.lessonservice.getLessons(lessonParams).subscribe(data => {
        this.temprows = [];
      if( this.studentCompletedSyllabus.length < 1){
      data.forEach((value, index) => {
        let syllabusTemp:any = {};
        this.marks.forEach((v) => {
          if( v.prop === 'Lesson') {
            syllabusTemp.Lesson = value.lessonName;
          } else{
            syllabusTemp[v.prop] =  'INCOMPLETE';
          }
        });
        this.temprows.push(syllabusTemp);
        this.datarows = this.temprows;
        console.log(' this.datarows completed', this.datarows);
        if ( this.role === 'admin' ) {
          this.marksdemo.push('edit');
        }
            /*this.temprows.push({
              'Lesson': value.lessonName,
              'One': 'INCOMPLETE',
              'Two': 'INCOMPLETE',
              'Three': 'INCOMPLETE',
              'Five': 'INCOMPLETE'
            });*/

        });
      } else {
        data.forEach((value) => {
            this.studentCompletedSyllabus.forEach((val) => {
              if (value.lessonName === val.lessonName) {
                let syllabusTemp:any = {};
                  this.marks.forEach((v) => {
                    if( v === 'Lesson') {
                      syllabusTemp.Lesson = v
                    } else{
                      syllabusTemp[v] = val.status === 'COMPLETE' ? 'COMPLETE' : 'INCOMPLETE'
                    }
                });
                this.temprows.push(syllabusTemp);
              }
            })
        });
        this.datarows = this.temprows;
        console.log(' this.datarows completed', this.datarows);
        if ( this.role === 'admin' ) {
          this.marksdemo.push('edit');
        }
      }
      },
      err => {
        console.log(err);
      },
      () => {
        this.datarows = this.temprows;
        console.log(' this.datarows completed', this.datarows);
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

  toggleSyllabusTable = () => {
    const lessonParams = {
      standard: this.standard,
      subject: this.subjectForm.value.subject
    };
    this.getMarks(lessonParams);
    this.showSyllabusTable = true;
  }
}
