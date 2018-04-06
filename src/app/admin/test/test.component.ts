import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TestService } from '../../service/test.service'
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
    testForm : FormGroup;
  constructor(private service: TestService, private _formBuilder: FormBuilder,  public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.testForm = this._formBuilder.group({
      rollNumber: ['', Validators.required],
      subject: ['', Validators.required],
      date: ['', Validators.required],
      mark: ['', Validators.required],
      fullMark: ['', Validators.required],
    });
  }

  saveTest = () => {
    this.service.addTest(this.testForm.value).subscribe(
      (res) => {
        this.snackBar.open('Test has been Saved', 'Done', {
          duration: 2000,
        });
      },
      (err) => {
        console.log(err)
      },
      () => {
        console.log('COMPELTED')
      }
    )
  }

}
