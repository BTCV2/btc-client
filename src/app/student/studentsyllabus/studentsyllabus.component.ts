import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
  @ViewChild('myTable') table: any;
  loading:boolean;
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
    this.loading= true;
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
        /*this.getLessonAndUpdate();*/
        this.getStudentSyllabusCompletion();
      }
    )
  }

  getStudentSyllabusCompletion = () => {
    this.syllabusService.getStudentSyllabus(this.standard,this.subjectForm.value.subject,this.rollNumber).subscribe(
      (res:any) => {
        this.studentCompletedSyllabus = res;
      },
      (err) => {
        this.studentCompletedSyllabus = [];
        this.getLessonAndUpdate();
      },
      () => {
        this.getLessonAndUpdate();
      }
    );
  }

  getLessonAndUpdate = () => {

    const lessonParams = {
      standard: this.standard,
      subject: this.subjectForm.value.subject
    };
    this.lessonservice.getLessons(lessonParams).subscribe(data => {
        this.temprows = [];
      /*if( this.studentCompletedSyllabus.length < 1){*/
      data.forEach((value) => {
        let completedLessonStatus: any  = this.studentCompletedSyllabus.filter((lesson) => {
          return (value.lessonName === lesson.lessonName);
        });

        let syllabusTemp:any = {};
        this.marks.forEach((v) => {
          console.log('completedLessonStatus',completedLessonStatus,completedLessonStatus.length);
          if( v.prop === 'Lesson') {
            syllabusTemp.Lesson = value.lessonName;
          } else {
            if( completedLessonStatus.length > 0 ){
              completedLessonStatus[0].marks.forEach(marks => {
                console.log('MARKS',marks);
                if( v.prop === marks.mark){
                  syllabusTemp[v.prop] = marks.status;
                }
              })
            } else {
              syllabusTemp[v.prop] =  'INCOMPLETE';
            }
          }
        });
        this.temprows.push(syllabusTemp);
        });
      /*} else {*/
        /*data.forEach((value) => {
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
               /!* this.datarows = this.temprows;*!/
                this.loading= true;
              }
            })
        });*/
       /* this.datarows = this.temprows;*/

        /*if ( this.role === 'admin' ) {
          this.marksdemo.push('edit');
        }*/
      //}
      },
      err => {
        console.log(err);
      },
      () => {
      this.loading = true;
        this.datarows = this.temprows;
        if ( this.role === 'admin' ) {
          let hasEdit = this.marksdemo.filter((f) => {
            return f=== 'edit'
          });
          console.log('hasEdit',hasEdit);
          if(hasEdit.length < 1) {
            this.marksdemo.push('edit');
          }

        }
      });
  }
  updateValue(event, cell, rowIndex) {

    this.editing[rowIndex + '-' + cell] = false;
    this.datarows[rowIndex][cell] = event.target.textContent;
    this.datarows = [...this.datarows];

  }

  toggleSyllabusTable = () => {
    this.loading= false;
    const lessonParams = {
      standard: this.standard,
      subject: this.subjectForm.value.subject
    };
    this.getMarks(lessonParams);
    this.showSyllabusTable = true;
  }

  updateSyllabus = (event, cell, rowIndex) => {

    let keys = Object.keys(this.datarows[rowIndex]);
    let syllabusPayload:any = {};
    let syllabusMarksUpdate = [];
    keys.forEach((value) => {
      if (value === 'Lesson') {
        syllabusPayload.lessonName = this.datarows[rowIndex][value];
      } else {
        syllabusMarksUpdate.push({
          'mark':value,
          'status': this.datarows[rowIndex][value]
        })
      }
    });
    syllabusPayload.marks = syllabusMarksUpdate;
    this.formGroup.reset();
    this.syllabusService.updateStudentSyllabus(this.standard,this.subjectForm.value.subject,this.rollNumber,syllabusPayload).subscribe(
      (res:any) => {
        this.studentCompletedSyllabus = res.lessonName;
      },
      (err) => {
        this.studentCompletedSyllabus = [];
        this.getLessonAndUpdate();
      },
      () => {
        this.getStudentSyllabusCompletion();
      }
    );
  }
}
