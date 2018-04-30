import { Component, OnInit } from '@angular/core';
import{StudentService} from '../../service/student.service';
import{TestService}  from '../../service/test.service';
import{AttendanceService} from '../../service/attendance.service';
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.scss']
})
export class StudentprofileComponent implements OnInit {
  profile : any;
  numberOfTest: any;
  numberOfTestPassed: any;
  numberOfAbsent:any;
  constructor(private router: ActivatedRoute, private studentService: StudentService, private testService:TestService, private attendanceService : AttendanceService) { }

  ngOnInit() {
    this.router.params.subscribe(
      params => {
        this.studentService.getSutdent( params['rollNumber']).subscribe(
          (res) => {
            this.profile = res;
            this.testService.NumberOfTest.subscribe(
              res => {
                this.numberOfTest = res;
                this.testService.NumberOfTestPassed.subscribe(
                  res => {
                    this.numberOfTestPassed = res;
                    this.attendanceService.NumberOfAbsent.subscribe(
                      res =>this.numberOfAbsent = res
                    )
                  },
                  err => {
                    console.log('ERROR IN FETCHING NUMBER OF TEST PASSED')
                  }

                )

              },
              err => {
                console.log('ERROR IN FETCHING NUMBER OF TEST WRITTEN')
              }
            )
          },
          (err) => {
          },
          () =>{
          }
        );

      }
    )


  }

}
