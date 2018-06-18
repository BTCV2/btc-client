import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {LoginComponent} from "../login/login.component";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";


@Component({
  selector: 'app-session-expired',
  templateUrl: './session-expired.component.html',
  styleUrls: ['./session-expired.component.scss']
})
export class SessionExpiredComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
              public dialogRef: MatDialogRef<SessionExpiredComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogLogin: MatDialog
              ) { }

  ngOnInit() {
  }

  gotoLogin = () => {
    this.onNoClick();
    let dialogRef = this.dialogLogin.open(LoginComponent, {
      width: '700px'
    });
  };
  gotoHome = () => {
    console.log('CLOSING SESSION EXPIRED');
    this.onNoClick();
    this.authService.logout();
    this.router.navigate(['/']);
    this.dialogRef.close();
  }
  onNoClick(): boolean {
    this.dialogRef.close();
    return true;
  }

}
