import { Component, Inject } from '@angular/core';
import { MatSpinner } from '@angular/material';
import {LoaderComponent} from "./loader/loader.component";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {LoginComponent} from "./login/login.component";
import {JoinnowComponent} from "./joinnow/joinnow.component";
import {LogoutComponent} from "./logout/logout.component";
import {Router} from "@angular/router";

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
  public static login: boolean;
  chatToggle:boolean;
  public static showMenu: boolean;
  constructor(public dialog: MatDialog, public router: Router) {
    this.chatToggle = false;
    AppComponent.showMenu = true;
    if(!AppComponent.login){
      AppComponent.login = (localStorage.getItem('loggedIn')==='true'? true : false);
    }

  }
  ngOnInit(){
    if(!AppComponent.login){
      AppComponent.login = (localStorage.getItem('loggedIn')==='true'? true : false);
    }
  }

  get showMenu() {
    return AppComponent.showMenu;
  }

  get showLogin() {
    return AppComponent.login
  }
  openLogin(): void {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '700px'
    });
    dialogRef.componentInstance.loginStatus = false;
    dialogRef.afterClosed().subscribe(result => {
     // this.login = dialogRef.componentInstance.loginStatus;
      AppComponent.login = (localStorage.getItem('loggedIn')==='true'? true : false);
    });
  }

  openLogout(): void {
    let dialogRef = this.dialog.open(LogoutComponent, {
      width: '500px'
    });
  /*  dialogRef.componentInstance.loginStatus = false;*/
    dialogRef.afterClosed().subscribe(result => {
      AppComponent.login = false;
     /* this.login = dialogRef.componentInstance.loginStatus;*/
    });
  }

  openJoinNow(): void {
    let dialogRef = this.dialog.open(JoinnowComponent, {
      width: '700px'
    });
  }
}
