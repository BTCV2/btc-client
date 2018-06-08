import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  testChartData = [];
  attendanceChartData= [];
  constructor() { }

  ngOnInit() {
  }
  getTestChartData = (event) => {
    this.testChartData = event;
    console.log('testChartData',this.testChartData)
  }

  getAttendanceChartData = (event) => {
    this.attendanceChartData = event;
  }

}
