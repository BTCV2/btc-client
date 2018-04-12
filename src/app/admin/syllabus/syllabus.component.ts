import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {SyllabusService} from '../../service/syllabus.service';
@Component({
  selector: 'app-syllabus',
  templateUrl: './syllabus.component.html',
  styleUrls: ['./syllabus.component.scss']
})
export class SyllabusComponent implements OnInit {
  syllabusForm: FormGroup;
  marksForm: FormGroup;
  chips = [];
  markchips = [];
  constructor(private _formBuilder: FormBuilder, public service: SyllabusService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.syllabusForm = this._formBuilder.group({
      'standard':['',Validators.required],
      'subject':['',Validators.required],
      'lessonNumber':[],
      'lessonName':[]
    })
    this.marksForm = this._formBuilder.group({
      'standard':['',Validators.required],
      'subject':['',Validators.required],
      'marks':[],
    })
  }


  addLessonToChip = () => {
    let lessonObject:any = {};
    lessonObject.lessonNumber =  this.syllabusForm.value.lessonNumber;
    lessonObject.lessonName =  this.syllabusForm.value.lessonName;
      this.chips.push(lessonObject);
  }

  addMarkToChip = () => {
      this.markchips.push(this.marksForm.value.marks);
  }
  

  removeChip = (chip) => {
    for(let i=0; i <this.chips.length; i++){
      if(JSON.stringify(this.chips[i])=== JSON.stringify(chip)){
        this.chips.splice(i,1);
      }
    }
  }

  removeMarkChip = (chip) => {
    for(let i=0; i <this.markchips.length; i++){
      if(JSON.stringify(this.markchips[i])=== JSON.stringify(chip)){
        this.markchips.splice(i,1);
      }
    }
  }

  getSyllabus = () => {
    this.service.getSyllabus( this.syllabusForm.value.standard,this.syllabusForm.value.subject).subscribe(
      (res):any => {
        let response :any= res;
          
          for(let i=0; i < response.length; i++){
           
              this.chips.push(response[i]);
          }
      },
      err => {
          console.log('SYLLABUS ERROR',err)
      },
      () => {

      }
    )
  }

  getMarks = () => {
    this.service.getMarks( this.marksForm.value.standard,this.marksForm.value.subject).subscribe(
      (res:any) => {
        let response :any= res[0].marks;
          
          for(let i=0; i < response.length; i++){
           
              this.markchips.push(response[i]);
          }
      },
      err => {
          console.log('MARKS ERROR',err)
      },
      () => {

      }
    )
  }

  updateLessons = () => {
    this.service.updateLessons( this.syllabusForm.value.standard,this.syllabusForm.value.subject,
      this.chips).subscribe(
        res =>{
          console.log('AFTER UPDATE',res);
          this.snackBar.open('Lessons has been Saved', 'Done', {
            duration: 2000,
          });
          this.syllabusForm.reset();
          this.chips = [];
        },
        err =>{

        },
        ()=>{

        }
      )
  }

  updateMarks = () => {
    this.service.updateMarks( this.marksForm.value.standard,this.marksForm.value.subject,
      this.markchips).subscribe(
        res =>{
          console.log('AFTER UPDATE',res);
          this.snackBar.open('Marks has been Saved', 'Done', {
            duration: 2000,
          });
          this.marksForm.reset();
          this.markchips = [];
        },
        err =>{

        },
        ()=>{

        }
      )
  }


}
