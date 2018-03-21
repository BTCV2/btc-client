import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, public dialogRef: MatDialogRef<LogoutComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService) { }
  ngOnInit() {
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
      this.dialogRef.close();
  }
}
