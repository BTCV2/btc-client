import { Component, OnInit } from '@angular/core';
import {AdminStudentService} from '../../../service/admin-student.service';
import {IStudent} from '../../../Models/Student';
import {MatSnackBar} from '@angular/material';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  studentInfoFromGroup: FormGroup;
  parentInfoFromGroup: FormGroup;
  imageInfoFromGroup: FormGroup;
  searchStudentForm: FormGroup;
  standards = 9;
  standardArray =[9,10,11,12]
  rollnumber: any;
  image:any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  cropperReady = false;
  constructor(private _formBuilder: FormBuilder, private service: AdminStudentService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.searchStudentForm = this._formBuilder.group({
      searchRollNumber:  ['', Validators.required]
    })
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
    })
  }
  updateStudent() {
    console.log('dmeo',this.studentInfoFromGroup.value);
    const StudentObject = Object.assign(this.studentInfoFromGroup.value, this.parentInfoFromGroup.value);
    StudentObject.image = this.image;
    console.log('StudentObject',StudentObject)
    this.service.updateStudent(StudentObject).subscribe((res) => {
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
  getStudentDetails = () => {
    const search = this.searchStudentForm.value;
    this.service.getStudent(search.searchRollNumber).subscribe(
      (res) => {
        const response: any = res;
        this.studentInfoFromGroup.patchValue({
          firstName: response.firstName,
          lastName: response.lastName,
          rollNumber: response.rollNumber,
          standard: response.standard,
          school: response.school
        })
        this.parentInfoFromGroup.patchValue({
          parentName: response.parentName,
          phoneNumber: response.phoneNumber,
          email: response.email
        })
        this.croppedImage = response.image;
        this.imageInfoFromGroup.patchValue({
          image:response.image
        })
      },
      (err) => {
      },
      () =>{
      }
    );
}
  loadImageFailed () {
    console.log('IMAGE FAILED TO LOAD')
  }
}
