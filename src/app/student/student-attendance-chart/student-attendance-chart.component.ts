import {Component, Input, OnInit, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-student-attendance-chart',
  templateUrl: './student-attendance-chart.component.html',
  styleUrls: ['./student-attendance-chart.component.scss']
})
export class StudentAttendanceChartComponent implements OnInit {
    @Input() chartData :any;
  tempAttendaceChartData = [];
  id = 'attendanceChart';
  width = 300;
  height = 290;
  type = 'pie3d';
  dataFormat = 'json';
  attendance:any
  attendanceDataSource:any = {
    "chart": {
      "caption": "Distribution of traffic from Social Media",
      "showvalues": "1",
      "showpercentvalues": "1",
      "showpercentintooltip": "0",
      "width": '450',
      "height": '300',
      "bgcolor": "#FFFFFF",
      "basefontcolor": "#400D1B",
      "showshadow": "0",
      "animation": "1",
      "showborder": "0",
      "palettecolors": "#BE3243,#986667,#BE6F71,#CB999A,#DFC0B1,#E0D0D0"
    }
  }
  constructor() {
    this.attendance = {"present":0,"absent":0,"late":0,"overall":0}
  }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    const chart: SimpleChange = changes.chartData;
    this.tempAttendaceChartData =  chart.currentValue;
    console.log('this.tempAttendaceChartData onchanges' ,this.tempAttendaceChartData)
    this.formulateChartData(this.tempAttendaceChartData);
  }
  formulateChartData = (tempAttendaceChartData) => {
    this.attendance.overall = tempAttendaceChartData.length;
    tempAttendaceChartData.forEach((val) => {
      console.log('tempAttendaceChartData val TYPE',val.type);
      if(val.type ==='absent'){
        console.log('ENTERING ABSENT')
        this.attendance.absent =  this.attendance.absent +1;
      }
      else if (val.remaks.constains('late') || val.remaks.constains('Late')) {
        console.log('ENTERING LATE')
        this.attendance.late =  this.attendance.late +1;
      }else if(val.type ==='present'){
        console.log('ENTERING PRESENT')
        this.attendance.present =  this.attendance.present +1;
      }
    });
    console.log('this.attendance',this.attendance);
    this.attendanceDataSource.data = [
      {
        "label":"Present",
        "value":this.attendance.present
      },{
        "label":"Late",
        "value":this.attendance.late
      },{
        "label":"Absent",
        "value":this.attendance.absent
      }
    ];
  };

}
