import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AttendanceService} from '../../service/attendance.service'
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  attendance: FormGroup;
  constructor(private _formBuilder: FormBuilder, private service: AttendanceService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.attendance = this._formBuilder.group({
      rollNumber:  ['', Validators.required],
      date:  ['', Validators.required],
      type:  ['', Validators.required],
      checkin:  ['', Validators.required],
      checkout:  ['', Validators.required],
      remarks:  ['', Validators.required]
    })
  }

  checkIn = () =>{
    this.service.addAttendance(this.attendance.value).subscribe(
      (res) => {
        this.snackBar.open('Attendance has been Saved', 'Done', {
          duration: 2000,
        });
        this.attendance.reset();
      },
      (err) => {
        console.log('ERROR', err);
      },
      () => {
        console.log('COMPLETED');
      }
    )

  }

  checkOut = () => {
    this.service.updateAttendance(this.attendance.value).subscribe(
      (res) => {
        this.snackBar.open('Attendance has been Saved', 'Done', {
          duration: 2000,
        });
        this.attendance.reset();
      },
      (err) => {
        console.log('ERROR', err);
      },
      () => {
        console.log('COMPLETED');
      }
      
    )
  }

  getAttendance = () => {
    this.service.getAttendance(this.attendance.value.rollNumber).subscribe(
      (res) => {
        const result = res[0];
        this.attendance.patchValue({
          rollNumber:  result.rollNumber,
          date:   result.date,
          type:   result.type,
          checkin:  result.checkin,
          checkout:  result.checkout,
          remarks:   result.remarks,
        })
      },
      (err) => {
        console.log('ERROR', err);
      },
      () => {
        console.log('COMPLETED');
      }
    )
  }

}
