import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  testChartData = [];
  attendanceChartData= [];
  studentname:any;
  constructor() { }

  ngOnInit() {
  }
  getTestChartData = (event) => {
    this.testChartData = event;
  }

  getAttendanceChartData = (event) => {
    this.attendanceChartData = event;
  }

  getNameData = (event) => {
    this.studentname = event;
    console.log('CAUGHT NAME ',this.studentname);
  }

}
