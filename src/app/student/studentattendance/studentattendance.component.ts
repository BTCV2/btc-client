import { Component, OnInit, ViewChild } from '@angular/core';
import {AttendanceService} from '../../service/attendance.service';
import{ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-studentattendance',
  templateUrl: './studentattendance.component.html',
  styleUrls: ['./studentattendance.component.scss'],
})
export class StudentattendanceComponent implements OnInit {

  constructor(private attendanceService:AttendanceService, private route: ActivatedRoute) { }
  attendance: any;
  @ViewChild('myTable') table: any;
  temp: any;
  timeout: any;
  pageSize: number = 10;
  expanded: any = {};
  controls: any = {
    pageSize:  10,
    filter: '',
}
toggleExpandRow(row) {
  console.log('Toggled Expand Row!', row);
  this.table.rowDetail.toggleExpandRow(row);
}
getCellClass({ row, column, value }): any {
  return {
      'border-grey': true
  };
}
onDetailToggle(event) {
  console.log('Detail Toggled', event);
}
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.attendanceService.getAllAttendance(params['rollNumber']).subscribe(
          (res) => {
            this.attendance = res;
            this.temp = res;
          },
          (err) => {
            console.log('ATTENDANCE ERROR',err);
          },
          () => {
            console.log('COMPLETED')
          }
        )
      }
    )
    
  }
  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
        console.log('paged!', event);
    }, 100);
}

updatePageSize(value) {

  if (!this.controls.filter) {
      // update the rows
      this.attendance = [...this.temp];
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
  }
  this.controls.pageSize = parseInt(value);

  this.table.limit = this.controls.pageSize;
  window.dispatchEvent(new Event('resize'));
}

}
