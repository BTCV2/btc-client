import { Component, Inject } from '@angular/core';
import {DemoService} from './demo.service';
import { MatSpinner } from '@angular/material';
import {LoaderComponent} from "./loader/loader.component";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {LoginComponent} from "./login/login.component";
import {JoinnowComponent} from "./joinnow/joinnow.component";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DemoService]
})
export class AppComponent {
  public loaderComponent = LoaderComponent;
  title = 'app';
  public matSpinner = MatSpinner;
  data: any;
  constructor(public dialog: MatDialog) {
  }
  openLogin(): void {
    let dialogRef = this.dialog.open(LoginComponent, {
      width: '700px'
    });
  }

  openJoinNow(): void {
    let dialogRef = this.dialog.open(JoinnowComponent, {
      width: '700px'
    });
  }
    /*dialogRef.afterClosed().subscribe(result => {

    });*/
 /* }
  }*/
}
