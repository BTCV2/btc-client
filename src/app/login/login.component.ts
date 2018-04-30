import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {User} from "./user";
import {AuthService} from "../auth/auth.service";
import {Router, ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
  invalidCredentials: boolean;
  loginStatus:boolean;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute, public dialogRef: MatDialogRef<LoginComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.invalidCredentials = false;
    this.loginForm = this.fb.group({
      userName: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }
  login = () => {
    this.user = new User(this.loginForm.value.userName, this.loginForm.value.password);
    this.authService.login(this.user).subscribe(res => {
      this.loginStatus = true;
      this.onNoClick();
      console.log("Login Response", res);
      if(res.firstLogin === 'Y'){
        this.router.navigate(['/setUpAccount']);
      }
       else if (res.scope === 'admin' ) {
          this.router.navigate(['/admin']);
      } else {
        const standard = res.username.slice(4, 6);
        this.router.navigate(['/student', standard , res.username]);
      }
    }, error => {
      if( error.error.statusCode === 400 ){
        this.invalidCredentials = true;
      }

    });
  }
  onNoClick(): boolean {
    this.dialogRef.close();
    return true;
  }

}
