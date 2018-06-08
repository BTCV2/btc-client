import {Component, OnInit, ViewChild, Input, EventEmitter, Output} from '@angular/core';
import {TestService} from '../../service/test.service';
import{ActivatedRoute} from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-studenttest',
  templateUrl: './studenttest.component.html',
  styleUrls: ['./studenttest.component.scss']
})
export class StudenttestComponent implements OnInit {

  constructor(private testService:TestService, private route: ActivatedRoute) { }
  test: any;
  @Input() percentage: any;
  @ViewChild('myTable') table: any;
  @Output() testChartData = new EventEmitter<any>();
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
        this.testService.getTest(params['rollNumber']).subscribe(
          (res) => {
            this.test = res;
            this.temp = res;
            this.testChartData.emit(res);
          },
          (err) => {
            console.log('TEST ERROR',err);
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
      this.test = [...this.temp];
      // Whenever the filter changes, always go back to the first page
      this.table.offset = 0;
  }
  this.controls.pageSize = parseInt(value);

  this.table.limit = this.controls.pageSize;
  window.dispatchEvent(new Event('resize'));
}

}
