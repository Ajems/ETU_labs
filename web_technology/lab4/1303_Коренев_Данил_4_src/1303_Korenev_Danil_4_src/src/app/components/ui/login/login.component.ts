import { Component } from '@angular/core';
import {LoginManagerService} from "../../../services/loginManager/login-manager.service";
import {LoginResponse} from "../../../types/response/loginResponse";
import {FormControl, Validators} from "@angular/forms";
import {LOCATIONS} from "../../../types/location/locationPage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
      private loginManager: LoginManagerService,
      private router: Router
  ) {  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('invalid') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('invalid') ? 'Not a valid password' : '';
  }

  tryLogin() {
    this.loginManager.tryLogin(
      this.email.value ? this.email.value : "",
      this.password.value ? this.password.value : ""
    ).subscribe({
      next: (loginResponse: LoginResponse) => {
        this.loginManager.saveToken(loginResponse.token)
        this.router.navigate([LOCATIONS.SELF_PAGE()])
      },
      error: err => {
        console.log(err.error.message)
        this.password.setErrors(['invalid'])
        this.email.setErrors(['invalid'])
      }
    })
  }

  redirectToRegister() {
    this.router.navigate([LOCATIONS.REGISTER()])
  }
}
