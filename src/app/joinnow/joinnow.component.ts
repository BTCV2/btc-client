import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-joinnow',
  templateUrl: './joinnow.component.html',
  styleUrls: ['./joinnow.component.css']
})
export class JoinnowComponent implements OnInit {
  joinNowFrom: FormGroup;
  constructor( private authService: AuthService, private fb: FormBuilder, public dialogRef: MatDialogRef<JoinnowComponent>) { }

  ngOnInit() {
    this.joinNowFrom = this.fb.group({
      userName: [''],
      class: [''],
      phone:[''],
      email:[''],
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  sendQuery = () => {
    console.log('this.joinNowFrom.value',this.joinNowFrom.value);
    this.authService.sendQuery(this.joinNowFrom.value).subscribe(
      (res) => {
        console.log('QUERY RES',res)
      },
      (err) => {

      },
      () =>{

      }
    )
    this.dialogRef.close();
  }

}
