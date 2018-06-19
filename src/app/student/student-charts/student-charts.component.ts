import {Component, Input, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-student-charts',
  templateUrl: './student-charts.component.html',
  styleUrls: ['./student-charts.component.scss']
})
export class StudentChartsComponent implements OnInit {
  @Input() chartData:any;
  @Input() StudentName: any;
  tempTestChartData; any;
  standard:any
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
  private scienceTestData:any;
  private socialTestData: any
  autoScale = true;

  id = 'testChart';
  width = 300;
  height = 290;
  type = 'column3d';
  dataFormat = 'json';
  testDataSource;
  overAllTest1 = [];
  constructor(private route: ActivatedRoute) {
    //Object.assign({this.single, this.multi})
  }
  ngOnInit() {
    // this.standard = (localStorage.getItem('userName')).slice(4, 6);
    this.route.params.subscribe(params => {
      this.standard = params['standard']
    });
     console.log('this.standard',this.standard);
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
    this.scienceTestData = {'pass':0, 'written':0, 'percentage':0, 'cumulative':0};
    this.socialTestData  = {'pass':0, 'written':0, 'percentage':0, 'cumulative':0};
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
    console.log('this.standard',this.standard);
    if (parseInt(this.standard) > 10) {
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
          this.chemistryTestData.written = this.chemistryTestData.written + 1;
          this.chemistryTestData.cumulative = this.chemistryTestData.cumulative + val.percentage;
          if (val.percentage > 40) {
            this.chemistryTestData.pass = +this.chemistryTestData.pass + 1;
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
    } else{
      tempTestChartData.forEach((val, key) => {

        if (val.subject === 'Maths' || val.subject === 'maths') {
          this.mathsTestData.written = this.mathsTestData.written + 1;
          this.mathsTestData.cumulative = this.mathsTestData.cumulative + val.percentage;
          if (val.percentage > 40) {
            this.mathsTestData.pass = this.mathsTestData.pass + 1;
          }
        }
        else if (val.subject === 'Science' || val.subject === 'science') {
          this.scienceTestData.written = this.scienceTestData.written + 1;
          this.scienceTestData.cumulative = this.scienceTestData.cumulative + val.percentage;
          if (val.percentage > 40) {
            this.scienceTestData.pass = this.scienceTestData.pass + 1;
          }
        }
        else if (val.subject === 'Social' || val.subject === 'social') {
          this.socialTestData.written = this.socialTestData.written + 1;
          this.socialTestData.cumulative = this.socialTestData.cumulative + val.percentage;
          if (val.percentage > 40) {
            this.socialTestData.pass = +this.socialTestData.pass + 1;
          }
        }
      });
      this.mathsTestData.percentage = Math.ceil((this.mathsTestData.pass / this.mathsTestData.written) * 100);
      this.scienceTestData.percentage = Math.ceil((this.scienceTestData.pass / this.scienceTestData.written) * 100);
      this.socialTestData.percentage = Math.ceil((this.socialTestData.pass / this.socialTestData.written) * 100);
      this.overAllTest = [
        {
          "name": "Pass %",
          "series": [{
            "name": "Maths",
            "value": this.mathsTestData.percentage
          },
            {
              "name": "Science",
              "value": this.scienceTestData.percentage
            },
            {
              "name": "Social",
              "value": this.socialTestData.percentage
            }]

        },
        {
          "name": "overAll %",
          "series": [{
            "name": "Maths",
            "value": Math.ceil(this.mathsTestData.cumulative / this.mathsTestData.written)
          },
            {
              "name": "Science",
              "value": Math.ceil(this.scienceTestData.cumulative / this.scienceTestData.written)
            },
            {
              "name": "Social",
              "value": Math.ceil(this.socialTestData.cumulative / this.socialTestData.written)
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
          "label": "Science",
          "value": Math.ceil(this.scienceTestData.cumulative / this.scienceTestData.written)
        },
        {
          "label": "Chemistry",
          "value": Math.ceil(this.socialTestData.cumulative / this.socialTestData.written)
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

}
