import {Component, Input, OnInit, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-student-charts',
  templateUrl: './student-charts.component.html',
  styleUrls: ['./student-charts.component.scss']
})
export class StudentChartsComponent implements OnInit {
  @Input() chartData:any;
  @Input() StudentName: any;
  tempTestChartData; any;
  /*view: any[] = [350, 320];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };*/
  overAllTest: any[];
  /*multi: any[];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Percentage';
  showYAxisLabel = true;
  yAxisLabel = 'Test';*/
  private physicsTestData:any;
  private chemistryTestData:any;
  private mathsTestData:any;
  autoScale = true;

  id = 'testChart';
  width = 300;
  height = 290;
  type = 'column3d';
  dataFormat = 'json';
  testDataSource;
  overAllTest1 = [];
  constructor() {
    //Object.assign({this.single, this.multi})
  }
  ngOnInit() {
    this.testDataSource = {
      "chart": {
        "caption": " Performance Chart ",
        "subCaption": "Over All Percentage in Major Subjects",
        "numbersuffix": "%",
        "theme": "fint"
      },
    }
    this.physicsTestData = {'pass':0, 'written':0, 'percentage':0, 'cumulative':0};
    this.chemistryTestData = {'pass':0, 'written':0, 'percentage':0, 'cumulative':0};
    this.mathsTestData = {'pass':0, 'written':0, 'percentage':0, 'cumulative':0};
    this.overAllTest =[];
    this.tempTestChartData = this.chartData;
    this.formulateChartData(this.tempTestChartData);
  }
  ngOnChanges(changes: SimpleChanges) {
    const chart: SimpleChange = changes.chartData;
    //const name : SimpleChange = changes.StudentName;
      this.tempTestChartData =  chart.currentValue;
      this.formulateChartData(this.tempTestChartData);
      this.constructHeader();
      //console.log('nameCHANGES',name.currentValue);


  }
  constructHeader = () => {

  }
  formulateChartData = (tempTestChartData) => {
    tempTestChartData.forEach((val, key) => {

      if (val.subject === 'Maths' || val.subject === 'maths') {
        this.mathsTestData.written = this.mathsTestData.written + 1;
        this.mathsTestData.cumulative = this.mathsTestData.cumulative + val.percentage;
        if (val.percentage > 40) {
          this.mathsTestData.pass = this.mathsTestData.pass + 1;
        }
      }
      else if (val.subject === 'Physics' || val.subject === 'physics') {
        this.physicsTestData.written = this.physicsTestData.written + 1;
        this.physicsTestData.cumulative = this.physicsTestData.cumulative + val.percentage;
        if (val.percentage > 40) {
          this.physicsTestData.pass = this.physicsTestData.pass + 1;
        }
      }
      else if (val.subject === 'Chemistry' || val.subject === 'chemistry') {
        this.chemistryTestData.written = this.mathsTestData.written + 1;
        this.chemistryTestData.cumulative = this.chemistryTestData.cumulative + val.percentage;
        if (val.percentage > 40) {
          this.chemistryTestData.pass = +this.mathsTestData.pass + 1;
        }
      }
    });
    this.mathsTestData.percentage = Math.ceil((this.mathsTestData.pass / this.mathsTestData.written) * 100);
    this.chemistryTestData.percentage = Math.ceil((this.chemistryTestData.pass / this.chemistryTestData.written) * 100);
    this.physicsTestData.percentage = Math.ceil((this.physicsTestData.pass / this.physicsTestData.written) * 100);
    this.overAllTest = [
      {
        "name": "Pass %",
        "series": [{
          "name": "Maths",
          "value": this.mathsTestData.percentage
        },
          {
            "name": "Physics",
            "value": this.physicsTestData.percentage
          },
          {
            "name": "Chemistry",
            "value": this.chemistryTestData.percentage
          }]

      },
      {
        "name": "overAll %",
        "series": [{
          "name": "Maths",
          "value": Math.ceil(this.mathsTestData.cumulative / this.mathsTestData.written)
        },
          {
            "name": "Physics",
            "value": Math.ceil(this.physicsTestData.cumulative / this.physicsTestData.written)
          },
          {
            "name": "Chemistry",
            "value": Math.ceil(this.chemistryTestData.cumulative / this.chemistryTestData.written)
          }]

      }];
    this.testDataSource.categories = {
      "category": [
        {
          "label": "Pass %"
        },
        {
          "label": "OverAll %"
        }
      ]
    }
    this.overAllTest1 = [

      {
        "label": "Maths",
        "value": Math.ceil(this.mathsTestData.cumulative / this.mathsTestData.written)
      },
      {
        "label": "Physics",
        "value": Math.ceil(this.physicsTestData.cumulative / this.physicsTestData.written)
      },
      {
        "label": "Chemistry",
        "value": Math.ceil(this.chemistryTestData.cumulative / this.chemistryTestData.written)
      }
    ];

    this.testDataSource.dataset = [
      {
        "seriesname": "Pass %",
        "color": "005476",
        "data": this.overAllTest1
      }
    ];
  }

}
