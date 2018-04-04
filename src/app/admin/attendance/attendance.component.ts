import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  attendance: FormGroup;
  constructor(private _formBuilder: FormBuilder) { }

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

}
