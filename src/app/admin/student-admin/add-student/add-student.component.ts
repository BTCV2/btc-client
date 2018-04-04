import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdminStudentService} from '../../../service/admin-student.service';
import {IStudent} from '../../../Models/Student';
import {MatSnackBar} from '@angular/material';
import{base64} from 'base64-img';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
  providers: [AdminStudentService]
})
export class AddStudentComponent implements OnInit {
  formGroup: FormGroup;
  isNonLinear = false;
  isNonEditable = false;
  studentInfoFromGroup: FormGroup;
  parentInfoFromGroup: FormGroup;
  imageInfoFromGroup: FormGroup;
  /*steps = [
    {label: 'Add Student Details', content: 'Name, Class and School'},
    {label: 'Add Parent Details', content: 'Phone number address and E-mail'},
    {label: 'Image of the Student', content: 'Image'}
  ];*/
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }
  constructor(private _formBuilder: FormBuilder, private service: AdminStudentService, public snackBar: MatSnackBar) { }
  standards = 9;
  standardArray =[9,10,11,12]
  rollnumber: any;
  image:any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperReady = false;
  ngOnInit() {
    this.studentInfoFromGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      rollNumber: ['', Validators.required],
      standard: ['', Validators.required],
      school: ['', Validators.required]
    });
    this.parentInfoFromGroup = this._formBuilder.group({
      parentName: ['', Validators.required],
      phoneNumber: ['', Validators.maxLength(11)],
      email: ['', Validators.email]
    });
    this.imageInfoFromGroup = this._formBuilder.group({
      image: ['',Validators.nullValidator]
    });
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          rollNumber: [{value: this.rollnumber, disabled: true}, Validators.required,Validators.minLength(3)],
          standard: ['', Validators.required],
          school: ['', Validators.required]
        }),
        this._formBuilder.group({
          parentName: ['', Validators.required],
          phoneNumber: ['', Validators.maxLength(11)],
          email: ['', Validators.email]
        }),
        this._formBuilder.group({
          email: ['']
        }),
      ])
    });
  }
  getRollNumber() {
    this.service.getRollNumber(this.standards).subscribe((res) => {
      this.rollnumber = res;
    });
  }
  createStudent = (formGroup) => {
    let result: any = {};
    for (let i = 0; i < formGroup.length; i++) {
      const demo = formGroup[i];
       for(let key in demo) {
          result[key] = demo[key];
          console.log("KETYS", key);
      }
    }
    const student: IStudent = result;
    this.service.addStudent(student).subscribe((res) => {
      if (res) {
        this.snackBar.open('Student has been enrolled Successfully', 'Saved', {
          duration: 2000,
        });
      }
      else {
      }
    });
  }
  // onSelect(image) {
  //   this.image = image;
  // }
  onReset(){
    
  }
  createStudentHorizontal() {
    console.log('dmeo',this.studentInfoFromGroup.value);
    const StudentObject = Object.assign(this.studentInfoFromGroup.value, this.parentInfoFromGroup.value);
    StudentObject.image = this.image;
    console.log('StudentObject',StudentObject)
    this.service.addStudent(StudentObject).subscribe((res) => {
      if (res) {
        this.studentInfoFromGroup.reset();
        this.parentInfoFromGroup.reset();
        this.imageInfoFromGroup.reset();
        this.snackBar.open('Student has been enrolled Successfully', 'Saved', {
          duration: 2000,
        });
      }
      else  {
        this.snackBar.open('Cannot enroll Student', 'Error', {
          duration: 2000,
        });
      }
    });
  }
  
  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
  
      this.croppedImage = image;
      this.image = image;
      console.log('IMAGE',this.image);
  }
  imageLoaded() {
    this.cropperReady = true;
  }
  imageLoadFailed () {
    console.log('Load failed');
  }
}
