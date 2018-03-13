import {Component, Inject, OnInit} from '@angular/core';
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
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute, public dialogRef: MatDialogRef<LoginComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }
  login = () => {
    this.user = new User(this.loginForm.value.userName, this.loginForm.value.password);
    this.authService.login(this.user).subscribe(res => {
      this.onNoClick();
      console.log('res',res.username);
      if (res.scope === 'admin' ) {
          this.router.navigate(['/admin']);
      } else {
        const standard = res.username.slice(4, 6);
        this.router.navigate(['/student', standard , res.username]);
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
