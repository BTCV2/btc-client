import {Component, Input, OnInit, SimpleChange} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Password} from './password';
import {SetPasswordService} from "../service/set-password.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {AppComponent} from "../app.component";
@Component({
  selector: 'app-set-up-account',
  templateUrl: './set-up-account.component.html',
  styleUrls: ['./set-up-account.component.scss']
})
export class SetUpAccountComponent implements OnInit {
  scope: any;
  userName: any;
  passwordForm: FormGroup;
  password: Password;
  invalidCredentials: boolean;

  constructor(private fb: FormBuilder, private setPasswordService: SetPasswordService, private router: Router, private route: ActivatedRoute, private authService: AuthService, private appComponent: AppComponent) {

    this.route.params.subscribe(params => {
      this.userName = params.username;
      this.scope = params.scope;
    });
  }

  ngOnInit() {
    this.invalidCredentials = false;
    this.passwordForm = this.fb.group({
      newPassword: ['', Validators.required ],
      confirmPassword: ['', Validators.required ]
    });
  }

  savePassword = () =>{
  this.password = new Password(this.userName, this.passwordForm.value.newPassword, this.scope);
  this.setPasswordService.setPassword(this.userName, this.password).subscribe(res => {
    this.authService.logout();
    AppComponent.login = false;
    this.router.navigate(['/']);
  }, error => {
    if( error.error.statusCode === 400 ){
      this.invalidCredentials = true;
    }

  });


  }

}
