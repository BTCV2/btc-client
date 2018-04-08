import { Component, Inject } from '@angular/core';
import { MatSpinner } from '@angular/material';
import {LoaderComponent} from "./loader/loader.component";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {LoginComponent} from "./login/login.component";
import {JoinnowComponent} from "./joinnow/joinnow.component";
import {LogoutComponent} from "./logout/logout.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public loaderComponent = LoaderComponent;
  title = 'app';
  public matSpinner = MatSpinner;
  data: any;
  login: boolean;
  chatToggle:boolean;
  constructor(public dialog: MatDialog) {
    this.chatToggle = false;
    this.login = (localStorage.getItem('loggedIn')==='true'? true : false);
  }
  openLogin(): void {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '700px'
    });
    dialogRef.componentInstance.loginStatus = false;
    dialogRef.afterClosed().subscribe(result => {
     // this.login = dialogRef.componentInstance.loginStatus;
      this.login = (localStorage.getItem('loggedIn')==='true'? true : false);
    });
  }

  openLogout(): void {
    let dialogRef = this.dialog.open(LogoutComponent, {
      width: '500px'
    });
  /*  dialogRef.componentInstance.loginStatus = false;*/
    dialogRef.afterClosed().subscribe(result => {
      this.login = false;
     /* this.login = dialogRef.componentInstance.loginStatus;*/
    });
  }

  openJoinNow(): void {
    let dialogRef = this.dialog.open(JoinnowComponent, {
      width: '700px'
    });
  }
}
